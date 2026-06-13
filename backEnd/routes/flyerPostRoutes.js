// const express = require('express');
// const router = express.Router();
// const pool = require('../db');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // ========== CONFIGURE MULTER FOR MULTIPLE IMAGE UPLOADS ==========

// // Ensure uploads directory exists
// const uploadDir = path.join(__dirname, '../uploads/flyers');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     // Create unique filename: timestamp-randomnumber-originalname
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);
//     const cleanName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
//     cb(null, `flyer-${uniqueSuffix}${ext}`);
//   }
// });

// // File filter for images only
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|webp/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);
  
//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
//   }
// };

// // Configure multer for multiple files (max 10 files, 5MB each)
// const upload = multer({
//   storage: storage,
//   limits: { 
//     fileSize: 5 * 1024 * 1024, // 5MB per file
//     files: 10 // Max 10 files
//   },
//   fileFilter: fileFilter
// });

// // Middleware for handling multiple files (field name: 'images')
// const uploadMultiple = upload.array('images', 10);

// // ========== HELPER FUNCTION TO SAFELY PARSE IMAGES ==========
// const safeParseImages = (imagesData) => {
//   if (!imagesData) return [];
  
//   // If it's already an array
//   if (Array.isArray(imagesData)) return imagesData;
  
//   // If it's a string
//   if (typeof imagesData === 'string') {
//     try {
//       const parsed = JSON.parse(imagesData);
//       return Array.isArray(parsed) ? parsed : [parsed];
//     } catch (e) {
//       return [imagesData];
//     }
//   }
  
//   // If it's a JSON object
//   if (typeof imagesData === 'object' && imagesData !== null) {
//     return Array.isArray(imagesData) ? imagesData : [imagesData];
//   }
  
//   return [];
// };

// // ========== HELPER FUNCTION TO DELETE OLD IMAGES ==========
// const deleteImages = (imageUrls) => {
//   if (!imageUrls || !Array.isArray(imageUrls)) return;
  
//   imageUrls.forEach(imageUrl => {
//     if (imageUrl && typeof imageUrl === 'string') {
//       const filename = path.basename(imageUrl);
//       const filePath = path.join(uploadDir, filename);
      
//       if (fs.existsSync(filePath)) {
//         fs.unlink(filePath, (err) => {
//           if (err) console.error(`Failed to delete image: ${filePath}`, err);
//           else console.log(`Deleted image: ${filePath}`);
//         });
//       }
//     }
//   });
// };

// // ========== CREATE flyer post with multiple images ==========
// router.post('/', uploadMultiple, async (req, res) => {
//   try {
//     console.log('📸 Received POST request to /api/flyers');
//     console.log('Caption:', req.body.caption);
//     console.log('Files received:', req.files ? req.files.length : 0);
    
//     const { caption } = req.body;
    
//     if (!caption || !caption.trim()) {
//       // Delete uploaded files if validation fails
//       if (req.files) {
//         req.files.forEach(file => {
//           if (fs.existsSync(file.path)) {
//             fs.unlink(file.path, () => {});
//           }
//         });
//       }
//       return res.status(400).json({ error: "Caption is required" });
//     }
    
//     // Get uploaded files URLs
//     const uploadedFiles = req.files || [];
    
//     if (uploadedFiles.length === 0) {
//       return res.status(400).json({ error: "At least one image is required" });
//     }
    
//     const imageUrls = uploadedFiles.map(file => `/uploads/flyers/${file.filename}`);
    
//     // Store images as JSON array in database
//     const newFlyerPost = await pool.query(
//       `INSERT INTO flyer_posts (caption, images, created_at, updated_at)
//        VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
//        RETURNING *`,
//       [caption.trim(), JSON.stringify(imageUrls)]
//     );
    
//     console.log('✅ Flyer post created successfully, ID:', newFlyerPost.rows[0].id);
    
//     // Parse images for response
//     const savedPost = newFlyerPost.rows[0];
//     savedPost.images = safeParseImages(savedPost.images);
    
//     res.status(201).json({
//       success: true,
//       data: savedPost,
//       uploadedImages: imageUrls
//     });
//   } catch (err) {
//     console.error("❌ CREATE flyer post ERROR:", err.message);
    
