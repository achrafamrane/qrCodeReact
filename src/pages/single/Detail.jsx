import React from "react";

import photos from "../../assets/photo.png";

const Detail = ({ emp, photo }) => {
  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            {/*             <div className="editButton">Edit</div>
             */}{" "}
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={photo ? photo : photos} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">
                  {emp.firstName === undefined
                    ? ""
                    : emp.firstName + " " + emp.lastName}
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
        </div>
      </div>
    </div>
  );
};

export default Detail;
