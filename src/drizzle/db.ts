

import  "dotenv/config";

import {drizzle} from "drizzle-orm/node-postgres";

import{Client} from  "pg";

import * as schema from "./schema";

export const client = new Client ({

    connectionString: process.env.Database_URL as string, //get the database url from the environment variable
})

const main = async () => {
    await client.connect(); //connect to the database
}
main();

const db = drizzle(client, {schema, logger:true})

export default db;  //export the database instance