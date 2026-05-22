'use client';

/**
 * Utility hook for Cloudinary image/video URL generation.
 * Swap the CLOUD_NAME for your actual Cloudinary cloud name.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
const BASE_URL   = `https://res.cloudinary.com/${CLOUD_NAME}`;

export function useCloudinary() {
  /**
   * Generate an optimised image URL.
   * @param {string} publicId  - Cloudinary public ID
   * @param {object} transforms - width, height, quality, format, etc.
   */
  const getImageUrl = (publicId, transforms = {}) => {
    const {
      width   = 'auto',
      height  = 'auto',
      quality = 'auto',
      format  = 'auto',
      crop    = 'fill',
      gravity = 'auto',
    } = transforms;

    const t = [
      `c_${crop}`,
      `g_${gravity}`,
      `w_${width}`,
      `h_${height}`,
      `q_${quality}`,
      `f_${format}`,
    ].join(',');

    return `${BASE_URL}/image/upload/${t}/${publicId}`;
  };

  /**
   * Generate an optimised video URL.
   */
  const getVideoUrl = (publicId, transforms = {}) => {
    const { quality = 'auto', format = 'auto' } = transforms;
    const t = [`q_${quality}`, `f_${format}`].join(',');
    return `${BASE_URL}/video/upload/${t}/${publicId}`;
  };

  return { getImageUrl, getVideoUrl };
}