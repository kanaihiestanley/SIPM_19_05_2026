// const { Pool } = require('pg');
// require('dotenv').config();



// const pool = new Pool({
//   user: 'postgres',
//   password: '12345',   // change this
//   host: 'localhost',
//   port: 5432,
//   database: 'sipmdb'
// });


// // Test the connection
// pool.connect((err, client, release) => {
//   if (err) {
//     console.error('Error connecting to database:', err.message);
//   } else {
//     console.log('✅ Successfully connected to PostgreSQL database');
//     release();
//   }
// });

// module.exports = pool;





// // db.js
// const { Pool } = require('pg');

// // Read the DATABASE_URL from environment (set in Render dashboard)
// const connectionString = process.env.DATABASE_URL;

// // Configure SSL for Render (required for external connections, safe for internal)
// const sslConfig = process.env.NODE_ENV === 'production' 
//   ? { rejectUnauthorized: false }   // Render's internal CA works with this
//   : false;                          // No SSL for local development

// const pool = new Pool({
//   connectionString: connectionString,
//   ssl: sslConfig,
// });

// // Test connection (optional)
// pool.connect((err, client, release) => {
//   if (err) {
//     console.error('Error acquiring client:', err.stack);
//   } else {
//     console.log('Connected to PostgreSQL database');
//     release();
//   }
// });

// module.exports = pool;




// db.js
// const { Pool } = require('pg');

// const connectionString = process.env.DATABASE_URL;

// if (!connectionString) {
//   console.error('FATAL: DATABASE_URL environment variable is not set');
//   process.exit(1);
// }

// // Render requires SSL for all connections. Use `true` for internal connections.
// // For external tools (like local pgAdmin), use { rejectUnauthorized: false }.
// const sslConfig = process.env.NODE_ENV === 'production' ? true : false;

// const pool = new Pool({
//   connectionString,
//   ssl: sslConfig,
// });

// // Optional: test connection
// pool.connect((err, client, release) => {
//   if (err) {
//     console.error('Database connection error:', err.stack);
//   } else {
//     console.log('Connected to PostgreSQL database');
//     release();
//   }
// });

// module.exports = pool;





// db.js
const { Pool } = require('pg');

// Read the database connection string from environment variables
const connectionString = process.env.DATABASE_URL;

// Guard: Ensure the connection string exists
if (!connectionString) {
  console.error('FATAL ERROR: DATABASE_URL environment variable is not set.');
  process.exit(1); // Exit the process because the app cannot connect to the database
}

/**
 * Determine SSL configuration:
 * - For local development (no DATABASE_URL or URL contains localhost), disable SSL.
 * - For production (Render), enable SSL with rejectUnauthorized = false.
 * 
 * Render's internal connections can also use SSL, but it's not mandatory.
 * This configuration ensures compatibility with both internal and external connections.
 */
let sslConfig = false;
if (process.env.NODE_ENV === 'production') {
  sslConfig = { rejectUnauthorized: false };
}
// Alternatively, you could detect Render's host pattern:
// if (connectionString.includes('render.com')) sslConfig = { rejectUnauthorized: false };

// Create the connection pool
const pool = new Pool({
  connectionString: connectionString,
  ssl: sslConfig,
  // Optional: Set connection timeout, max clients, etc.
  // connectionTimeoutMillis: 5000,
  // max: 20,
});

// Test the connection immediately and handle any errors
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    // Do not exit the process; the app may still run and retry later.
    // However, you might want to set a flag to reject all queries.
  } else {
    console.log('✅ Connected to PostgreSQL database');
    release(); // Release the client back to the pool
  }
});

// Optional: Listen for pool-level errors (e.g., lost connection)
pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
  // You could attempt to reconnect or log to an external service
});

module.exports = pool;