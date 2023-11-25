import { useState } from "react";
import { RaceBy } from "@uiball/loaders";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import "animate.css";
import { Stats } from "./Components/Stats/Stats";
import { ExistingUser } from "./Components/ExistingUser";
import { NoUserFound } from "./Components/NoUserFound";
import { NoAttemptsFound } from "./Components/NoAttemptsFound";

export const App = () => {
  const query = new URLSearchParams(window.location.search);
  const localEmail = localStorage.getItem("wisechamps_email")
    ? localStorage.getItem("wisechamps_email")
    : null;
  const [email, setEmail] = useState(
    query.get("email") ? query.get("email") : localEmail
  );
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState(null);

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleClick = async (emailParam) => {
    try {
      if (!emailRegex.test(emailParam)) {
        alert("Please enter a Valid Email");
        return;
      }
      setLoading(true);
      localStorage.setItem("wisechamps_email", emailParam);
      const url = `https://backend.wisechamps.com/quiz/report`;
      const res = await axios.post(url, { email: emailParam });
      setMode(res.data.mode);
      setUserData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  console.log(userData);

  useEffect(() => {
    if (email) {
      handleClick(email);
    }
  }, []);

  if (error) {
    return (
      <div>
        <h1>Something Went Wrong. Please Refresh</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            width: "100%",
          }}
        >
          Generating your weekly report..
        </p>
        <RaceBy
          size={300}
          lineWeight={20}
          speed={1.4}
          color="rgba(129, 140, 248)"
        />
      </div>
    );
  }

  if (mode === "nouser") {
    return <NoUserFound setMode={setMode} />;
  }

  if (mode === "noattempt") {
    return <NoAttemptsFound />;
  }

  if (mode === "user") {
    return (
      <Stats
        attemps={userData.attempts}
        contactName={userData.name}
        grade={userData.grade}
        percentage={userData.percentage}
        credits={userData.credits}
      />
    );
  }

  return (
    <ExistingUser
      email={email}
      handleChange={handleChange}
      handleClick={handleClick}
    />
  );
};
