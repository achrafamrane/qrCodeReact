import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../config/Api.js";
import axios from "axios";
import { useParams } from "react-router-dom";

const List = () => {
  const { userId } = useParams();
  const [rows, setRows] = useState(null);
  useEffect(() => {
    const getDetail = async () => {
      await axios
        .get(`${BASE_API_URL}/countTicket/${userId}`)
        .then(function (response) {
          setRows(response.data);
        })
        .catch(function (error) {});
    };

    getDetail();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Ticket ID</TableCell>
            <TableCell className="tableCell">Ticket Count</TableCell>
            <TableCell className="tableCell">Month</TableCell>
            <TableCell className="tableCell">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && (
            <TableRow key={rows.id}>
              <TableCell className="tableCell">{rows.id}</TableCell>
              <TableCell className="tableCell status Approved">
                {rows.ticketCount}
              </TableCell>
              <TableCell className="tableCell">{rows.month}</TableCell>
              <TableCell className="tableCell">{rows.year}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
