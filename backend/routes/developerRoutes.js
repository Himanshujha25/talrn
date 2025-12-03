const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createDeveloper,
  getDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper
} = require("../controllers/developerController");

router.post("/", auth, createDeveloper);
router.get("/", auth, getDevelopers);
router.get("/:id", auth, getDeveloperById);
router.put("/:id", auth, updateDeveloper);
router.delete("/:id", auth, deleteDeveloper);

module.exports = router;
