import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUP/SignUp";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import MyComponent from "./pages/Map/index";
import firebase from "./firebase";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SignIn />}></Route>{" "}
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/map" element={<MyComponent />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
