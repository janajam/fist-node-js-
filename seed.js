const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./model/userModel");
const Course = require("./model/courseModel");
const Lesson = require("./model/lessonModel");
const Enrollment = require("./model/enorollmentModel");
const Review = require("./model/reviewModel");

const DB = process.env.MONGO_URI;

const seedDatabase = async () => {
  try {
    await mongoose.connect(DB);

    console.log("MongoDB connected");

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    await Enrollment.deleteMany({});
    await Review.deleteMany({});

    // =========================
    // Users
    // =========================

    const instructor = await User.create({
      name: "John Instructor",
      email: "instructor@example.com",
      password: "Password123!",
      role: "instructor",
    });

    const students = await User.insertMany([
      {
        name: "Alice Student",
        email: "alice@example.com",
        password: "Password123!",
        role: "student",
      },
      {
        name: "Bob Student",
        email: "bob@example.com",
        password: "Password123!",
        role: "student",
      },
      {
        name: "Charlie Student",
        email: "charlie@example.com",
        password: "Password123!",
        role: "student",
      },
    ]);

    // =========================
    // Courses
    // =========================

    const courses = await Course.insertMany([
      {
        title: "Node.js Backend Development",
        description: "Learn Node.js, Express and MongoDB.",
        price: 100,
        category: "Backend",
        level: "intermediate",
        instructor: instructor._id,
        isPublished: true,
      },
      {
        title: "React Frontend Development",
        description: "Learn React and modern frontend development.",
        price: 80,
        category: "Frontend",
        level: "beginner",
        instructor: instructor._id,
        isPublished: true,
      },
    ]);

    // =========================
    // Lessons
    // =========================

    await Lesson.insertMany([
      {
        title: "Introduction to Node.js",
        content: "Node.js fundamentals...",
        order: 1,
        course: courses[0]._id,
        isPublished: true,
      },
      {
        title: "Express.js",
        content: "Building APIs with Express...",
        order: 2,
        course: courses[0]._id,
        isPublished: true,
      },
      {
        title: "MongoDB",
        content: "Working with MongoDB...",
        order: 3,
        course: courses[0]._id,
        isPublished: true,
      },
      {
        title: "Introduction to React",
        content: "React fundamentals...",
        order: 1,
        course: courses[1]._id,
        isPublished: true,
      },
      {
        title: "React Components",
        content: "Understanding components...",
        order: 2,
        course: courses[1]._id,
        isPublished: true,
      },
    ]);

    // =========================
    // Enrollments
    // =========================

    await Enrollment.insertMany([
      {
        student: students[0]._id,
        course: courses[0]._id,
        progress: 80,
        completed: false,
        enrolledAt: new Date("2026-09-01"),
      },
      {
        student: students[1]._id,
        course: courses[0]._id,
        progress: 100,
        completed: true,
        enrolledAt: new Date("2026-09-05"),
      },
      {
        student: students[2]._id,
        course: courses[0]._id,
        progress: 40,
        completed: false,
        enrolledAt: new Date("2026-09-10"),
      },
      {
        student: students[0]._id,
        course: courses[1]._id,
        progress: 30,
        completed: false,
        enrolledAt: new Date("2026-09-12"),
      },
      {
        student: students[1]._id,
        course: courses[1]._id,
        progress: 70,
        completed: false,
        enrolledAt: new Date("2026-09-15"),
      },
    ]);

    // =========================
    // Reviews
    // =========================

    await Review.insertMany([
      {
        student: students[0]._id,
        course: courses[0]._id,
        rating: 5,
        comment: "Excellent course!",
      },
      {
        student: students[1]._id,
        course: courses[0]._id,
        rating: 4,
        comment: "Very useful.",
      },
      {
        student: students[0]._id,
        course: courses[1]._id,
        rating: 5,
        comment: "Great React course!",
      },
    ]);

    console.log("Database seeded successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Seed error:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();