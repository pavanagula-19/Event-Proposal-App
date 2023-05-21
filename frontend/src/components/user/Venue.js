import React from "react";
import "../../styles/venue.css"

const Venue = ({items}) => {
  const venueList=items.description.split(",")
  return (
    <div className="venue">
      <div className="venue-title">Venue And Arrangments</div>
      {
        venueList.map((venue)=>(<>
        <div className="venue-text">
      {venue}
      </div>
        </>))
      }
      
    </div>
  );
};

export default Venue;