import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCurrentUser, deleteToken, getCurrentUser } from '../utills/storage-utills';
import "../styles/NavCard.css"
import {BiLogOut} from "react-icons/bi"
import {CgProfile} from "react-icons/cg"
import {AiOutlineMail} from "react-icons/ai"
import {MdCall} from "react-icons/md"

const NavCard = ({ setProfile }) => {
  const navigate = useNavigate();

  const Logout = () => {
    const { name } = getCurrentUser();
    alert(`${name} logged out successfully`)

    deleteToken();
    deleteCurrentUser();
    navigate("/");
  };

  const { contact, email } = getCurrentUser();

  return (
    <div className="Headercard">
      <ul>
        <li> <MdCall/> {contact}</li>
        <li><AiOutlineMail/>  {email}</li>
        <li onClick={() => setProfile(true)}> <CgProfile/>  Change profile</li>
        <li onClick={Logout}>
          <button><BiLogOut/> LOG OUT</button>
        </li>
      </ul>
    </div>
  );
};

export default NavCard;
