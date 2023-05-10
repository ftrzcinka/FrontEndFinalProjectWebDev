import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/homepage";
import Taskpage from "./pages/taskpage";
import Employeepage from "./pages/employeepage";
import SingleEmployee from "./pages/singleEmployee";
import SingleTask from "./pages/singleTask";
import Aboutpage from "./pages/aboutpage";
import Contactpage from "./pages/contactpage";

// Add an object to the array for more routes
const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/tasks", element: <Taskpage /> },
  { path: "/employees", element: <Employeepage /> },
  { path: "/employee/:id", element: <SingleEmployee /> },
  { path: "/task/:id", element: <SingleTask /> },
  { path: "/about", element: <Aboutpage /> },
  { path: "/contact", element: <Contactpage /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
