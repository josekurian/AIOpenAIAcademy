import {Pool} from 'pg';
const globalPool = globalThis as unknown as {academyPool?: Pool};
export function getPool(){if(!globalPool.academyPool){const connectionString=process.env.DATABASE_URL;if(!connectionString)throw new Error('DATABASE_URL is not configured');globalPool.academyPool=new Pool({connectionString,max:10});}return globalPool.academyPool;}
