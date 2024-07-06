import mongoose from "mongoose";

import defaultSchema from "../../../bLove/cUtility/bDefaultSchema";


const schema = new mongoose.Schema({
  ...defaultSchema
})

export const BaseModel = mongoose.model("BaseModel", schema);
