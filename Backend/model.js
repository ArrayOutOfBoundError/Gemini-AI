import mongoose, { Schema } from "mongoose";

const historySchema = new Schema({
          request: {
                    type : String,
                    required: true,
          },
          response: {
                    type: String,
          }
}, { timestamps: true });

export const History = mongoose.model("History", historySchema);
