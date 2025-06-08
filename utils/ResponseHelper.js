class ResponseHelper {
  static success(res, data, message = 'Sukses', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(res, message = 'Kesalahan Server Internal', statusCode = 500, error = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      error: error ? error.message : null,
      timestamp: new Date().toISOString(),
    });
  }
}

module.exports = ResponseHelper;
