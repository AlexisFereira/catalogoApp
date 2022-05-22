const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name required."],
    },
    lastName: {
      type: String,
      required: [true, "lastname required."],
    },
    email: {
      type: String,
      required: [true, "email required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password required."],
    },
    created: {
      type: Date,
      default: Date.now,
    },
    catalosgAllowed: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    googleAcount: {
      type: String,
    },
    role: {
      type: String,
      default: "USER",
      enum: ["ADMIN", "OWNER", "USER", "DEVELOPER", "MANAGER"],
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        const { _id: id, __v, ...rest } = ret;

        return { id, ...rest };
      },
    },
  }
);

module.exports = mongoose.model("Users", userSchema);
