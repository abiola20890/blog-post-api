const bcrypt = require('bcrypt');

/**
 * Hash a plain text password
 * @param {string} password - Password to hash
 * @returns {Promise<string>} - Hashed password
 */
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // generate salt
    const hashed = await bcrypt.hash(password, salt); // hash password
    return hashed;
};

/**
 * Compare a plain password with a hashed password
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>} - true if match
 */
const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };