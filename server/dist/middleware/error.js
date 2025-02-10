"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncErrors = catchAsyncErrors;
const errors_1 = require("../lib/errors");
function catchAsyncErrors(err, req, res, next) {
    if (!err) {
        return next();
    }
    (0, errors_1.logError)(req, err);
    if (res.headersSent) {
        return;
    }
    return res.status(500).json({ message: 'Server error' });
}
