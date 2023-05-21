import React, { useState, useEffect, useContext } from "react";
import "../../styles/users.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  { allSelectedProposal_api } from "../../utills/api-utill";
import { getCurrentUser, getToken } from "../../utills/storage-utills";
import Deletecard from "./Deletecard";
import { UserSelectedProposal } from "../../context/UserContext";
import PaginationCard from "./PaginationCard";
import {proposalFilter} from '../../utills/proposalFilter';
import Party from "../../image/party.jpg";
import filter from "../../image/filter.svg"
const User = () => {

  const {selectedList, onChangeList} = useContext(UserSelectedProposal);

  const navigate = useNavigate();
  const [items, setitems] = useState();
  const [pageitems,setPageitems]=useState()
  const [original, setOriginal] = useState([]);
  const [showfilters,setShowfilters]=useState(false)
  // const [resulttext,setResultText]=useState()
  const [filters, setFilters] = useState({
    wedding: false,
    birthday: false,
    charity: false,
    reception: false,
    party: false,
    productLaunch: false,
    ["0-25000"]: false,
    ["25001-50000"]: false,
    ["50001-75000"]: false,
    ["75001-100000"]: false,
    ["> 100000"]: false,
  });
  const [proposalLoader,setproposalloader]=useState(true)
  useEffect(() => {
    if (!getToken() || !getCurrentUser().isUser) return navigate("/");
    
    allSelectedProposal_api(getCurrentUser()._id)
    .then(res => {
      if(res.status === "Success") {
        onChangeList(res.proposals);
      } else alert(res.message);
    })
    .catch(err => alert(err.message));

    axios
      .get(`http://localhost:5000/proposal`)
      .then((res) => {
        setitems(res.data.proposals);
        setOriginal(res.data.proposals)
        setproposalloader(false)
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  function onFilter(key, val) {
    let inp = { ...filters, [key]: val };
    const result = proposalFilter(inp, original);
    if (!result) setitems(original);
    else {
      
      setitems(result);
    }
  }

  return <>
    
{ proposalLoader? <div className="proloader-container"><div className="proLoader"></div></div> :
    <div>
      <div>
        <img className="headerimg" src={Party} alt="name" />
      </div>
      {selectedList.length > 0 ? (
        <>
          <div className="selcteddiv">
            {" "}
            <span className="selectedtext">Selected</span>
          </div>
          <div className="slistmain">
            {selectedList.map((lis) => (
              <div className="slist">
                <Deletecard item={lis} />
              </div>
            ))}
          </div>
        </>
      ) : null}
      <div className="proposals">
        <p>Proposals</p>
        <div className="right-section-userProposal">
        {/* <div className="img-container" onClick={() => setShowfilters(!showfilters)}>
            <img src={filter} />
          </div> */}
          {/* {showfilters && <ul id="user-filter">
            <li>Event-Type</li>
            <li>
              <input type="checkbox" id="weddingFilter" checked={filters.wedding} onChange={(e) => {
                setFilters(ex => ({ ...ex, wedding: e.target.checked }));
                onFilter("wedding", e.target.checked);
              }} />
              <label htmlFor="weddingFilter">Wedding</label>
            </li>
            <li>
              <input type="checkbox" id="birthdayFilter" checked={filters.birthday} onChange={(e) => {
                setFilters(ex => ({ ...ex, birthday: e.target.checked }));
                onFilter("birthday", e.target.checked);
              }} />
              <label htmlFor="birthdayFilter">Birthday</label>
            </li>
            <li>
              <input type="checkbox" id="receptionFilter" checked={filters.reception} onChange={(e) => {
                setFilters(ex => ({ ...ex, reception: e.target.checked }));
                onFilter("reception", e.target.checked);
              }} />
              <label htmlFor="receptionFilter">Reception</label>
            </li>
            <li>
              <input type="checkbox" id="charityFilter" checked={filters.charity} onChange={(e) => {
                setFilters(ex => ({ ...ex, charity: e.target.checked }));
                onFilter("charity", e.target.checked);
              }} />
              <label htmlFor="charityFilter">Charity</label>
            </li>
            <li>
              <input type="checkbox" id="partyFilter" checked={filters.party} onChange={(e) => {
                setFilters(ex => ({ ...ex, party: e.target.checked }));
                onFilter("party", e.target.checked);
              }} />
              <label htmlFor="partyFilter">Party</label>
            </li>
            <li>
              <input type="checkbox" id="productLaunchFilter" checked={filters.productLaunch} onChange={(e) => {
                setFilters(ex => ({ ...ex, productLaunch: e.target.checked }));
                onFilter("productLaunch", e.target.checked);
              }} />
              <label htmlFor="productLaunchFilter">Product launch</label>
            </li>
            <li>Budget</li>
            <li>
              <input type="checkbox" id="0-25000Filter" checked={filters["0-25000"]} onChange={(e) => {
                setFilters(ex => ({ ...ex, ["0-25000"]: e.target.checked }));
                onFilter("0-25000", e.target.checked);
              }} />
              <label htmlFor="0-25000Filter">0 - 25000</label>
            </li>
            <li>
              <input type="checkbox" id="25001-50000Filter" checked={filters["25001-50000"]} onChange={(e) => {
                setFilters(ex => ({ ...ex, ["25001-50000"]: e.target.checked }));
                onFilter("25001-50000", e.target.checked);
              }} />
              <label htmlFor="25001-50000Filter">25001 - 50000</label>
            </li>
            <li>
              <input type="checkbox" id="50001-75000Filter" checked={filters["50001-75000"]} onChange={(e) => {
                setFilters(ex => ({ ...ex, ["50001-75000"]: e.target.checked }));
                onFilter("50001-75000", e.target.checked);
              }} />
              <label htmlFor="50001-75000Filter">50001 - 75000</label>
            </li>
            <li>
              <input type="checkbox" id="75001-100000Filter" checked={filters["75001-100000"]} onChange={(e) => {
                setFilters(ex => ({ ...ex, ["75001-100000"]: e.target.checked }));
                onFilter("75001-100000", e.target.checked);
              }} />
              <label htmlFor="75001-100000Filter">75001 - 100000</label>
            </li>
            <li>
              <input type="checkbox" id="above100000Filter" checked={filters["> 100000"]} onChange={(e) => {
                setFilters(ex => ({ ...ex, ["> 100000"]: e.target.checked }));
                onFilter("> 100000", e.target.checked);
              }} />
              <label htmlFor="above100000Filter">above 100000</label>
            </li>
          </ul>} */}
        </div>
      </div>
      {/* <div className="eventlists"> */}
      <div className="pagination">
        <PaginationCard items={items} pageitemss={setPageitems}/>
      {/* </div> */}
      </div>
    </div>
}
    </>
};

export default User;