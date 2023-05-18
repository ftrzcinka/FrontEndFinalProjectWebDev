import { useEffect, useState } from "react";
import EmployeeAPI from "../employeepage/api";
import TaskAPI from "../taskpage/api";
import EmployeeCard from "../../components/EmployeeCard";
import TaskCard from "../../components/TaskCard";
import Styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function SingleEmployee() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState();
  const [task, setTask] = useState();
  const { id } = useParams();

  const refreshTasks = async () => {
    const allTasks = await TaskAPI.getAllTasks();
    setTasks(allTasks);
  };

  const getSingleTask = async (id) => {
    const foundTask = await TaskAPI.getSingleTask(id);
    setTask(foundTask);
  };

  const navigate = useNavigate();

  const handleGoTaskPage = (id) => {
    navigate(`/FrontEndFinalProjectWebDev/task/${id}`);
  };

  const handleGoEmployeePage = (id) => {
    navigate(`/FrontEndFinalProjectWebDev/employee/${id}`);
  };

  const refreshEmployees = async () => {
    const allEmployees = await EmployeeAPI.getAllEmployees();
    setEmployees(allEmployees);
  };

  const refreshOneEmployee = async (id) => {
    const foundEmployee = await EmployeeAPI.findEmployee(id);
    setEmployee(foundEmployee.employee);
  };

  useEffect(() => {
    refreshOneEmployee(id);
    refreshTasks();
  }, []);
  
  var counter = 0;

  return (
    <div>
      <Navbar />
      <div className={Styles.employeeList}>
        {employee && (
          <div key={employee.id}>
            <EmployeeCard
              id={employee.id}
              firstName={employee.firstname}
              lastName={employee.lastname}
              department={employee.department}
              refreshEmployees={refreshEmployees}
              refreshOneEmployee={() => refreshOneEmployee(employee.id)}
            />
            <button
              onClick={async () => {
                await EmployeeAPI.deleteEmployee(employee.id);
                refreshEmployees(employee.id);
                refreshOneEmployee(employee.id);
                navigate(`/FrontEndFinalProjectWebDev/employees`);
              }}
            >
              Delete User
            </button>
            {/* <button onClick={(employee) => handleGoEmployeePage(employee.id)}>
              View Employee
            </button> */}
            <br></br>
            <br></br>
            <br></br>
            {tasks.map((task) => {
              if (task.employeeId === employee.id) {
                counter += 1;
                return (
                  <div key={task.id}>
                    <TaskCard
                      id={task.id}
                      taskDescription={task.description}
                      taskPriority={task.priority}
                      taskCompleted={task.completed}
                      taskEmployeeId={task.employeeId}
                      refreshTasks={refreshTasks}
                      getSingleTask={getSingleTask}
                    />
                    <button
                      onClick={async () => {
                        await TaskAPI.deleteTask(task.id);
                        refreshTasks();
                        handleGoEmployeePage(employee.id)
                      }}
                    >
                      Delete Task
                    </button>
                    <button
                      onClick={async () => {
                        await TaskAPI.unassignTask(task.id);
                        refreshTasks();
                        handleGoEmployeePage(employee.id)
                      }}
                    >
                      Unassign Task
                    </button>
                    <button onClick={() => handleGoTaskPage(task.id)}>
                      View Task
                    </button>
                    <br></br>
                    <br></br>
                  </div>
                );
              }
              if (counter === 0){
                alert(`No tasks found for employee ${employee.id}!`);
              }
              counter = 0;
            })}
          </div>
        )}
        {!employee && <h3>No Employees Of Such ID Number</h3>}
      </div>
    </div>
  );
}
