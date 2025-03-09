import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";
import Images from "./images";
import Header from "./header";
import { useUser } from "@clerk/clerk-react";
import Login from "./login";
import Public from "./public";
import { Toaster } from "./ui/sonner";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/images" element={<Images />} />
        <Route path="/public/:userId/:imageName" element={<Public />} />
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
};

export default Router;
