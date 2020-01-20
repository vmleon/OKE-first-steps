const createResponse = (data, message) => {
  if (message) {
    return {
      data,
      error: true,
      message
    };
  }
  return { data };
};

module.exports = { createResponse };
