import React, { useEffect, useState } from "react";
import { EachProposal } from "./EachProposal";
import { CreateProposal } from "./Createproposal";
import { allProposalByVendor_api } from "../../utills/api-utill";
import filter from "../../image/filter.svg"
import "../../styles/vendorProposal.css"
import { useNavigate } from "react-router-dom";
import { proposalFilter } from "../../utills/proposalFilter";
import { getCurrentUser, getToken } from "../../utills/storage-utills";
import Search from "../../image/Search.png"




export function VendorProposals() {

  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");

  const [resultText, setResultText] = useState("No proposal available...");
  const [proposalLoader, setProposalLoader] = useState(true);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [original, setOriginal] = useState([]);
  const [showfilters, setShowfilters] = useState(false);
  const [filters, setFilters] = useState({
    wedding: false,
    birthday: false,
    charity: false,
    reception: false,
    party: false,
    productLaunch: false,
    formal: false,
    inFormal: false,
    internal: false,
    external: false,
    ["0-25000"]: false,
    ["25001-50000"]: false,
    ["50001-75000"]: false,
    ["75001-100000"]: false,
    ["> 100000"]: false,
  });

  function getProposals() {
    allProposalByVendor_api(getCurrentUser()._id).then((res) => {
      if (res.status === "Success") {
        setProposalLoader(false);
        setProposals(res.proposals);
        setOriginal(res.proposals);
      } else alert(res.message);
    });
  }

  useEffect(() => {
    if (!getToken() || !getCurrentUser().isVendor) return navigate("/");
    getProposals();
  }, []);

  ///change onfilter code
  function onFilter(key, val) {
    let updatedFilters = { ...filters, [key]: val };
    setFilters(updatedFilters);
  
    const filteredProposals = proposalFilter(updatedFilters, original);
    if (filteredProposals.length === 0) {
      setResultText("No result found...");
    }
    setProposals(filteredProposals);
  }
  ///to here
  function proposalFilter(filters, proposals) {
    let filteredProposals = [...proposals];
  
    // Filter by event type
    if (filters.birthday) {
      filteredProposals = filteredProposals.filter(proposal => proposal.eventType === "birthday");
    }
    if (filters.wedding) {
      filteredProposals = filteredProposals.filter(proposal => proposal.eventType === "wedding");
    }
    if (filters.reception) {
      filteredProposals = filteredProposals.filter(proposal => proposal.eventType === "reception");
    }
    if (filters.anniversary) {
      filteredProposals = filteredProposals.filter(proposal => proposal.eventType === "anniversary");
    }
    if (filters.babyshower) {
      filteredProposals = filteredProposals.filter(proposal => proposal.eventType === "babyshower");
    }
    if (filters.productLaunch) {
      filteredProposals = filteredProposals.filter(proposal => proposal.eventType === "productLaunch");
    }
  
    // Filter by proposal type
    if (filters.formal) {
      filteredProposals = filteredProposals.filter(proposal => proposal.proposalType === "Formal");
    }
    if (filters.inFormal) {
      filteredProposals = filteredProposals.filter(proposal => proposal.proposalType === "In-Formal");
    }
    if (filters.internal) {
      filteredProposals = filteredProposals.filter(proposal => proposal.proposalType === "Internal");
    }
    if (filters.external) {
      filteredProposals = filteredProposals.filter(proposal => proposal.proposalType === "External");
    }
  
    // Filter by budget range
    if (filters["0-25000"]) {
      filteredProposals = filteredProposals.filter(proposal => proposal.budget >= 0 && proposal.budget <= 25000);
    }
    if (filters["25001-50000"]) {
      filteredProposals = filteredProposals.filter(proposal => proposal.budget >= 25001 && proposal.budget <= 50000);
    }
    if (filters["50001-75000"]) {
      filteredProposals = filteredProposals.filter(proposal => proposal.budget >= 50001 && proposal.budget <= 75000);
    }
    if (filters["75001-100000"]) {
      filteredProposals = filteredProposals.filter(proposal => proposal.budget >= 75001 && proposal.budget <= 100000);
    }
    if (filters["> 100000"]) {
      filteredProposals = filteredProposals.filter(proposal => proposal.budget > 100000);
    }
  
    return filteredProposals;
  }///add this
  

  function searchBar(val) {
    setSearchQuery(val);
    if (val) {
      const resArr = original.filter((each) => {
        if (each.eventName.match(new RegExp(val, "i"))) return true;
        else return false;
      });
      if (resArr.length === 0) setResultText("No result found...");
      setProposals(resArr);
    } else {
      setProposals(original);
    }
  }
  
  return <>
    <div className="vendor-proposals-container">
      <header id="vendors-header">
        <section className="left-section">
          <h1>Proposals</h1>

          <div className="img-container">
            <img src={Search} onClick={() => searchBar(searchQuery)}/>
          </div>
          <input className="search-input" placeholder="search projects..." value={searchQuery} onChange={e => searchBar(e.target.value)} />


        </section>
        <section className="right-section" id="filter">
          <div className="img-container" onClick={() => setShowfilters(!showfilters)}>
            <img src={filter} />
          </div>
          {showfilters && <ul>
            <li className="Eventtype1"> Event-Type</li>
            <li>
              <input type="checkbox" id="birthdayFilter" checked={filters.birthday} onChange={(e) => {
                setFilters(ex => ({ ...ex, birthday: e.target.checked }));
                onFilter("birthday", e.target.checked);
              }} />
              <label htmlFor="birthdayFilter">birthday</label>
            </li>
            <li>
              <input type="checkbox" id="weddingFilter" checked={filters.wedding} onChange={(e) => {
                setFilters(ex => ({ ...ex, wedding: e.target.checked }));
                onFilter("wedding", e.target.checked);
              }} />
              <label htmlFor="weddingFilter">wedding</label>
            </li>
            <li>
              <input type="checkbox" id="receptionFilter" checked={filters.reception} onChange={(e) => {
                setFilters(ex => ({ ...ex, reception: e.target.checked }));
                onFilter("reception", e.target.checked);
              }} />
              <label htmlFor="receptionFilter">Reception</label>
            </li>
            <li>
              <input type="checkbox" id="anniversaryFilter" checked={filters.anniversary} onChange={(e) => {
                setFilters(ex => ({ ...ex, anniversary: e.target.checked }));
                onFilter("anniversary", e.target.checked);
              }} />
              <label htmlFor="anniversaryFilter">anniversary</label>
            </li>
            <li>
              <input type="checkbox" id="babyshowerFilter" checked={filters.babyshower} onChange={(e) => {
                setFilters(ex => ({ ...ex, babyshower: e.target.checked }));
                onFilter("babyshower", e.target.checked);
              }} />
              <label htmlFor="babyshowerFilter">babyshower</label>
            </li>
            <li>
              <input type="checkbox" id="productLaunchFilter" checked={filters.productLaunch} onChange={(e) => {
                setFilters(ex => ({ ...ex, productLaunch: e.target.checked }));
                onFilter("productLaunch", e.target.checked);
              }} />
              <label htmlFor="productLaunchFilter">Product launch</label>
            </li>
            <li className="proposaltype1">Proposal-Type</li>
            <li>
              <input type="checkbox" id="formalFilter" checked={filters.formal} onChange={(e) => {
                setFilters(ex => ({ ...ex, formal: e.target.checked }));
                onFilter("formal", e.target.checked);
              }} />
              <label htmlFor="formalFilter">Formal</label>
            </li>
            <li>
              <input type="checkbox" id="informalFilter" checked={filters.inFormal} onChange={(e) => {
                setFilters(ex => ({ ...ex, inFormal: e.target.checked }));
                onFilter("inFormal", e.target.checked);
              }} />
              <label htmlFor="informalFilter">In-Formal</label>
            </li>
            <li>
              <input type="checkbox" id="internalFilter" checked={filters.internal} onChange={(e) => {
                setFilters(ex => ({ ...ex, internal: e.target.checked }));
                onFilter("internal", e.target.checked);
              }} />
              <label htmlFor="internalFilter">Internal</label>
            </li>
            <li>
              <input type="checkbox" id="externalFilter" checked={filters.external} onChange={(e) => {
                setFilters(ex => ({ ...ex, external: e.target.checked }));
                onFilter("external", e.target.checked);
              }} />
              <label htmlFor="externalFilter">External</label>
            </li>
            <li className="budget1">Budget</li>
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
          </ul>}
          <button onClick={() => setCreate(true)}>CREATE</button>
        </section>
      </header>

      {proposalLoader? <div className="proLoader"></div> : ( proposals.length === 0 ? <h3 className="resultText">{resultText}</h3> : proposals.map((proposal) => {
        return (
          <EachProposal
            key={proposal._id}
            proposal={proposal}
            onDelete={(id) => {
              setProposals(
                proposals.filter(({ _id }) => {
                  return id !== _id;
                })
              );
            }}
            onEdit={(data) => setEdit(data)}
            setCreate={setCreate}
          />
        );
      }))}
    </div>
    {create && (
      <CreateProposal
        setCreate={setCreate}
        onAdd={(data) => {
          setProposals([...proposals, data]);
          setOriginal([...proposals, data]);
        }}
        onUpdate={(data) => {
          setProposals((ex) => {
            return ex.map((each) => {
              if (each._id === data._id) return data;
              else return each;
            });
          });
          setOriginal((ex) => {
            return ex.map((each) => {
              if (each._id === data._id) return data;
              else return each;
            });
          });
        }}
        edit={edit}
        onEdit={() => setEdit(null)}
      />
    )}
  </>
}