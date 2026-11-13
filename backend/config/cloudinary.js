import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_API_KEY,
    });

    await cloudinary.api.ping();
  } catch (error) {
    console.log("Cloudinary Error:", error.message);
    throw error;
  }
};

export { cloudinary };
export default connectCloudinary;