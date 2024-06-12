import { connect } from "mongoose";

const connectToDatabase = async (uri) => {
  try {
    await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

// module.exports = db;
export default connectToDatabase;
