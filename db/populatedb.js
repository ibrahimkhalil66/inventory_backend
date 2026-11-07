const { Client } = require("pg");
require("dotenv").config();

const fs = require('fs').promises;

async function main() {

    const SQL = await fs.readFile('./db/database.sql', "utf8");

    const client = new Client({
            connectionString: process.env.DATABASE_URL,
        });
    
        try {
            console.log("Connecting to database...");
            await client.connect();
            
            console.log("Creating Table and data...");
            await client.query(SQL);
            
            console.log("done");
        } catch (err) {
            console.error("Error seeding database:", err);
        } finally {
            await client.end();
        }
}

main();