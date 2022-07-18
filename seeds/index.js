import express from "express";
import { mongoose } from "mongoose";
import path from "path";
import Campground from "../models/campground.js";
import { cities } from "./cities.js";
import { descriptors, places } from "./seedHelplers.js";

try {
    mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log('CONNECTION OPEN!!');
} catch (error) {
    console.log('ERROR');
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor((Math.random() * 1000));
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        });
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})