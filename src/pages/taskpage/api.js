import axios from "axios";

async function createTask(
  taskDescription,
  taskPriority,
  taskCompleted,
  taskEmployeeId
) {
  return axios
    .post("http://localhost:5000/task/create", {
      description: taskDescription,
      priority: taskPriority,
      completed: taskCompleted,
      employeeId: taskEmployeeId,
    })
    .then((response) => {
      console.log("Added task");
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getAllTasks() {
  const allTasks = await axios
    .get("http://localhost:5000/task/all")
    .then((response) => response.data);

  console.log(allTasks);

  return allTasks;
}

async function getSingleTask(id) {
  const singleTask = await axios
    .get(`http://localhost:5000/task/${id}`)
    .then((response) => response.data);
  console.log('test', singleTask);
  return singleTask;
}

async function deleteTask(id) {
  return axios
    .delete(`http://localhost:5000/task/${id}`)
    .then((response) => {
      console.log("Deleted task");
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateTask(id, updatedFields) {
  return axios
    .put(`http://localhost:5000/task/update/${id}`, updatedFields)
    .then((response) => {
      console.log("Updated task");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function assignTask() {}

async function unassignTask(id) {
  return axios
    .put(`http://localhost:5000/task/unassign/${id}`)
    .then((response) => {
      console.log("Task unassigned");
    })
    .catch((err) => {
      console.log(err);
    });
}

const TaskAPI = {
  createTask,
  getAllTasks,
  getSingleTask,
  deleteTask,
  updateTask,
  assignTask,
  unassignTask,
};

export default TaskAPI;
