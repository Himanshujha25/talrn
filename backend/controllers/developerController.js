const Developer = require("../models/Developer");

// Create developer
exports.createDeveloper = async (req, res) => {
  try {
    const { name, role, techStack, experience, description, photo } = req.body;

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
    res.status(500).json({ error: "Unable to add developer" });
  }
};

// Get all developers (search, filter, sort, pagination)
// GET developers (search, filter, sort, pagination)
exports.getDevelopers = async (req, res) => {
  try {
    const { search = "", role = "", sort = "", page = 1, limit = 6 } = req.query;

    const query = {};

    // Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { techStack: { $regex: search, $options: "i" } }
      ];
    }

    // Role filter
    if (role) {
      query.role = role;
    }

    // Sorting
    const sortOption = {};
    if (sort === "asc") sortOption.experience = 1;
    if (sort === "desc") sortOption.experience = -1;

    // Pagination
    const skip = (page - 1) * limit;

    const developers = await Developer.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.json(developers);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};


// Get developer by ID
exports.getDeveloperById = async (req, res) => {
  try {
    const dev = await Developer.findById(req.params.id);
    if (!dev) return res.status(404).json({ error: "Developer not found" });
    res.json(dev);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update developer
exports.updateDeveloper = async (req, res) => {
  try {
    const updates = req.body;

   if (updates.techStack) {
  if (Array.isArray(updates.techStack)) {
    updates.techStack = updates.techStack.map(t => t.trim());
  } else {
    updates.techStack = updates.techStack.split(",").map(t => t.trim());
  }
}


    const dev = await Developer.findByIdAndUpdate(req.params.id, updates, { new: true });

    res.json(dev);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

// Delete developer
exports.deleteDeveloper = async (req, res) => {
  try {
    await Developer.findByIdAndDelete(req.params.id);
    res.json({ message: "Developer deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
