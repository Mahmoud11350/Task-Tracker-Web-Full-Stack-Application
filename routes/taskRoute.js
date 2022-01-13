const { Router } = require("express");
const Task = require("../models/taskModel");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const route = new Router();

// Creating New Task

route.post("/tasks", auth, async (req, res) => {
  try {
    const task = await new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Deleting Task
route.delete("/tasks/delete/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      throw new Error("No Task Match ");
    }

    return res.status(201).send("deleted");
  } catch (e) {
    return res.status(404).send({
      error: e.message,
    });
  }
});

// Update Task
route.patch("/tasks/update/:id", auth, async (req, res) => {
  const updateKeys = Object.keys(req.body),
    avaliableKeys = ["taskTitle", "taskProgress"];
  const isUpdateOk = updateKeys.every((update) =>
    avaliableKeys.includes(update)
  );
  try {
    if (!isUpdateOk) {
      throw new Error("Invalid Update !");
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new Error("No Task Match !");
    }

    updateKeys.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send({
      error: e.message,
    });
  }
});

// get tasks specific to user
route.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.taskProgress) {
    match.taskProgress = req.query.taskProgress === "true";
  }

  if (req.query.sortby) {
    const values = req.query.sortby.split(":");
    sort[values[0]] = values[1] === "desc" ? -1 : 1;
  }

  try {
    const user = await User.findById(req.user._id).populate({
      path: "tasks",
      match,
      options: {
        sort,
      },
    });

    res.send({
      tasks: user.tasks,
    });
  } catch (e) {
    res.status(500).send({ e: "No Task Match" });
  }
});
module.exports = route;
