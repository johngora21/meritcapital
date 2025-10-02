export class HttpError extends Error {
  constructor(status, message, details = undefined) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  const payload = { error: true, message: err.message || 'Internal Server Error' };
  if (err.details) payload.details = err.details;
  res.status(status).json(payload);
};

export default errorHandler;





