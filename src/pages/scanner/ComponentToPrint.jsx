import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import "./Scaner.css";
import Detail from "../single/Detail";

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
        <h1> {date.toLocaleDateString()}</h1>
      </h1>
    </div>
  );
};

export default ComponentToPrint;
