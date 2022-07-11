'use strict'

const { MongoClient } = require('mongodb');
const {
    //DB_USER, 
    //DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env;

//const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
let connection = null;

async function connectDB() {
    if(connection) return connection;
    let client = null;
    try {
        client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
        connection = client.db(DB_NAME); 
    } catch(err) {
        console.error('Could not to db', mongoUrl, err);
        process.exit(1);
    }
    return connection;
}

module.exports = connectDB;