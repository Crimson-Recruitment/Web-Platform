import React, { useState, useEffect } from "react";
import { Box, Snackbar, Alert, AlertColor } from "@mui/material";
import EmployeeCard from "../../../components/Companies/EmployeeCard";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { getCompanyEmployees } from "../../../core/api";
import { IEmployee } from "../../../Models/IEmployee";


function Employees() {
  const [employees, setEmployees] = useState<Array<IEmployee>>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ message: "", severity: "" });
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();



  useEffect(() => {
    ( async() => {
      let employees = await getCompanyEmployees();
      console.log(employees)
      setEmployees(employees)
      setLoading(false)
    })()
  
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const viewDetailsHandler = (employeeId: number) => {
    navigate(`/employee/${employeeId}`)
  };

  return (
    <Box sx={{ p: 2 }}> {/* Adds padding around the entire Box */}
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      {loading ? (
        <Loader />
      ) : employees.length > 0 ? (
        employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employeeName={employee.user.firstName + " " +  employee.user.lastName}
            jobTitle={employee.position}
            onViewDetails={() => viewDetailsHandler(employee.id)}
          />
        ))
      ) : null}
    </div>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={message.severity as AlertColor} sx={{ width: "100%" }}>
        {message.message}
      </Alert>
    </Snackbar>
  </Box>
  );
}

export default Employees;
