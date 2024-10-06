"use client";

import { useState, useEffect } from "react";
import { signInFlow } from "../types";
import SignUpCard from "./sign-up-card";
import SignInCard from "./sign-in-card";
import SignUpAdminCard from "./sign-up-admin-card";

type AuthScreenProps = {
    initialFlow: signInFlow;
    onAuthSuccess: () => void;
}

export default function  AuthScreen ({initialFlow, onAuthSuccess}: AuthScreenProps){
    const [signInFlow, setSignInFlow] = useState(initialFlow);



    return (
    <div>
        {signInFlow === "signIn" && <SignInCard setSignInFlow={setSignInFlow} onAuthSuccess={onAuthSuccess} />}
        {signInFlow === "signUp" && <SignUpCard setSignInFlow={setSignInFlow} />}
        {signInFlow === "adminSignUp" && <SignUpAdminCard setSignInFlow={setSignInFlow} />}    
    </div>
  )
};
