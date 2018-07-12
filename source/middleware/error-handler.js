module.exports = (err, req, res, next) => {
  if (err.isJoi) {
    // eslint-disable-next-line
    console.log(err);
    return res.status(422).json(err);
  }
  return res.status(500).json(err);
};
