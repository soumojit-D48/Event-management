import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { nanoid } from "nanoid"; 
import path from 'path';
import { fileURLToPath } from 'url';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_COULD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});



const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // delete local file after successful upload
    await fs.promises.unlink(localFilePath);

    return response;
  } catch (error) {
    await fs.promises.unlink(localFilePath).catch(() => {});
    return null;
  }
};

const deleteFromCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) return;

    const afterUpload = fileUrl.split("/upload/")[1];
    if (!afterUpload) return;

    const [publicIdWithVersion] = afterUpload.split(".");
    const publicId = publicIdWithVersion.replace(/^v\d+\//, "");

    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete failed:", err.message);
  }
};


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saveBase64ToFile = async (base64Data) => {
  // Strip the prefix: "data:image/png;base64,"
  const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) throw new Error("Invalid base64 data");

  const buffer = Buffer.from(matches[2], "base64");
  const tempFilePath = path.join(
    __dirname,
    `temp_qr_${nanoid()}.png`
  );

  await fs.promises.writeFile(tempFilePath, buffer);
  return tempFilePath;
};


export { uploadOnCloudinary, deleteFromCloudinary, saveBase64ToFile };    
