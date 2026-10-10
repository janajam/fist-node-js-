const Course = require("../model/courseModel");

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
