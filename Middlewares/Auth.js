const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

const ensureAuthenticated = async (req, res, next) => {
    const auth = req.headers['authorization'];
    
    // Check if authorization header exists and starts with "Bearer"
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }
    
    // Extract token by removing the "Bearer " prefix
    const token = auth.split(' ')[1];
    
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET); // Verify the actual token part
        req.user = await UserModel.findById(decode._id);
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is wrong or expired' });
    }
};

module.exports = ensureAuthenticated;
