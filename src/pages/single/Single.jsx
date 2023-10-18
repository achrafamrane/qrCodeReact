import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../config/Api.js";
import { South } from "@mui/icons-material";
import photos from "../../assets/photo.png";

const Single = () => {
  const { userId } = useParams();

  const [emp, setEmp] = useState({});
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    const getDetail = async () => {
      await axios
        .get(`${BASE_API_URL}/employees/getEmployee/${userId}`)
        .then(function (response) {
          setEmp(response.data);
          if (response.data.photoProfile != null) {
            fetchImage(response.data.photoProfile);
          }
          setPhoto(photos);
        })
        .catch(function (error) {});
    };

    getDetail();
  }, []);
  async function fetchImage(photoProfile) {
    const response = await fetch(
      `${BASE_API_URL}/employees/getPhoto/${photoProfile}`
    );
    const imageBlob = await response.blob();
    setPhoto(window.URL.createObjectURL(imageBlob));
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/*             <div className="editButton">Edit</div>
             */}
            <h1 className="title">Scanner</h1>
            <div className="item">
              <img src={photo} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">
                  {emp.firstName + " " + emp.lastName}
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Matricule:</span>
                  <span className="itemValue">{emp.matricule}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Nom:</span>
                  <span className="itemValue">{emp.firstName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Prenom:</span>
                  <span className="itemValue">{emp.lastName}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {/* <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" /> */}
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">All Details</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
