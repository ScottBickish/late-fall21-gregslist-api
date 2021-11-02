import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const HouseSchema = new Schema({
    bedrooms: {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    levels: {type: Number, min: 1},
    imgUrl: {type: String, default: 'No Image Provided'},
    year: {type: Number},
    price: {type: Number, min: 1000},
    description: {type: String, default: 'No Description Provided'},
    creatorId: { type: ObjectId, required: true, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })
HouseSchema.virtual('creator', {
    // what property on this object is it defined on
    localField: 'creatorId',
    // what collection do you want to pull from
    ref: 'Profile',
    // what is the property on that collection object
    foreignField: '_id',
    // safety clause for one to many
    justOne: true
  })