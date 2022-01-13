const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskTitle: {
      type: String,
      required: true,
    },
    taskDay: {
      type: String,
      required: true,
    },
    taskHours: {
      type: String,
      required: true,
    },
    taskProgress: {
      type: Boolean,
      default: false,
    },
    owner: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
