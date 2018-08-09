const uuidv4 = require('uuid/v4');
const multer = require('../service/multer');
const redis = require('../service/redis');

const middleware = multer.single('content');

const controller = (req, res, next) => {
  const cid = uuidv4();
  return redis.set(cid, req.file.buffer, 'EX', redis.expiration)
    .then(() => res.json({
      cid,
      mimetype: req.file.mimetype,
      originalname: req.file.originalname,
      size: req.file.size,
    }))
    .catch(next);
};

module.exports = [
  middleware,
  controller,
];
