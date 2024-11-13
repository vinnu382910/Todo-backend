// controllers/userController.js
const User = require('../Models/User');
const bcrypt = require('bcrypt');

const updateUserDetails = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Update fields if they are provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.json({ message: 'User details updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Error occured while updating user details, please provide valid details' });
    }
};

module.exports = { updateUserDetails };
