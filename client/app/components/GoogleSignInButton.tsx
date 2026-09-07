"use client";

import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

export default function GoogleSignInButton() {
  const handleError = () => {
    console.log("Login Failed");
  };

  const handleSuccess = async (response: CredentialResponse) => {
    console.log(response);

    const result = await fetch(
      "http://localhost:3000/auth/google-authentication",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: response.credential,
        }),
      },
    );

    const data = await result.json();

    console.log(data);
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
}
