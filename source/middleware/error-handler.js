module.exports = (err, req, res, next) => {
  if (err.isJoi) {
    return res.status(422).json(err);
  }
  return res.status(500).json(err);
};
