import { cloudinary } from "../config/cloudinary.js";

const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "rid_rastu/foods",
        resource_type: "image",
      },

      (error, result) => {

        if (error) {
  console.log("Cloudinary Upload Failed:");

  console.log({
    message: error.message,
    http_code: error.http_code,
    name: error.name,
    error: error.error,
  });

  return reject(error);
}

        console.log("Cloudinary Image Uploaded Successfully");

        resolve({
          imageUrl: result.secure_url,
          imagePublicId: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export default uploadImage;