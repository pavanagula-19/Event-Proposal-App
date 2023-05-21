import React, { createContext, useState } from "react";

export const UserSelectedProposal = createContext();

export default function UserContext({children}) {

    const [selectedList, setSelectedList] = useState([]);

    return <UserSelectedProposal.Provider value={{
        selectedList,
        onChangeList : data => setSelectedList(data),
        onAddList : data => setSelectedList([...selectedList, data]),
        onDeleteList : data => {
            setSelectedList(selectedList.filter(({_id}) => _id !== data._id))
        }
    }} >
        {children}
    </UserSelectedProposal.Provider>
}