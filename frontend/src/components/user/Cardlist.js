import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import "../../styles/cardList.css"
const CardList = ({ items }) => {
  return (
    <div className="card-list">
      {items?.map((item) => (
        
        <CardItem
          key={item._id}
          id={item._id}
          imageSrc={item.images[0]}
          title={item.eventName}
          price={item.budget}
          locatioin={item.placeOfEvent}
        />
      ))}
    </div>
  );
};

export default CardList;