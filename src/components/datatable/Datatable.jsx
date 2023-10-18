import "./datatable.scss";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { BASE_API_URL } from "../../config/Api.js";
import { Button } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
const Datatable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "matricule", headerName: "Matricule", width: 120 },
    { field: "firstName", headerName: "Nom", width: 130 },
    { field: "lastName", headerName: "Prenom", width: 130 },
  ];

  const createNotification = (type, message) => {
    switch (type) {
      case "info":
        NotificationManager.info(message);
        break;
      case "success":
        NotificationManager.success(message);
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          3000
        );
        break;
      case "error":
        NotificationManager.error("Error message", "Click me!", 5000, () => {
          alert("callback");
        });
        break;
    }
  };

  const handleGenerateCode = async () => {
    await axios
      .get(`${BASE_API_URL}/employees/generateQrCode`)
      .then((response) =>
        response.data == true
          ? createNotification("success", "Code generé avec succes")
          : createNotification("info", "Pas de code a generer")
      )

      .catch(function (error) {
        console.log(error);
      });
  };
  const getEmployee = async () => {
    await axios
      .get(`${BASE_API_URL}/employees/all`)
      .then(function (response) {
        setRow(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const [row, setRow] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_API_URL}/employees/deleteEmployee/${id}`)
      .then((response) => {
        console.log(`Deleted post with ID ${id}`);
        setRow(row.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Ajouter un nouveau employee
        <Link to="/users/new" className="link">
          Ajouter
        </Link>
        <Button
          color="error"
          endIcon={<SyncIcon />}
          onClick={handleGenerateCode}
        >
          Generer le code a bar
        </Button>
      </div>
      <DataGrid
        className="datagrid"
        rows={row}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <NotificationContainer />
    </div>
  );
};

export default Datatable;
