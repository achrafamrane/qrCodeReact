import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React from "react";
import BarcodeReader from "react-barcode-reader";
import { BASE_API_URL } from "../../config/Api";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { Checkmark } from "react-checkmark";
import Detail from "../single/Detail";
import { AiFillCloseCircle } from "react-icons/ai";
import ComponentToPrint from "./ComponentToPrint";
const Scanner = () => {
  const [photo, setPhoto] = useState(null);

  const [data, setData] = useState();
  const [newKey, setNewKey] = useState("");
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emp, setEmp] = useState({});
  const handleScan = (newKey) => {
    setData(newKey);
  };
  const handleError = (err) => {
    setData(err);
  };
  useEffect(() => {
    if (data) {
      getEmployeeScan(data);
    }
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
          /*  setNewKey("");
          setRes(null);
          setData(); */
        }, 2000);
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
        if (response.data.photoProfile != null)
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
          <BarcodeReader onError={handleError} onScan={handleScan} />
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
        </div>
      </div>
    </div>
  );
};

export default Scanner;
