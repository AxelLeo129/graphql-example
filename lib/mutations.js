'use strict'

const connectDb = require('./db');
const { ObjectId } = require('mongodb');

module.exports = {
    createCourse: async (root, { input }) => {
        const defaults =  { teacher: '', topic: '' };

        const newCourse = Object.assign(defaults, input);
        let db, course = null;
        try {
            db = await connectDb();
            course = await db.collection('courses').insertOne(newCourse);
            newCourse._id = course.insertedId;
        } catch(err) {
            console.error(err);
        }

        return newCourse;
    },
    createStudent: async (root, { input }) => {
        let db, student = null;
        try {
            db = await connectDb();
            student = await db.collection('student').insertOne(input);
            input._id = student.insertedId;
        } catch(err) {
            console.error(err);
        }

        return input;
    },
    editCourse: async (root, { _id, input }) => {
        let db, course = null;
        try {
            db = await connectDb();
            await db.collection('courses').updateOne({ _id: ObjectId(_id) }, { $set: input });
            course = await db.collection('courses').findOne({ _id: ObjectId(_id) });
        } catch(err) {
            console.error(err);
        }

        return course;
    },
    editStudent: async (root, { _id, input }) => {
        let db, student = null;
        try {
            db = await connectDb();
            await db.collection('students').updateOne({ _id: ObjectId(_id) }, { $set: input });
            student = await db.collection('students').findOne({ _id: ObjectId(_id) });
        } catch(err) {
            console.error(err);
        }

        return student;
    },
    addPeople: async (root, { courseID, personID }) => {
        let db, course, student = null;
        try {
            db = await connectDb();
            course = await db.collection('courses').findOne({ _id: ObjectId(courseID) });
            student = await db.collection('students').findOne({ _id: ObjectId(personID) });
            if(!course || !student) throw new Error('La persona o el curso no existe.');
            await db.collection('courses').updateOne({ $id: ObjectId(courseID) }, { $addToSet: { people: ObjectId(personID) } });
        } catch(err) {
            console.error(err);
        }

        return course;
    }
}