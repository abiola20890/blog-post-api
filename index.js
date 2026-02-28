
// Load and validate config first
const { mongoURI, port } = require('./Src/config/config.js');
const connectDB = require('./Src/config/connectDB.js');

const app = require('./Src/app.js');


app.listen(port, async () => {
    await connectDB(mongoURI); // pass validated URI to connectDB
    console.log(`Server is running on port ${port}`);
});