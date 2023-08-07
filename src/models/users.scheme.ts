import { Schema, model } from "mongoose";

const User: Schema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", User);
