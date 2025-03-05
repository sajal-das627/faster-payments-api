/*const Joi = require("joi");

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
        type: Joi.string().valid("FundingCap","FundingVelocity").required(),
        range: Joi.string().valid("PerTransaction", "Daily", "SevenDays", "ThirtyDays").required(),
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
        type: Joi.string().valid("FundingCap", "FundingVelocity").required(),
        range: Joi.string().valid("PerTransaction", "Daily", "SevenDays", "ThirtyDays").required(),
      })
    )
    .min(1)
    .required(),
});

module.exports = { validateRequest, limitsSchema, deleteLimitsSchema };*/

const Joi = require("joi");

// Middleware for validating requests
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // Map Joi errors to custom error codes
      const errorDetails = error.details.map((err) => {
        let code, message;
        switch (err.context.key) {
          case "PaymentNetwork":
            code = "PA-1015";
            message = "PaymentNetwork is required";
            break;
          case "limitScope":
            code = "PA-1008";
            message = "Limit Scope is required";
            break;
          case "identifier":
            code = "PA-1003";
            message = "Identifier is required";
            break;
          case "direction":
            code = "PA-1007";
            message = "Direction is required";
            break;
          case "limits":
            code = "PA-1009";
            message = "Limits is required";
            break;
          case "type":
            code = "PA-1010";
            message = "Type is required";
            break;
          case "range":
            code = "PA-1011";
            message = "Range is required";
            break;
          case "limitValue":
            code = "PA-1020";
            message = "Limit Value is required";
            break;
          default:
            code = "PA-9999";
            message = "Validation error";
        }

        return { code, description: message };
      });

      return res.status(400).json({
        responseCode: 400,
        description: "Bad Request",
        messageSource: "PayCenter API",
        details: errorDetails,
      });
    }

    next();
  };
};

// Schema for adding/updating limits
const limitsSchema = Joi.object({
  limitScope: Joi.string().valid("User").required().error(new Error("PA-1022: Limit Scope is invalid")),
  identifier: Joi.string().email().required().error(new Error("PA-1003: Identifier is required")),
  direction: Joi.string().valid("Outbound").required().error(new Error("PA-1023: Direction is invalid")),
  limits: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid("FundingCap").required().error(new Error("PA-1024: Type is invalid")),
        range: Joi.string().valid("Daily", "SevenDays", "ThirtyDays").required().error(new Error("PA-1025: Range is invalid")),
        limitValue: Joi.number().positive().required().error(new Error("PA-1012: Limit Value is invalid")),
      })
    )
    .min(1)
    .required(),
});

const deleteLimitsSchema = Joi.object({
  limitScope: Joi.string().valid("User").required().error(new Error("PA-1022: Limit Scope is invalid")),
  identifier: Joi.string().email().required().error(new Error("PA-1003: Identifier is required")),
  direction: Joi.string().valid("Outbound").required().error(new Error("PA-1023: Direction is invalid")),
  limits: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid("FundingCap").required().error(new Error("PA-1024: Type is invalid")),
        range: Joi.string().valid("Daily", "SevenDays", "ThirtyDays").required().error(new Error("PA-1025: Range is invalid")),
      })
    )
    .min(1)
    .required(),
});

module.exports = { validateRequest, limitsSchema, deleteLimitsSchema };

