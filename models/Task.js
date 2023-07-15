const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    complited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false, collection: "tasks" }
);

const Task = model("task", schema);

module.exports = {
  Task,
};
