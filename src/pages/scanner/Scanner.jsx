import { useState, useEffect } from "react";
import useScanDetection from "use-scan-detection";
import ReactToPrint from "react-to-print";
import { BASE_API_URL } from "../../config/Api";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { Checkmark } from "react-checkmark";
import Single from "../single/Single";
import Detail from "../single/Detail";
import { AiFillCloseCircle } from "react-icons/ai";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";
const Scanner = () => {
  const [photo, setPhoto] = useState(null);

  const [data, setData] = useState();
  const [newKey, setNewKey] = useState("");
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emp, setEmp] = useState({});
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 17 || e.keyCode === 16 || e.keyCode === 74) {
        e.preventDefault();
        setNewKey(newKey);

        // Handle your barcode scanning logic here
      } else if (e.keyCode === 13) {
        setNewKey("");
      } else {
        setNewKey(newKey + e.key);
      }
      setData(newKey);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [newKey]);

  useEffect(() => {
    if (data) getEmployeeScan(newKey);
  }, [data]);

  const getEmployeeScan = async (id) => {
    await axios
      .get(`${BASE_API_URL}/checkTicket/${id}`)
      .then(function (response) {
        setIsLoading(true);
        setRes(response.data);
        setIsLoading(false);

        getDetail(id);

        setTimeout(() => {
          setRes(null);
        }, 1200);
      })
      .catch(function (error) {});
  };
  async function fetchImage(photoProfile) {
    const response = await fetch(
      `${BASE_API_URL}/employees/getPhoto/${photoProfile}`
    );
    const imageBlob = await response.blob();
    setPhoto(window.URL.createObjectURL(imageBlob));
  }
  const getDetail = async (id) => {
    await axios
      .get(`${BASE_API_URL}/employees/getEmployee/${id}`)
      .then(function (response) {
        setEmp(response.data);
        fetchImage(response.data.photoProfile);
      })
      .catch(function (error) {});
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <div>
          {/*           <h2>{data}</h2>
           */}{" "}
          {isLoading && (
            <>
              <Oval
                id="check"
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={10}
              />
            </>
          )}
          {emp && <Detail emp={emp} photo={photo} />}
          {res == null ? (
            <></>
          ) : res ? (
            <div style={{ textAlign: "center" }}>
              <Checkmark size={150} />
              <ComponentToPrint emp={emp} photo={photo} />
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <AiFillCloseCircle size={150} color="red" />
            </div>
          )}
          {/*  <ComponentToPrint /> */}
        </div>
      </div>
    </div>
  );
};

export default Scanner;
