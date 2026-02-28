require('dotenv').config(); // Load .env variables

// List all required environment variables
const requiredEnv = [
    'MONGODB_URI',
    'PORT',
    'JWT_SECRET'
];

// Check each variable
requiredEnv.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`❌ Environment variable ${envVar} is not set!`);
        process.exit(1); // Exit the app if any required variable is missing
    }
});

// Export the config values
module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET
};

