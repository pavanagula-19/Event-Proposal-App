import React from "react";

const Food = ({items}) => {
  const foodList=items.foodPreferences.split(",")
  return (
    <div className="venue">
      <div className="venue-title">Food Preferences</div>
      {
        foodList.map((venue)=>(<>
        <div className="venue-text">
      {venue}
      </div>
        </>))
      }
    
    </div>
  );
};

export default Food;