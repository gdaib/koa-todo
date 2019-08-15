module.exports = class ErrorException extends Error {
  constructor(message, code = 400) {
    super(message);
    this.code = code;
    this.message = message;
  }
};
