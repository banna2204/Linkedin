import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./components/Login/Login.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import Feeds from "./pages/Feeds/Feeds.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import AllActivities from "./pages/AllActivities/AllActivities.jsx";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      setShowLogin(false);
    }
  }, []);

  return (
    <>
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
      <div className="min-h-[85vh]">
        <Routes>
          <Route
            path="/"
            element={
              !showLogin ? <Feeds /> : <Login setShowLogin={setShowLogin} />
            }
          />
          <Route
            path="/profile/:id"
            element={
              !showLogin ? <Profile /> : <Login setShowLogin={setShowLogin} />
            }
          />
          <Route
            path="/profile/:id/activities"
            element={
              !showLogin ? <AllActivities /> : <Login setShowLogin={setShowLogin} />
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
