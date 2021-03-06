'use strict'

const connectDb = require('./db');
const { ObjectId } = require('mongodb');

module.exports = {
    Course: {
        people: async ({ people }) => {
            let db, peopleData, ids = null;
            try {
                db = await connectDb();
                ids = people ? people.map(id => ObjectId(id)) : [];
                peopleData = ids.length > 0 ? await db.collection('students').find({ _id: { $in: ids } }).toArray() : []
            } catch (err) {
                console.error(err);
            }
            return peopleData;
        }
    }
}