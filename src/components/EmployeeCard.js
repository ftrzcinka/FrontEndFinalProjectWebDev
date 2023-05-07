import { TextField, IconButton} from "@mui/material";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import EmployeeAPI from "../pages/employeepage/api";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

const classes = {
  cardContainer: {
    width: "400px",
    backgroundColor: "#c5c5c5",
    border: "2px solid #ffc659",
    borderRadius: "4px",
    padding: "1rem",
    position: "relative",
  },
};

function EmployeeCard(props) {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [department, setDepartment] = useState(props.department);
  const [editMode, setEditMode] = useState(false);

  function editModeOn() {
    setEditMode(true);
  }
  function editModeOff() {
    setEditMode(false);
    setFirstName(props.firstName);
    setLastName(props.lastName);
    setDepartment(props.department);
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
                firstname: firstName,
                lastname: lastName,
                department: department,
              };
              await EmployeeAPI.updateEmployee(props.id, updatedFields);
              props.refreshEmployees();
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
          label="Emp id"
          disabled={true}
        />
        <TextField
          value={firstName}
          variant="standard"
          label="First Name"
          disabled={!editMode}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          value={lastName}
          variant="standard"
          label="Last Name"
          disabled={!editMode}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <TextField
        style={{ width: "100%", marginTop: "0.5rem" }}
        value={department}
        variant="standard"
        label="Department"
        disabled={!editMode}
        onChange={(event) => setDepartment(event.target.value)}
      />
    </div>
  );
}

export default EmployeeCard;
