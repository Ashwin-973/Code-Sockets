import dotenv from "dotenv"
import { neon } from "@neondatabase/serverless";

dotenv.config({path:"C:\\Users\\Ashwi\\Documents\\Web Development\\WebDEV\\Sample\\Code-sockets-practice\\anonymez_practice\\.env"});

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