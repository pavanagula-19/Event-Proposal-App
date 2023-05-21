import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "../components/Nav";
import { VendorProposals } from "../components/vendor/Vendorproposal";
import User from "../components/user/User";
import "../styles/app.css";
import "../styles/card1.css";
import "../styles/card2.css";
import "../styles/carditem.css";
import "../styles/cardList.css";
import "../styles/contacts.css";
import "../styles/eachProposal.css";
import "../styles/eventinfo.css";
import "../styles/users.css";
import "../styles/venue.css";


import EventInfo from "../components/user/EventInfo";
import LandingPage from "../components/LoginAndRegister/LandingPage";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export function AppRouter() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route path="*" element={<h1>404 PAGE NOT FOUND!</h1>} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/vendor" element={<Nav/>}>
            <Route path="proposals" element={<VendorProposals />} />
          </Route>
          <Route path="/user" element={<Nav/>}>
            <Route path="proposals" element={<User />} />
            <Route path="proposals/:id" element={<EventInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}