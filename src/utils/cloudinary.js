const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Hàm tách public_id từ URL Cloudinary
function getPublicIdFromUrl(url) {
  if (!url) return null;
  const parts = url.split("/");
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex === -1) return null;

  // Lấy phần đường dẫn sau /upload/ (bỏ qua version v123456 nếu có)
  const pathAfterUpload = parts.slice(uploadIndex + 1);
  if (pathAfterUpload[0].startsWith("v") && !isNaN(pathAfterUpload[0].slice(1))) {
    pathAfterUpload.shift();
  }

  const fullPath = pathAfterUpload.join("/");
  // Bỏ phần đuôi mở rộng (.jpg, .png, ...)
  return fullPath.substring(0, fullPath.lastIndexOf("."));
}

async function deleteImageFromCloudinary(url) {
  const publicId = getPublicIdFromUrl(url);
  if (!publicId) return null;

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result; // Trả về { result: 'ok' } nếu xóa thành công
  } catch (error) {
    console.error("Lỗi xóa ảnh Cloudinary:", error);
    throw error;
  }
}

module.exports = { deleteImageFromCloudinary, getPublicIdFromUrl };