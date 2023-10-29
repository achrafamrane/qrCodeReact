import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import "./Scaner.css";
import Detail from "../single/Detail";
import {
  BASE_API_URL,
  DPT_Employee,
  DPT_PRIX,
  IVT_Employee,
  IVT_PRIX,
  CDR_Employee,
  CDR_PRIX,
} from "../../config/Api.js";
const ComponentToPrint = ({ emp, photo }) => {
  const [date, setDate] = useState(new Date());
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  useEffect(() => {
    // Automatically trigger print when the component mounts
    handlePrint();
  }, [handlePrint]);
  return (
    <div className="WMPrint">
      <h1 ref={printRef}>
        <Detail emp={emp} photo={photo} />
        <div>
          {emp?.matricule?.startsWith(DPT_Employee)
            ? DPT_PRIX
            : emp?.matricule?.startsWith(CDR_Employee)
            ? CDR_PRIX
            : IVT_PRIX}
        </div>
        <span> {date.toLocaleDateString()}</span>
      </h1>
    </div>
  );
};

export default ComponentToPrint;
