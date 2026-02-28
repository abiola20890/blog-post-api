require('dotenv').config();
const connectDB = require('./Src/config/connectDB.js');

const app = require('./Src/app.js');

const PORT = process.env.PORT || 3007;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});