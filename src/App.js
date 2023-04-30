import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage";
import Tasks from './pages/tasks/index'
import Employees from './pages/employees/index'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
      </Routes>
    </BrowserRouter>


   
  );
}

export default App;
