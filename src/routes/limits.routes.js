// src/routes/limits.routes.js (Limits Routes)
/*const express = require("express");
const { getLimits, addLimits, updateLimits, deleteLimits } = require("../controllers/limits.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/:rtn/:env", authenticate, getLimits);
router.post("/:rtn/:env", authenticate, addLimits);
router.put("/:rtn/:env", authenticate, updateLimits);
router.delete("/:rtn/:env", authenticate, deleteLimits);

module.exports = router;*/


const express = require("express");
const { getLimits, addLimits, updateLimits, deleteLimits } = require("../controllers/limits.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { validateRequest, limitsSchema, deleteLimitsSchema } = require("../middlewares/validation.middleware");

const router = express.Router();

// Apply `authenticate` middleware to automatically get token
router.get("/:rtn/:env", authenticate, getLimits);
router.post("/:rtn/:env", authenticate, validateRequest(limitsSchema), addLimits);
router.put("/:rtn/:env", authenticate, validateRequest(limitsSchema), updateLimits);
router.delete("/:rtn/:env", authenticate, validateRequest(deleteLimitsSchema), deleteLimits);

module.exports = router;
