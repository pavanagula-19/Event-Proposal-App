import axios from "axios";
import React, { useContext, useState } from "react";
import { getCurrentUser, setCurrentUser } from "../../utills/storage-utills";
import { UserSelectedProposal } from "../../context/UserContext";
import CardItem from "./CardItem";
import  {AiOutlineCloseCircle} from "react-icons/ai"

const Deletecard = ({ item }) => {
  const { onDeleteList } = useContext(UserSelectedProposal);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteSelected = (id, name) => {
    axios
      .put(`http://localhost:5000/delete-list/${getCurrentUser()._id}`, {
        selected: id,
      })
      .then((res) => {
        if (res.data.status === "completed") {
          alert(`${name} removed from selected`);
          console.log("on delete: ", res.data.data.selected);
          setCurrentUser(res.data.data);
          onDeleteList({ _id: id });
          setConfirmDelete(false);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => alert(err.message));
  };
  
  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <div className="scard-list">
      <div className="cardslist">
        <CardItem
          key={item?._id}
          id={item?._id}
          imageSrc={item?.images[0]}
          title={item?.eventName}
          price={item?.budget}
          locatioin={item?.placeOfEvent}
        />
        <div className="del-icon" onClick={handleConfirmDelete}>
          <AiOutlineCloseCircle/>
        </div>
        {confirmDelete && (
          <div className="delete-confirmation">
            <p>
              <br /> Do you want to delete the event?
            </p>
            <div className="btns">
              <button onClick={() => deleteSelected(item?._id, item?.eventName)}>
                YES
              </button>
              <button onClick={handleCancelDelete}>NO</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deletecard;
