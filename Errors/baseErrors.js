const HttpStatusCode = require("../constants/httpStatusCode");

class BaseError extends Error {
  constructor(title, message, httpCode, isOperational) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.title = title;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

class ApplicationError extends BaseError {
  constructor(
    title = "Application Error",
    message = "Internal Server Error",
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true
  ) {
    super(title, message, httpCode, isOperational);
  }
}

class DatabaseError extends ApplicationError {
  constructor(
    title = "Database Error",
    message = "Database Error",
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true
  ) {
    super(title, message, httpCode, isOperational);
  }
}

class UserFacingError extends ApplicationError {}

class APIError extends BaseError {
  constructor(
    title = "Api Error",
    message = "Internal Server Error",
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true
  ) {
    super(title, message, httpCode, isOperational);
  }
}

class HTTP400Error extends BaseError {
  constructor(message = "bad request") {
    super("NOT FOUND", message, HttpStatusCode.BAD_REQUEST, true);
  }
}

module.exports = {
  ApplicationError,
  DatabaseError,
  UserFacingError,
  APIError,
  BaseError,
  HTTP400Error,
};
