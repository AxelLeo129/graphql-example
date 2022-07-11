'use strict'

const connectDB = require('./db');
const { ObjectId } = require('mongodb');

module.exports =  {
    getCourses: async () => { 
        let db, courses = [];
        try {
            db = await connectDB();
            courses = await db.collection('courses').find().toArray()
        } catch(err) {
            console.log(err);
        }
        return courses;
    },
    getCourse: async (root, { id }) => {
        let db, course = null;
        try {
            db = await connectDB();
            course = await db.collection('courses').findOne({ _id: ObjectId(id) })
        } catch(err) {
            console.log(err);
        }
        return course;
    },
    getStudents: async () => { 
        let db, students = [];
        try {
            db = await connectDB();
            students = await db.collection('students').find().toArray()
        } catch(err) {
            console.log(err);
        }
        return students;
    },
    getStudent: async (root, { id }) => {
        let db, student = null;
        try {
            db = await connectDB();
            student = await db.collection('student').findOne({ _id: ObjectId(id) })
        } catch(err) {
            console.log(err);
        }
        return student;
    }
};