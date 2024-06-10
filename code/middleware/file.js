const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../img'));
    },
    filename(req, file, cb) {
        const sanitizedDate = new Date().toISOString().replace(/:/g, '-');
        cb(null, sanitizedDate + '-' + file.originalname);
    }
});

const types = ['image/png', 'image/jpg'];

const fileFilter = (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length']);
    const maxFileSize = 10 * 1024 * 1024;

    if (types.includes(file.mimetype) && fileSize <= maxFileSize) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;
