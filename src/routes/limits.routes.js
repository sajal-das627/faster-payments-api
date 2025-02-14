// src/routes/limits.routes.js (Limits Routes)
const express = require("express");
const { getLimits, addLimits, updateLimits, deleteLimits } = require("../controllers/limits.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/:rtn/:env", authenticate, getLimits);
router.post("/:rtn/:env", authenticate, addLimits);
router.put("/:rtn/:env", authenticate, updateLimits);
router.delete("/:rtn/:env", authenticate, deleteLimits);

module.exports = router;
