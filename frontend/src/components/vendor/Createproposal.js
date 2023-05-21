import React, { useEffect, useState } from "react";
import  { editProposal_api, newProposal_api } from "../../utills/api-utill";
import { useOutletContext } from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai"
import "../../styles/CreateProposal.css"
export function CreateProposal({ setCreate, onAdd, onUpdate, edit, onEdit }) {

    const [formData, setFormData] = useState({
        eventName: "",
        placeOfEvent: "",
        proposalType: "",
        eventType: "",
        budget: "",
        From: "",
        To: "",
        description: "",
        foodPreferences: "",
        events: ""
    });
    const [boo, setBoo] = useState(true);
    const [imgArray, setImgArray] = useState([]);
    useEffect(() => {
        if (edit) {
            setFormData({ ...edit });
            setImgArray(edit.images.map(each => `http://localhost:5000/proposal/images/${each}`));
        }
    }, []);

    function setPreview(files) {
        setImgArray("");
        for (let i = 0; i < files.length; i++) {
            let url = URL.createObjectURL(files[i]);
            setImgArray(arr => ([...arr, url]));
        }
    }
    const { userID } = useOutletContext();

    const [error, setError] = useState({
        placeOfEvent: "",
        proposalType: "",
        eventType: "",
    });

    function formSubmission(e) {
        e.preventDefault();
    
        if (!formData.placeOfEvent || formData.placeOfEvent === "Select" ) {
            return setError(ex => ({ ...ex, placeOfEvent: "Place of Event required!" }));
        }
        if (!formData.proposalType || formData.proposalType === "Select" ) {
            return setError(ex => ({ ...ex, proposalType: "Proposal Type required!" }));
        }
        if (!formData.eventType || formData.eventType === "Select" ) {
            return setError(ex => ({ ...ex, eventType: "Event Type required!" }));
        }

        setBoo(false);
        let result = new FormData(e.target);
        result.append("vendorId", userID)
        if (!edit) {
            newProposal_api(result)
                .then(res => {
                    if (res.status === "Success") {
                       alert(`${formData.eventName} has been created`)
            
                        onAdd(res.proposal);
                        setCreate(false);
                        setBoo(true);
                    } else alert(res.message);
                })
                .catch(err => {
                    setBoo(true);
                    alert("Error occured, Please try again!");
                })
        } else {
            editProposal_api(result, edit._id)
                .then(res => {
                    if (res.status === "Success") {
                     
                        alert(`${formData.eventName} has been edited`) 
                        onUpdate(res.proposal);
                        onEdit(null);
                        setCreate(false);
                        setBoo(true);
                    } else alert(res.message);
                })
                .catch(err => {
                    setBoo(true);
                    alert("Error occured, Please try again!");
                })
        }
    }

    return <>
        <div className="proposal-form-container">
            <form onSubmit={formSubmission}>
                <span id="cross" onClick={() => {
                    setCreate(false);
                    onEdit(null);
                }}>
                    <AiOutlineClose/>
                </span>
                <h1>Create Proposal</h1>
                <div className="section-container" >
                    <div className="left-section">
                        <div className="name-field">
                            <label htmlFor="eventName">Event Name</label>
                            <input type="text" id="eventName" name="eventName" value={formData.eventName} placeholder="Name" required onChange={(e) => setFormData(ex => ({ ...ex, eventName: e.target.value }))} />
                        </div>
                        <div className="type-field">
                            <div className="type">
                                <label htmlFor="place">Place of Event</label>
                                <select id="place" name="placeOfEvent" value={formData.placeOfEvent} onChange={(e) => {
                                    setFormData(ex => ({ ...ex, placeOfEvent: e.target.value }));
                                    setError(ex => ({ ...ex, placeOfEvent: "" }));
                                    }}>
                                    <option value={"Select"} >Select</option>
                                    <option value={"mumbai"} >mumbai</option>
                                    <option value={"nashik"} >nashik</option>
                                    <option value={"Hydrabad"} >Hydrabad</option>
                                    <option value={"delhi"} >delhi</option>
                                    <option value={"pune"} >pune</option>
                                </select>
                            </div>
                            <div className="type">
                                <label htmlFor="proposalType">Proposal Type</label>
                                <select id="proposalType" name="proposalType" value={formData.proposalType} onChange={(e) => {
                                    setFormData(ex => ({ ...ex, proposalType: e.target.value }));
                                    setError(ex => ({ ...ex, proposalType: "" }));
                                    }}>
                                    <option value={"Select"} >Select</option>
                                    <option value={"Formal"} >Formal</option>
                                    <option value={"In-Formal"} >In-Formal</option>
                                    <option value={"Internal"} >Internal</option>
                                    <option value={"External"} >External</option>
                                </select>
                            </div>
                        </div>
                        {error.placeOfEvent && <span className="error">*{error.placeOfEvent}</span>}
                        {error.proposalType && <span className="error">*{error.proposalType}</span>}
                        <div className="type-field">
                            <div className="type">
                                <label htmlFor="eventType">Event Type</label>
                                <select id="eventType" name="eventType" value={formData.eventType} onChange={(e) => {
                                    setFormData(ex => ({ ...ex, eventType: e.target.value }));
                                    setError(ex => ({ ...ex, eventType: "" }));
                                    }}>
                                    <option value={"Select"} >Select</option>
                                    <option value={"BIRTHDAY"} >BIRTHDAY</option>
                                    <option value={"WEDDING"} >WEDDING</option>
                                    <option value={"RECEPTION"} >RECEPTION</option>
                                    <option value={"ANNIVERSARY"} >ANNIVERSARY</option>
                                    <option value={"BABY SHOWER"}>BABY SHOWER</option>
                                    <option value={"Product launch"} >Product launch</option>
                                </select>
                            </div>
                            <div className="type">
                                <label htmlFor="budjet">Budget</label>
                                <input type="number" id="budjet" name="budget" value={formData.budget} placeholder="000000" required onChange={(e) => setFormData(ex => ({ ...ex, budget: e.target.value }))} />
                            </div>
                        </div>
                        {error.eventType && <span className="error">*{error.eventType}</span>}
                        <div className="type-field">
                            <div className="type">
                                <label htmlFor="from">From</label>
                                <input type="date" id="from" name="From" value={formData.From} required onChange={(e) => setFormData(ex => ({ ...ex, From: e.target.value }))} />
                            </div>
                            <div className="type">
                                <label htmlFor="to">To</label>
                                <input type="date" id="to" name="To" value={formData.To} required onChange={(e) => setFormData(ex => ({ ...ex, To: e.target.value }))} />
                            </div>
                        </div>
                        <div className="description-field">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" value={formData.description} placeholder="Description" required onChange={(e) => setFormData(ex => ({ ...ex, description: e.target.value }))} />
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="img-field">
                            <div className="label-field">
                                <label>Images</label>
                                <input type="file" id="img-file" name="images" multiple="multiple" accept="image/*" onChange={(e) => setPreview(e.target.files)} />
                                <label id="img-btn" htmlFor="img-file" >Add</label>
                            </div>
                            <div className="img-grid">
                                <div className="img-container"><img src={imgArray[0]} alt="" /></div>
                                <div className="img-container"><img src={imgArray[1]} alt="" /></div>
                                <div className="img-container"><img src={imgArray[2]} alt="" /></div>
                                <div className="img-container"><img src={imgArray[3]} alt="" /></div>
                                <div className="img-container"><img src={imgArray[4]} alt="" /></div>
                                <div className="img-container"><img src={imgArray[5]} alt="" /></div>
                                <div className="img-container"><img src={imgArray[6]} alt="" /></div>
                                <div className="img-container"><img src={imgArray[7]} alt="" /></div>
                                <div className="img-container"><img src={imgArray[8]} alt="" /></div>
                                <div className="img-container"><img src={imgArray[9]} alt="" /></div>
                            </div>
                        </div>
                        <div className="food-preference-field">
                            <label htmlFor="foodPreferences">Food Preferencs</label>
                            <textarea id="foodPreferences" name="foodPreferences" value={formData.foodPreferences} placeholder="Preferences" required onChange={(e) => setFormData(ex => ({ ...ex, foodPreferences: e.target.value }))} />
                        </div>
                        <div className="events-field">
                            <label htmlFor="events">Events</label>
                            <textarea id="events" name="events" placeholder="Preferences" value={formData.events} required onChange={(e) => setFormData(ex => ({ ...ex, events: e.target.value }))} />
                        </div>
                    </div>
                </div>
                <div className="button-field">
                    <button type="submit">{boo ? (edit ? "Edit" : "ADD") : <span className="loader"></span>}</button>
                </div>

            </form>
        </div>
    </>
}

