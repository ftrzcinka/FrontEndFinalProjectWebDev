import axios from "axios";

async function createEmployee(firstName, lastName, department) {
  return axios
    .post("http://localhost:5000/employee/create", {
      firstname: firstName,
      lastname: lastName,
      department: department,
    })
    .then((response) => {
      console.log("Added employee");
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function findEmployee(id){
  const employee = await axios
  .get(`http://localhost:5000/employee/${id}`)
  .then((response) => response.data)
  .catch((err) => {
    return null
  })

  return employee;
}

async function getAllEmployees() {
  const allEmployees = await axios
    .get("http://localhost:5000/employee/all")
    .then((response) => response.data);

  console.log(allEmployees);

  return allEmployees;
}

async function deleteEmployee(id) {
  return axios
    .delete(`http://localhost:5000/employee/${id}`)
    .then((response) => {
      console.log("Deleted employee");
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateEmployee(id, updatedFields) {
  return axios
  .put(`http://localhost:5000/employee/${id}`, updatedFields)
  .then((response) => {
    console.log("Updated employee");
  })
  .catch((err) => {
    console.log(err);
  });
}

const EmployeeAPI = {
  getAllEmployees,
  deleteEmployee,
  findEmployee,
  createEmployee,
  updateEmployee,
};

export default EmployeeAPI;
