import React from 'react'
import "./styles/app.css";
import "./styles/loginForm.css";
import "./styles/vendorProposal.css";
import "./styles/eachProposal.css";
import "./styles/eachProposal.css"
import { AppRouter } from './routers/AppRouter';
import UserContext from './context/UserContext';

const App = () => {
  return <>
    <UserContext>
      <AppRouter />
    </UserContext>
  </>
}

export default App;