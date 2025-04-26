// Loads .env variables (dotenv).


import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory of this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// Go up one level to the backend root
/*const rootDir = path.join(__dirname, '..');

// Load environment variables once
dotenv.config({ path: path.join(rootDir, '.env'), debug: false });

// Export for use in other files
export const getEnv = (key) => process.env[key];*/


export {__dirname}