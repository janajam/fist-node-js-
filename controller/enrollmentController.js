const Enrollment = require("../model/enorollmentModel");
exports.testEnrollmentQuery = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const result = await Enrollment.find({
      course: courseId,
      completed: false,
    })
      .sort({
        enrolledAt: -1,
      })
      .explain("executionStats");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};