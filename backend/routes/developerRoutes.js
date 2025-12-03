const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createDeveloper,
  getDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper
} = require("../controllers/developerController");
const upload = require("../middleware/upload");
  
router.post("/", auth, upload.single("photo"), createDeveloper);
router.get("/", auth, getDevelopers);
router.get("/:id", auth, getDeveloperById);
router.put("/:id", auth, upload.single("photo"), updateDeveloper);
router.delete("/:id", auth, deleteDeveloper);



module.exports = router;
