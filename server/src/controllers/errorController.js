const AppError = require("../utils/appError");

// Handle invalid MongoDB ObjectId errors
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Handle Mongoose validation errors
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

// Handle duplicate field errors in MongoDB
const handleDuplicateFieldsDB = (err) => {
  // Safer way to extract duplicate field
  const value = err.keyValue ? JSON.stringify(err.keyValue) : "Duplicate value";
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(message, 400);
};

// Handle invalid JWT
const handleJWTError = () =>
  new AppError("Invalid token, please login again.", 401);

// Handle expired JWT
const handleJWTExpiredError = () =>
  new AppError("Your token has expired, please login again!", 401);

// Global error handling middleware
module.exports = (err, req, res, next) => {
  console.error("ERROR 💥", err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Transform common errors into AppError
  if (err.name === "CastError") err = handleCastErrorDB(err);
  if (err.code === 11000) err = handleDuplicateFieldsDB(err);
  if (err.name === "ValidationError") err = handleValidationErrorDB(err);
  if (err.name === "JsonWebTokenError") err = handleJWTError();
  if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Something went wrong!",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack, error: err }),
  });
};
