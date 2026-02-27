export const sendResponse = (res, statusCode, data = null, message = null) => {
  res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
  });
};
