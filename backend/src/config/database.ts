import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config: sql.config = {
  server: process.env.DB_SERVER || '',
  database: process.env.DB_NAME || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
  }
};

async function connectDB() {
  try {
    await sql.connect(config);
    console.log('Connected to the database successfully');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
}

export { sql, connectDB };