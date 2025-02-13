const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = 'downloads/';
        if (file.mimetype.startsWith('image/')) {
            folder = 'downloads/img/'; 
        } else if (file.mimetype.startsWith('audio/')) {
            folder = 'downloads/song/'; 
        }

        fs.mkdirSync(folder, { recursive: true });

        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images and audio files are allowed.'));
        }
    }
});

module.exports = upload;