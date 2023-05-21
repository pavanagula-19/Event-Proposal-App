import React, { useState } from "react";
import { deleteProposalByVendor_api } from "../../utills/api-utill";
import bin from "../../image/bin.svg";
import edit from "../../image/edit.svg";
import "../../styles/eachProposal.css";

export function EachProposal({ proposal, onDelete, onEdit, setCreate }) {
  const {
    eventName,
    placeOfEvent,
    proposalType,
    eventType,
    budget,
    From,
    To,
    _id,
    foodPreferences,
    events,
    description,
  } = proposal;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    deleteProposalByVendor_api(_id).then((res) => {
      if (res.status === "Success") {
        alert(`${eventName} has been deleted`)
        onDelete(_id);
      } else {
        alert("Error occurred. Please try again!");
      }
    });
  };

  return (
    <>
      <div className="eachProposal-container">
        <section className="top-section">
          <h1>{eventName}</h1>
          <p>{description}</p>
        </section>
        <section className="bottom-section">
          <section className="event-details">
            <div>
              <p>Event Type</p>
              <h1>{eventType}</h1>
            </div>
            <div>
              <p>Proposal Type</p>
              <h1>{proposalType}</h1>
            </div>
            <div>
              <p>From Date</p>
              <h1>{From}</h1>
            </div>
            <div>
              <p>To Date</p>
              <h1>{To}</h1>
            </div>
            <div>
              <p>Budget</p>
              <h1>{budget}</h1>
            </div>
          </section>
          <section className="feature">
            <div
              className="img-container"
              onClick={() => {
                onEdit(proposal);
                setCreate(true);
              }}
            >
              <img src={edit} alt="" />
            </div>
            <div
              className="img-container"
              onClick={() => {
                setConfirmDelete(true);
              }}
            >
              <img className="Deletebtn" src={bin} alt="" />
            </div>
            {confirmDelete && (
              <div className="delete-confirmation">
                <p>Do you want to delete the event?</p>
                <div className="btns">
                  <button onClick={handleDelete}>YES</button>
                  <button onClick={() => setConfirmDelete(false)}>NO</button>
                </div>
              </div>
            )}
          </section>
        </section>
      </div>
    </>
  );
}
