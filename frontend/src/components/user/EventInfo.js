import React, { useContext, useEffect, useState } from "react";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Contacts from "./Contacts";
import Events from "./Events";
import Food from "./Food";
import Venue from "./Venue";
import axios from "axios";
import "../../styles/eventinfo.css"
import { useNavigate, useParams } from "react-router-dom";
import { singleVendor_api } from "../../utills/api-utill";
import { getCurrentUser, getToken, setCurrentUser } from "../../utills/storage-utills";
import { UserSelectedProposal } from "../../context/UserContext";
const EventInfo = () => {
  
  const {onAddList} = useContext(UserSelectedProposal);

  const navigate = useNavigate();
  const params = useParams();
  const [items, setitems] = useState();
  const [vendor, setvendor] = useState();
  useEffect(() => {
    if (!getToken() || !getCurrentUser().isUser) return navigate("/");
    axios
      .get(`http://localhost:5000/proposal/${params.id}`)
      .then((res) => {
        setitems(res.data.proposal);
        console.log("proposal",res.data.proposal);

        singleVendor_api(res.data.proposal.vendorId)
          .then((res) => {
            setvendor(res.data.vendor);
          })
          .catch((err) => alert(err.message));
      })
      .catch((err) => alert(err.message));
  }, []);



  const selectbtn = () => {
    axios
      .put(`http://localhost:5000/update/${getCurrentUser()._id}`, {
        selected: items,
      })
      .then((res) => {
        if(res.data.status === "completed"){
           alert(`${items.eventName} is added to proposals`)
        setCurrentUser(res.data.data)
        if(res.data.message === "updated") onAddList(items);
        navigate("/user/proposals");
        } else alert(res.data.message);
        
      })
      .catch((err) => alert(err.message));
    
  };

  return (
    <div>
      {items ? (
        <>
          <div className="col1">
            <div className="event-data">
              {" "}
              <span className="col1-proposals"><button className=" proposal-btn" onClick={()=> navigate(-1)}><span className="proposal-text">Proposals</span></button></span>{" "}
              <span className="col1-icon">{"--"}</span>{" "}
              <span className="col1-contract">  {vendor?.name}  </span>
            </div>
            <div>
              <button className="btn select-btn" onClick={selectbtn}>
                {" "}
                <span className="btn-text">select</span>
              </button>
            </div>
          </div>

          <div className="eventPage">
            <div className="row1">
              <div className="card1">
                <Card1 items={items} vendor={vendor} />
              </div>
              <div className="card2">
                <Card2 items={items} />
              </div>
            </div>
            <div className="row2">
              <div>
                <Venue items={items} />
              </div>
              <div className="contacts">
                <Contacts vendor={vendor} />
              </div>
            </div>
            <div className="row3">
              <div className="foodPrefernces">
                <Food items={items} />
              </div>
              <div className="events">
                <Events items={items} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EventInfo;