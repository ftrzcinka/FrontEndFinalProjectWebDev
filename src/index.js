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
  { path: "/FrontEndFinalProjectWebDev", element: <Homepage /> },
  { path: "/FrontEndFinalProjectWebDev/tasks", element: <Taskpage /> },
  { path: "/FrontEndFinalProjectWebDev/employees", element: <Employeepage /> },
  { path: "/FrontEndFinalProjectWebDev/employee/:id", element: <SingleEmployee /> },
  { path: "/FrontEndFinalProjectWebDev/task/:id", element: <SingleTask /> },
  { path: "/FrontEndFinalProjectWebDev/about", element: <Aboutpage /> },
  { path: "/FrontEndFinalProjectWebDev/contact", element: <Contactpage /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
