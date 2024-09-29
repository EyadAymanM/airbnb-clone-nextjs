import  mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  home_type: {
    type: String,
  },
  room_type: {
    type: String,
  },
  images: {
    type: [String],
  },
  total_bedrooms: {
    type: Number,
  },
  summary: {
    type: String,
  },
  has_tv:{
    type: Boolean,
  },
  has_kitchen:{
    type: Boolean,
  },
has_air_con:{
    type: Boolean,
  },
  has_heating:{
    type: Boolean,
  },
  has_internet:{
    type: Boolean,
  },
  address: {
    type: String,
  },
  price: {
    type: Number,
  },
  published_at:{
    type:Date,
  },
  owner_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  latitude:{
    type: Number,
  },
  longitude:{
    type: Number,
  }
});

export const roomsModel =
  mongoose.models.room || mongoose.model("room", roomSchema );
