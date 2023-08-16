import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

function querystring(name: any, url = window.location.href) {
  const parsedName = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");
  const results = regex.exec(url);

  if (!results || !results[2]) {
    return false;
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function AuthenticatedRoute({ children }: any) {
  const { isAuthenticated } = useAppContext();
  const redirect = querystring("redirect");

  if (!isAuthenticated) {
    return <Navigate to={redirect || "/login"} />;
  }

  return children;
}
