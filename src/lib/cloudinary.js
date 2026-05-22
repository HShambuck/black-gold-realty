// Server-side Cloudinary config (for future API routes / uploads)
// Install: npm install cloudinary

const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey:    process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};

export default cloudinaryConfig;

/**
 * Build a Cloudinary image URL without the SDK.
 * Safe to use in both server and client contexts.
 */
export function buildCloudinaryUrl(publicId, {
  width   = 'auto',
  height  = 'auto',
  quality = 'auto',
  format  = 'auto',
  crop    = 'fill',
} = {}) {
  const cloud = cloudinaryConfig.cloudName || 'demo';
  const t     = `c_${crop},w_${width},h_${height},q_${quality},f_${format}`;
  return `https://res.cloudinary.com/${cloud}/image/upload/${t}/${publicId}`;
}