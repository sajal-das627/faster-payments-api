const Joi = require("joi");

// Middleware to validate request body
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Validation Error",
        details: error.details.map((err) => err.message),
      });
    }

    next();
  };
};

// Schema for adding/updating limits
const limitsSchema = Joi.object({
  limitScope: Joi.string().valid("User").required(),
  identifier: Joi.string().email().required(),
  direction: Joi.string().valid("Outbound").required(),
  limits: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid("FundingCap").required(),
        range: Joi.string().valid("Daily", "SevenDays", "ThirtyDays").required(),
        limitValue: Joi.number().positive().required(),
      })
    )
    .min(1)
    .required(),
});

// Schema for deleting limits
const deleteLimitsSchema = Joi.object({
  limitScope: Joi.string().valid("User").required(),
  identifier: Joi.string().email().required(),
  direction: Joi.string().valid("Outbound").required(),
  limits: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid("FundingCap").required(),
        range: Joi.string().valid("Daily", "SevenDays", "ThirtyDays").required(),
      })
    )
    .min(1)
    .required(),
});

module.exports = { validateRequest, limitsSchema, deleteLimitsSchema };
