export const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      errors: error.errors,
    });
  }
};


