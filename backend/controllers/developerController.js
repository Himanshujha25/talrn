const Developer = require("../models/Developer");

// CREATE DEVELOPER (with photo upload)
exports.createDeveloper = async (req, res) => {
  try {
    const { name, role, techStack, experience, description } = req.body;

    // Multer will store file under req.file
    const photo = req.file ? `/uploads/${req.file.filename}` : "";

    const dev = await Developer.create({
      name,
      role,
      techStack: techStack.split(",").map((i) => i.trim()),
      experience,
      description,
      photo
    });

    res.status(201).json(dev);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to add developer" });
  }
};


// GET LIST (search + filter + sort + pagination)
exports.getDevelopers = async (req, res) => {
  try {
    const { search = "", role = "", sort = "", page = 1, limit = 6 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { techStack: { $regex: search, $options: "i" } }
      ];
    }

    if (role) query.role = role;

    const sortOption = {};
    if (sort === "asc") sortOption.experience = 1;
    if (sort === "desc") sortOption.experience = -1;

    const skip = (page - 1) * limit;

    const developers = await Developer.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    // Count total pages
    const totalItems = await Developer.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    res.json({ developers, totalPages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};


// GET DEVELOPER BY ID
exports.getDeveloperById = async (req, res) => {
  try {
    const dev = await Developer.findById(req.params.id);
    if (!dev) return res.status(404).json({ error: "Developer not found" });
    res.json(dev);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


// UPDATE DEVELOPER (with photo update)
exports.updateDeveloper = async (req, res) => {
  try {
    const updates = req.body;

    // If frontend sent techStack as string
    if (updates.techStack) {
      updates.techStack = Array.isArray(updates.techStack)
        ? updates.techStack.map((t) => t.trim())
        : updates.techStack.split(",").map((t) => t.trim());
    }

    // Update photo if user uploaded new one
    if (req.file) {
      updates.photo = `/uploads/${req.file.filename}`;
    }

    const dev = await Developer.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json(dev);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};


// DELETE DEVELOPER
exports.deleteDeveloper = async (req, res) => {
  try {
    await Developer.findByIdAndDelete(req.params.id);
    res.json({ message: "Developer deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
