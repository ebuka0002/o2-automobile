import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Everything except the homepage is code-split.
const Vehicles = lazy(() => import("./pages/Vehicles"));
const VehicleDetails = lazy(() => import("./pages/VehicleDetails"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Saved = lazy(() => import("./pages/Saved"));
const Compare = lazy(() => import("./pages/Compare"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="vehicles/:id" element={<VehicleDetails />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="saved" element={<Saved />} />
        <Route path="compare" element={<Compare />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
