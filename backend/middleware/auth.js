const handleAsyncError = require("./handleAsyncError");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userSchema");
const isAuthenticatedUser = handleAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});
const authoriseRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // 403 server understand the request but not allow to proceed next
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};

module.exports = { isAuthenticatedUser, authoriseRoles };
