module.exports = class HttpExceptionError extends Error {
  constructor({ message, code, type }) {
    message = message || "未知错误";
    super(message);
    this.code = code || 500;

    if (type === "VALIDATE_ERROR") {
      this.code = 400;
    }
  }

  of(data) {
    return new HttpExceptionError(data);
  }
};
