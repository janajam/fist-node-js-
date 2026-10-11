const Course = require("../model/courseModel");

const ALLOWED_LEVELS = ["beginner", "intermediate", "advanced"];

const ALLOWED_SORT_FIELDS = ["price", "createdAt", "title", "level"];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

exports.getCourses = async (req, res) => {
  try {
    const { level, category, sort, search } = req.query;

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    // Validate pagination
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        message: "Invalid page or limit value",
      });
    }

    // Build filters
    const filter = {};
    if (search !== undefined) {
      if (typeof search !== "string" || !search.trim() || search.length > 100) {
        return res.status(400).json({
          message:
            "Search must be a non-empty string of at most 100 characters",
        });
      }

      filter.title = {
        $regex: escapeRegex(search.trim()),
        $options: "i",
      };
    }
    if (level !== undefined) {
      if (typeof level !== "string" || !ALLOWED_LEVELS.includes(level)) {
        return res.status(400).json({
          message: "Invalid level value",
          allowedValues: ALLOWED_LEVELS,
        });
      }

      filter.level = level;
    }

    if (category !== undefined) {
      if (typeof category !== "string" || !category.trim()) {
        return res.status(400).json({
          message: "Invalid category value",
        });
      }

      filter.category = category.trim();
    }

    // Build sorting
    let sortBy = { createdAt: -1 };

    if (sort !== undefined) {
      if (typeof sort !== "string" || !sort.trim()) {
        return res.status(400).json({
          message: "Invalid sort value",
        });
      }

      const isDescending = sort.startsWith("-");
      const field = isDescending ? sort.slice(1) : sort;

      if (!ALLOWED_SORT_FIELDS.includes(field)) {
        return res.status(400).json({
          message: "Invalid sort field",
          allowedFields: ALLOWED_SORT_FIELDS,
        });
      }

      sortBy = {
        [field]: isDescending ? -1 : 1,
      };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const [courses, totalResults] = await Promise.all([
      Course.find(filter).sort(sortBy).skip(skip).limit(limit),

      Course.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalResults / limit);

    return res.status(200).json({
      page,
      limit,
      sort: sortBy,
      totalResults,
      totalPages,
      results: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Get courses error:", error);

    return res.status(500).json({
      message: "Failed to retrieve courses",
    });
  }
};
