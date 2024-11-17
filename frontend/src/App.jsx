import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";


const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer  />
    </div>
  );
};

export default App;
