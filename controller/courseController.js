const Course = require("../model/courseModel");
const ALLOWED_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
];

exports.pagenationCourse = async (req, res) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  if (
    !Number.isInteger(page) ||
    !Number.isInteger(limit) ||
    page < 1 ||
    limit < 1 ||
    limit > 100
  ) {
    return res.status(400).json({ message: "Invalid page or limit value" });
  }
  const skip = (page - 1) * limit;

  const courses = await Course.find().skip(skip).limit(limit);
  return res.status(200).json({
    page,
    limit,
    results: courses.length,
    data: courses,
  });
};




exports.filterCourse = async (req, res) => {
  try {
    const filter = {};
    const { level, category } = req.query;

    // Validate level
    if (level !== undefined) {
      if (
        typeof level !== "string" ||
        !ALLOWED_LEVELS.includes(level)
      ) {
        return res.status(400).json({
          message: "Invalid level value",
          allowedValues: ALLOWED_LEVELS,
        });
      }

      filter.level = level;
    }

    // Validate category
    if (category !== undefined) {
      if (
        typeof category !== "string" ||
        !category.trim()
      ) {
        return res.status(400).json({
          message: "Category must be a non-empty string",
        });
      }

      filter.category = category.trim();
    }

    // Apply filters
    const courses = await Course.find(filter);

    return res.status(200).json({
      results: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Filter courses error:", error);

    return res.status(500).json({
      message: "Failed to filter courses",
    });
  }
};
