class Logger {
  info(message, data = null) {
    const timestamp = new Date().toISOString();
    console.log(`[INFO] ${timestamp}: ${message}`, data ? data : '');
  }

  error(message, error = null) {
    const timestamp = new Date().toISOString();
    console.error(`[ERROR] ${timestamp}: ${message}`, error ? error : '');
  }

  warn(message, data = null) {
    const timestamp = new Date().toISOString();
    console.warn(`[WARN] ${timestamp}: ${message}`, data ? data : '');
  }
}

module.exports = Logger;