//     // Delete uploaded files if database insert fails
//     if (req.files) {
//       req.files.forEach(file => {
//         if (fs.existsSync(file.path)) {
//           fs.unlink(file.path, (unlinkErr) => {
//             if (unlinkErr) console.error("Error deleting file:", unlinkErr);
//           });
//         }
//       });
//     }
    
//     res.status(500).json({ error: "Server Error", details: err.message });
//   }
// });

// // ========== GET all flyer posts ==========
// router.get('/', async (req, res) => {
//   try {
//     console.log('📋 Received GET request to /api/flyers');
    
//     const result = await pool.query(
//       'SELECT * FROM flyer_posts ORDER BY created_at DESC'
//     );
    
//     // Parse JSON images array for each post using safe parser
//     const posts = result.rows.map(post => ({
//       id: post.id,
//       caption: post.caption,
//       images: safeParseImages(post.images),
//       created_at: post.created_at,
//       updated_at: post.updated_at
//     }));
    
//     console.log(`✅ Retrieved ${posts.length} flyer posts`);
//     res.json(posts);
//   } catch (err) {
//     console.error("❌ GET flyer posts ERROR:", err.message);
//     res.status(500).json({ error: "Server Error", details: err.message });
//   }
// });

// // ========== GET single flyer post ==========
// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`📋 Fetching flyer post ID: ${id}`);
    
//     const result = await pool.query(
//       'SELECT * FROM flyer_posts WHERE id = $1',
//       [id]
//     );
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Flyer post not found" });
//     }
    
//     const post = result.rows[0];
//     post.images = safeParseImages(post.images);
    
//     res.json(post);
//   } catch (err) {
//     console.error("❌ GET flyer post ERROR:", err.message);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // ========== UPDATE flyer post with multiple images ==========
// router.put('/:id', uploadMultiple, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { caption, existingImages } = req.body;
    
//     console.log(`✏️ Updating flyer post ID: ${id}`);
    
//     // Get existing post to delete removed images
//     const existingPost = await pool.query(
//       'SELECT images FROM flyer_posts WHERE id = $1',
//       [id]
//     );
    
//     if (existingPost.rows.length === 0) {
//       return res.status(404).json({ error: "Flyer post not found" });
//     }
    
//     // Safely parse old images
//     const oldImages = safeParseImages(existingPost.rows[0].images);
    
//     // Parse existingImages if provided (images to keep)
//     let keepImages = [];
//     if (existingImages) {
//       try {
//         keepImages = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
//       } catch (e) {
//         keepImages = [];
//       }
//     }
    
//     // Get newly uploaded files
//     const newFiles = req.files || [];
//     const newImageUrls = newFiles.map(file => `/uploads/flyers/${file.filename}`);
    
//     // Combine kept images with new ones
//     const allImages = [...keepImages, ...newImageUrls];
    
//     // Find and delete removed images
//     const removedImages = oldImages.filter(img => !keepImages.includes(img));
//     if (removedImages.length > 0) {
//       deleteImages(removedImages);
//     }
    
//     const update = await pool.query(
//       `UPDATE flyer_posts
//        SET caption = $1, 
//            images = $2,
//            updated_at = CURRENT_TIMESTAMP
//        WHERE id = $3
//        RETURNING *`,
//       [caption || '', JSON.stringify(allImages), id]
//     );
    
//     if (update.rows.length === 0) {
//       return res.status(404).json({ error: "Flyer post not found" });
//     }
    
//     const updatedPost = update.rows[0];
//     updatedPost.images = safeParseImages(updatedPost.images);
    
//     console.log(`✅ Flyer post ${id} updated successfully`);
    
//     res.json({
//       success: true,
//       data: updatedPost,
//       uploadedImages: newImageUrls
//     });
//   } catch (err) {
//     console.error("❌ UPDATE flyer post ERROR:", err.message);
    
//     // Delete newly uploaded files if update fails
//     if (req.files) {
//       req.files.forEach(file => {
//         if (fs.existsSync(file.path)) {
//           fs.unlink(file.path, (unlinkErr) => {
//             if (unlinkErr) console.error("Error deleting file:", unlinkErr);
//           });
//         }
//       });
//     }
    
//     res.status(500).json({ error: "Server Error", details: err.message });
//   }
// });

// // ========== DELETE flyer post and its images ==========
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`🗑️ Deleting flyer post ID: ${id}`);
    
