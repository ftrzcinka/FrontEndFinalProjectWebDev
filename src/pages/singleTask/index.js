import { useEffect, useState } from "react";
import EmployeeAPI from "../employeepage/api";
import TaskAPI from "../taskpage/api";
import EmployeeCard from "../../components/EmployeeCard";
import TaskCard from "../../components/TaskCard";
import Styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function SingleTask() {
  const [employee, setEmployee] = useState();
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleGoEmployeePage = (id) => {
    navigate(`/employee/${id}`);
  };

  const getSingleTask = async (id) => {
    const foundTask = await TaskAPI.getSingleTask(id);
    setTask(foundTask);
  };

  const refreshTasks = async () => {
    const allTasks = await TaskAPI.getAllTasks();
    setTasks(allTasks);
  };

  useEffect(() => {
    getSingleTask(id);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={Styles.taskList}>
        {console.log(task)}
        {task ? (
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
                getSingleTask(task.id);
                window.location.reload(false);
              }}
            >
              Delete
            </button>
            <button
              onClick={async () => {
                await TaskAPI.unassignTask(task.id);
                refreshTasks();
                getSingleTask(task.id);
                window.location.reload(false);
              }}
            >
              Unassign
            </button>
            <button onClick={() => handleGoEmployeePage(task.employeeId)}>
              View Employee
            </button>
          </div>
        ) : (
          <h3>No Tasks Of Such ID Number</h3>
        )}
      </div>
    </div>
  );
}
