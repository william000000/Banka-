import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect',()=>{
  console.log("Connected to db!");
})

const createTables = async () => {
  const usersTableQuery = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(250) NOT NULL UNIQUE,
    firstName VARCHAR(250),
    lastName VARCHAR(250),
    password VARCHAR(250))`;

    await pool.query(usersTableQuery)
    .then((res)=>{
      console.log(res);
      pool.end();
    }) 
    .catch((error)=>{
      console.log(error);
      pool.end();
    })
    
}
createTables();