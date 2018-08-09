const multerCodes = ['LIMIT_UNEXPECTED_FILE'];

module.exports = (err, req, res, next) => {
  if (err.isJoi || multerCodes.includes(err.code)) {
    return res.status(422).json(err);
  }
  return res.status(500).json(err);
};