//     // Get images before deleting
//     const flyerPost = await pool.query(
//       'SELECT images FROM flyer_posts WHERE id = $1',
//       [id]
//     );
    
//     if (flyerPost.rows.length === 0) {
//       return res.status(404).json({ error: "Flyer post not found" });
//     }
    
//     // Safely parse and delete image files
//     const images = safeParseImages(flyerPost.rows[0].images);
//     if (images.length > 0) {
//       deleteImages(images);
//     }
    
//     // Delete from database
//     await pool.query(
//       'DELETE FROM flyer_posts WHERE id = $1',
//       [id]
//     );
    
//     console.log(`✅ Flyer post ${id} deleted successfully`);
    
//     res.json({ 
//       success: true, 
//       message: "Flyer post deleted successfully",
//       deletedImages: images.length
//     });
//   } catch (err) {
//     console.error("❌ DELETE flyer post ERROR:", err.message);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // ========== DELETE single image from flyer post ==========
// router.delete('/:id/images', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { imageUrl } = req.body;
    
//     console.log(`🗑️ Deleting image from flyer post ID: ${id}`);
    
//     if (!imageUrl) {
//       return res.status(400).json({ error: "Image URL is required" });
//     }
    
//     // Get current images
//     const result = await pool.query(
//       'SELECT images FROM flyer_posts WHERE id = $1',
//       [id]
//     );
    
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Flyer post not found" });
//     }
    
//     const currentImages = safeParseImages(result.rows[0].images);
//     const updatedImages = currentImages.filter(img => img !== imageUrl);
    
//     // Delete image file
//     deleteImages([imageUrl]);
    
//     // Update database
//     await pool.query(
//       'UPDATE flyer_posts SET images = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
//       [JSON.stringify(updatedImages), id]
//     );
    
//     console.log(`✅ Image deleted from post ${id}`);
    
//     res.json({ 
//       success: true, 
//       message: "Image deleted successfully",
//       remainingImages: updatedImages.length
//     });
//   } catch (err) {
//     console.error("❌ DELETE image ERROR:", err.message);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// module.exports = router;










const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ---------- Determine storage backend ----------
const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && process.env.NODE_ENV === 'production';

let upload;  // multer instance

if (useCloudinary) {
  // Cloudinary storage (production)
  const { CloudinaryStorage } = require('multer-storage-cloudinary');
  const cloudinary = require('cloudinary').v2;
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'flyers',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [{ width: 800, height: 600, crop: 'limit' }]
    },
  });
  upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024, files: 10 } });
} else {
  // Local disk storage (development)
  const uploadDir = path.join(__dirname, '../uploads/flyers');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, `flyer-${uniqueSuffix}${ext}`);
    }
  });
  const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype))
      cb(null, true);
    else cb(new Error('Only image files are allowed'));
  };
  upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024, files: 10 }, fileFilter });
}

const uploadMultiple = upload.array('images', 10);

// ---------- Helper: Parse images array from DB ----------
const parseImages = (images) => {
  if (!images) return [];
  if (Array.isArray(images)) return images;
  if (typeof images === 'string') {
    try { return JSON.parse(images); } catch(e) { return []; }
  }
  return [];
};

