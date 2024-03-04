const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        
        const conn = await mongoose.connect(process.env.DATABASE_URI);
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

// export the 'connectDB' function to be able to use it 
module.exports = connectDB;