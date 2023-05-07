import { TextField, IconButton } from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import EmployeeAPI from "../pages/employeepage/api";
import TaskAPI from "../pages/taskpage/api";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

const classes = {
  cardContainer: {
    width: "400px",
    backgroundColor: "#eeeeee",
    border: "2px solid #ffc659",
    borderRadius: "4px",
    padding: "1rem",
    position: "relative",
  },
};

function TaskCard(props) {
  const [taskDescription, setTaskDescription] = useState(props.taskDescription);
  const [taskPriority, setTaskPriority] = useState(props.taskPriority);
  const [taskCompleted, setTaskCompleted] = useState(props.taskCompleted);
  const [taskEmployeeId, setTaskEmployeeId] = useState(props.taskEmployeeId);
  const [editMode, setEditMode] = useState(false);

  function editModeOn() {
    setEditMode(true);
  }
  function editModeOff() {
    setEditMode(false);
    setTaskDescription(props.taskDescription);
    setTaskPriority(props.taskPriority);
    setTaskCompleted(props.taskCompleted);
    setTaskEmployeeId(props.taskEmployeeId);
  }

  return (
    <div style={classes.cardContainer}>
      <div
        style={{
          position: "absolute",
          top: "0.25rem",
          right: "0.25rem",
          zIndex: 1,
        }}
      >
        <IconButton style={{ padding: "0.25rem" }}>
          {editMode ? (
            <ClearIcon
              onClick={editModeOff}
              style={{ color: "rgb(255, 122, 122)" }}
            />
          ) : (
            <EditIcon onClick={editModeOn} style={{ color: "#eba83b" }} />
          )}
        </IconButton>

        {editMode && (
          <IconButton
            style={{ padding: "0.25rem", color: "#4ccc2d" }}
            onClick={async () => {
              const updatedFields = {
                description: taskDescription,
                priority: taskPriority,
                completed: taskCompleted,
                employeeId: taskEmployeeId,
              };
              const employee = await EmployeeAPI.findEmployee(taskEmployeeId);
              if (!employee) {
                editModeOff();
                alert("Invalid Emp ID");
              } else {
                await TaskAPI.updateTask(props.id, updatedFields);
                props.refreshTasks();
              }
            }}
          >
            <CheckIcon />
          </IconButton>
        )}
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <TextField
          value={props.id}
          variant="standard"
          label="Task id"
          disabled={true}
        />
        <TextField
          value={taskPriority}
          variant="standard"
          label="Priority"
          disabled={!editMode}
          onChange={(event) => setTaskPriority(event.target.value)}
        />
        <TextField
          value={taskCompleted}
          variant="standard"
          label="Completed"
          disabled={!editMode}
          onChange={(event) => setTaskCompleted(event.target.value)}
        />
        <TextField
          value={taskEmployeeId}
          variant="standard"
          label="Emp ID"
          disabled={!editMode}
          onChange={(event) => setTaskEmployeeId(event.target.value)}
        />
      </div>
      <TextField
        style={{ width: "100%", marginTop: "0.5rem" }}
        value={taskDescription}
        variant="standard"
        label="Description"
        disabled={!editMode}
        onChange={(event) => setTaskDescription(event.target.value)}
      />
    </div>
  );
}

export default TaskCard;
