import sql from 'mssql';

const config: sql.config = {
  server: 'YITAV\\SQLEXPRESS',
  database: 'shopping_list',
  user: 'sa',
  password: '1234',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    debug: {
      packet: true,
      data: true,
      payload: true,
      token: false,
    }
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