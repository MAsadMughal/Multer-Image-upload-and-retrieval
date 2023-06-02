const multer = require("multer");
const CatchAsyncErrors = require("../middlewares/CatchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Image = require("../model/ImageModel");
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter });

function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new ErrorHandler('Invalid file type. Only JPEG and PNG are allowed.', 400));
    }
}



exports.AddImage = CatchAsyncErrors(async (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Error uploading image.', error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image file provided.' });
        }
        console.log(req.file);
        const image = new Image({
            filename: req.file.filename,
            path: req.file.path
        });

        image.save().then(() => {
            res.json({ success: true, message: 'Image uploaded successfully.' });
        }).catch((err) => {
            res.status(500).json({ success: false, message: 'Error saving image.', error: err });
        });
    });
})



exports.getImage = CatchAsyncErrors(async (req, res, next) => {
    // Image upload logic here...

    // After saving the image, retrieve all images
    const images = await Image.find();
    console.log(images)
    res.send(images);
});
