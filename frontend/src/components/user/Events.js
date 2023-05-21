import React from "react";

const Events = ({items}) => {
  const eventList=items.events.split(",")
  return (
    <div className="events-list">
      <div className="venue-title">Events</div>
      {
        eventList.map((venue)=>(<>
        <div className="venue-text">
      {venue}
      </div>
        </>))
      }
    </div>
  );
};

export default Events;