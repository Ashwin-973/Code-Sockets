import dotenv from "dotenv"
import path from 'path'
import { __dirname } from "../envPath.js";
import { neon } from "@neondatabase/serverless";
dotenv.config({path:path.join(__dirname,'.env'),debug:false});

const {PGHOST,PGUSER,PGPASSWORD,PGDATABASE}=process.env
const DATABASE_URL=`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`

//always have the connection test ENV's are your lifeline
const sql = neon(DATABASE_URL);

async function testNeonConnection() {
    try {
      // Run a simple query to test the connection
      await sql`SELECT 1;`;
      console.log('Connection with Neon successful:');
    } catch (err) {
      // Handle and log any errors
      console.error('Connection error:', err.stack || err);
    }
  }
  
  // Run the test
  testNeonConnection();

export {sql}