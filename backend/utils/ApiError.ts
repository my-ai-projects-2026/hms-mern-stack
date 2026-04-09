class ApiError extends Error {
  statusCode: number;
  isCustom: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isCustom = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
