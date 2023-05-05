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

const EmployeeAPI = {
  getAllEmployees,
  deleteEmployee,
  createEmployee,
};

export default EmployeeAPI;
