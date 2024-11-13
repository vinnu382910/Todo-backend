// middlewares/validationMiddleware.js
const { check, validationResult } = require('express-validator');

const updateUserValidation = [
    check('name').optional().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    check('email').optional().isEmail().withMessage('Please enter a valid email'),
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

module.exports = { updateUserValidation };