// ---------- Helper: Delete files from Cloudinary or local disk ----------
const deleteImageFile = async (imageUrl) => {
  if (!imageUrl) return;
  if (useCloudinary) {
    // Extract public_id from Cloudinary URL
    const parts = imageUrl.split('/');
    const filename = parts.pop().split('.')[0];
    const publicId = `flyers/${filename}`;
    try {
      await cloudinary.uploader.destroy(publicId);
      console.log(`Deleted from Cloudinary: ${publicId}`);
    } catch (err) {
      console.error(`Cloudinary delete error: ${err.message}`);
    }
  } else {
    // Local file deletion
    const filename = path.basename(imageUrl);
    const filePath = path.join(__dirname, '../uploads/flyers', filename);
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete ${filePath}`, err);
        else console.log(`Deleted local file: ${filePath}`);
      });
    }
  }
};

// ---------- CREATE flyer ----------
router.post('/', uploadMultiple, async (req, res) => {
  try {
    const { caption } = req.body;
    if (!caption || !caption.trim()) {
      // Clean up any uploaded files if validation fails
      if (req.files && !useCloudinary) {
        req.files.forEach(f => fs.unlink(f.path, () => {}));
      }
      return res.status(400).json({ error: "Caption is required" });
    }

    const files = req.files || [];
    if (files.length === 0) return res.status(400).json({ error: "At least one image is required" });

    // Build image URLs (full URL for Cloudinary, relative path for local)
    const imageUrls = files.map(file => {
      if (useCloudinary) return file.path;          // Cloudinary returns full HTTPS URL
      else return `/uploads/flyers/${file.filename}`;
    });

    const newPost = await pool.query(
      `INSERT INTO flyer_posts (caption, images, created_at, updated_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING *`,
      [caption.trim(), JSON.stringify(imageUrls)]
    );

    const saved = newPost.rows[0];
    saved.images = parseImages(saved.images);
    res.status(201).json({ success: true, data: saved, uploadedImages: imageUrls });
  } catch (err) {
    console.error("CREATE flyer error:", err.message);
    // Clean up files if database insert fails
    if (req.files && !useCloudinary) {
      req.files.forEach(f => fs.unlink(f.path, () => {}));
    }
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// ---------- GET all flyers ----------
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM flyer_posts ORDER BY created_at DESC');
    const posts = result.rows.map(post => ({
      ...post,
      images: parseImages(post.images)
    }));
    res.json(posts);
  } catch (err) {
    console.error("GET flyers error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ---------- GET single flyer ----------
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM flyer_posts WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    const post = result.rows[0];
    post.images = parseImages(post.images);
    res.json(post);
  } catch (err) {
    console.error("GET flyer error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ---------- UPDATE flyer (supports adding/removing images) ----------
router.put('/:id', uploadMultiple, async (req, res) => {
  try {
    const { id } = req.params;
    const { caption, existingImages } = req.body;

    // Get current images from DB
    const existing = await pool.query('SELECT images FROM flyer_posts WHERE id = $1', [id]);
    if (existing.rows.length === 0) return res.status(404).json({ error: "Flyer post not found" });

    const oldImages = parseImages(existing.rows[0].images);
    let keepImages = [];
    if (existingImages) {
      try { keepImages = JSON.parse(existingImages); } catch(e) { keepImages = []; }
    }

    // Delete images that are no longer kept
    const toDelete = oldImages.filter(img => !keepImages.includes(img));
    for (const img of toDelete) await deleteImageFile(img);

    // New uploaded files
    const newFiles = req.files || [];
    const newImageUrls = newFiles.map(file => useCloudinary ? file.path : `/uploads/flyers/${file.filename}`);

    const allImages = [...keepImages, ...newImageUrls];

    const update = await pool.query(
      `UPDATE flyer_posts
       SET caption = $1, images = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3 RETURNING *`,
      [caption || '', JSON.stringify(allImages), id]
    );

    const updated = update.rows[0];
    updated.images = parseImages(updated.images);
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("UPDATE flyer error:", err.message);
    // Cleanup newly uploaded files on error
    if (req.files && !useCloudinary) {
      req.files.forEach(f => fs.unlink(f.path, () => {}));
    }
    res.status(500).json({ error: "Server Error" });
  }
});

// ---------- DELETE entire flyer ----------
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT images FROM flyer_posts WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });

    const images = parseImages(result.rows[0].images);
    for (const img of images) await deleteImageFile(img);

    await pool.query('DELETE FROM flyer_posts WHERE id = $1', [id]);
    res.json({ success: true, message: "Flyer deleted", deletedImages: images.length });
  } catch (err) {
    console.error("DELETE flyer error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ---------- DELETE single image from a flyer ----------
router.delete('/:id/images', async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ error: "Image URL required" });

    const result = await pool.query('SELECT images FROM flyer_posts WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Flyer not found" });

    const currentImages = parseImages(result.rows[0].images);
    if (!currentImages.includes(imageUrl)) return res.status(404).json({ error: "Image not found" });

    const updatedImages = currentImages.filter(img => img !== imageUrl);
    await deleteImageFile(imageUrl);

    await pool.query('UPDATE flyer_posts SET images = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [JSON.stringify(updatedImages), id]);

    res.json({ success: true, message: "Image deleted", remainingImages: updatedImages.length });
  } catch (err) {
    console.error("DELETE image error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;