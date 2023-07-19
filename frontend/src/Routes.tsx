import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import UnauthenticatedRoute from "./containers/UnauthenticatedRoute";
import AuthenticatedRoute from "./containers/AuthenticatedRoute";

export default function Links() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthenticatedRoute>
            <Home />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <LogIn />
          </UnauthenticatedRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}
