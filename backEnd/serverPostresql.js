// const express = require('express');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// require('dotenv').config();
// const pool = require('./db');
// const path = require('path');


// const app = express();
// const port = 5005;


// // ✅ Add this to fix SSL certificate issues
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// // Add cookie-parser
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// // Serve static files for uploaded images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // ✅ IMPORT the gallery routes - MAKE SURE THIS EXISTS
// const galleryPostRoutes = require('./routes/galleryPostRoutes'); // Adjust path as needed
// const flyerPostRoutes = require('./routes/flyerPostRoutes');
// const authRoutes = require('./routes/authRoutes');


// // Your existing routes
// app.use('/api/biblePosts', require('./routes/biblePostresqlRoute'));
// app.use('/api/gallery', require('./routes/galleryPostRoutes'));
// app.use('/api/flyers', flyerPostRoutes);
// app.use('/api/auth', authRoutes);



// app.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT NOW()');
//     res.json({
//       message: 'Server is running',
//       database_time: result.rows[0]
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "Database connection error" });
//   }
// });

// app.post("/send-email", async (req, res) => {
//   const { name, email, phone, message } = req.body;

//   // ✅ Validate required fields
//   if (!name || !email || !message) {
//     return res.status(400).json({ 
//       success: false, 
//       error: "Name, email, and message are required" 
//     });
//   }

//   // ✅ Better configuration with TLS options
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER || "itropicalstan@gmail.com",
//       pass: process.env.EMAIL_PASS || "stanley1500",
//     },
//     tls: {
//       rejectUnauthorized: false  // ✅ Allow self-signed certificates
//     }
//   });

//   const mailOptions = {
//     from: `"${name}" <${email}>`,
//     to: "itropicalstan@gmail.com",
//     subject: `New message from ${name}`,
//     text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nMessage: ${message}`,
//     replyTo: email,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.messageId);
//     res.status(200).json({ success: true, message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Detailed email error:", error);
//     res.status(500).json({ 
//       success: false, 
//       error: error.message || "Failed to send email" 
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });








const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const pool = require('./db');        // Your database connection pool
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5005;

// -------------------------------
// 1. CORS Configuration (secure)
// -------------------------------
const allowedOrigins = [
  'https://sipminternation.vercel.app',   // Your Vercel frontend
  'https://sipm.org.ng',                  // Your custom domain (future)
  'http://localhost:3000',                // Local React development
  'http://localhost:5005',                 // Local backend testing
   /^https:\/\/sipm-19-05-2026-.*\.vercel\.app$/  // ✅ Regex for Vercel preview deployments
];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'CORS policy does not allow access from this origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));


app.use(cors({ origin: true, credentials: true }));




// -------------------------------
// 2. Middleware (JSON, URL-encoded, Cookie)
// -------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// -------------------------------
// 3. Static files for uploads
// -------------------------------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -------------------------------
// 4. Database Connection is handled in ./db.js
//    (We will modify db.js separately to use proper SSL for Render)
// -------------------------------

// -------------------------------
// 5. Import Routes
// -------------------------------
const galleryPostRoutes = require('./routes/galleryPostRoutes');
const flyerPostRoutes = require('./routes/flyerPostRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/biblePosts', require('./routes/biblePostresqlRoute'));
app.use('/api/gallery', galleryPostRoutes);
app.use('/api/flyers', flyerPostRoutes);
app.use('/api/auth', authRoutes);

// -------------------------------
// 6. Health Check Endpoint
// -------------------------------
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Server is running',
      database_time: result.rows[0]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database connection error" });
  }
});

// -------------------------------
// 7. Email Endpoint (nodemailer)
// -------------------------------
app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required"
    });
  }

  // Configure transporter with Render-friendly TLS
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "itropicalstan@gmail.com",
      pass: process.env.EMAIL_PASS || "stanley1500",   // ⚠️ Use environment variables!
    },
    tls: {
      rejectUnauthorized: false   // Only needed if email server uses self-signed cert
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "itropicalstan@gmail.com",
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nMessage: ${message}`,
    replyTo: email,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to send email"
    });
  }
});

// -------------------------------
// 8. Start Server
// -------------------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});