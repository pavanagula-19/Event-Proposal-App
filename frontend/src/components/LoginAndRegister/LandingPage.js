import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import PasswordResetForm from "./PasswordResetForm";
import "../../styles/landingpage.css"

export default function LandingPage() {
    const [isLog, setIsLog] = useState(true);
    const [isreset, setIsreset] = useState(true);
    return <>
        <div className="home">
            <h1>LOGO</h1>
            <div className="section">
                <section className="text">
                    All <br />
                    YOUR FAVOURITE <br />
                    EVENT IS HERE
                </section>
                <section className="form-section">
                    {
                        isLog ?
                            (isreset ?
                                <LoginForm setIsLog={setIsLog} setIsreset={setIsreset} /> :
                                <PasswordResetForm setIsreset={setIsreset} />) :
                            <RegisterForm setIsLog={setIsLog} />
                    }
                </section>
            </div>
        </div>
    </>
}