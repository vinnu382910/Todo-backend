const TaskModel = require('../Models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const newTask = new TaskModel({
      userId: req.user._id,  // User is assigned from JWT middleware
      title,
      description,
      status,
    });
    await newTask.save();
    return res.status(201).json({ message: 'Task created successfully!', task: newTask });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating task', error });
  }
};

// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ userId: req.user._id });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status } = req.body;

  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, userId: req.user._id },
      { title, description, status, updatedAt: Date.now() },
      { new: true } //return the updated tasks
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    return res.status(200).json({ message: 'Task updated successfully!', task: updatedTask });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await TaskModel.findOneAndDelete({
      _id: taskId,
      userId: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    return res.status(200).json({ message: 'Task deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting task', error });
  }
};
