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
  const [userData, setUserData] = useState({});

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
      if (emailParam === "teststudent@wisechamps.com") {
        setUserData({
          mode: "user",
          name: "Student",
          grade: "5",
          credits: 5,
          percentage: 95,
          sessions: [
            {
              Session_Date_Time: "2024-05-27T11:00:00+05:30",
              Session_Name: "Nouns  Pronouns",
              Subject: "English",
              Total_Questions: 12,
              attempted: true,
              Quiz_Score: 10,
              id: "4878003000021707061",
            },
            {
              Session_Date_Time: "2024-05-28T11:00:00+05:30",
              Session_Name: "Food and Its Components",
              Subject: "Science",
              Total_Questions: 10,
              attempted: true,
              Quiz_Score: 10,
              id: "4878003000021707066",
            },
            {
              Session_Date_Time: "2024-05-29T11:00:00+05:30",
              Session_Name: "Understanding Elementary Shapes",
              Subject: "Math",
              Total_Questions: 10,
              attempted: true,
              Quiz_Score: 10,
              id: "4878003000021707071",
            },
            {
              Session_Date_Time: "2024-05-30T11:30:00+05:30",
              Session_Name: "Vocabulary",
              Subject: "English",
              Total_Questions: 12,
              attempted: true,
              Quiz_Score: 10,
              id: "4878003000021808093",
            },
            {
              Session_Date_Time: "2024-05-31T11:00:00+05:30",
              Session_Name: "Mirror and Water Images, Direction sense",
              Subject: "Math",
              Total_Questions: 10,
              attempted: true,
              Quiz_Score: 10,
              id: "4878003000021808098",
            },
            {
              Session_Date_Time: "2024-06-01T11:00:00+05:30",
              Session_Name: "Fibre to Fabric  June",
              Subject: "Science",
              Total_Questions: 10,
              attempted: true,
              Quiz_Score: 10,
              id: "4878003000021808103",
            },
            {
              Session_Date_Time: "2024-06-02T11:00:00+05:30",
              Session_Name: "Knowing our Numbers  June",
              Subject: "Math",
              Total_Questions: 10,
              attempted: true,
              Quiz_Score: 10,
              id: "4878003000021808108",
            },
          ],
        });
        setMode("user");
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

  useEffect(() => {
    if (email) {
      handleClick(email);
    }
  }, []);

  if (error) {
    return (
      <div style={{ minHeight: "90vh" }}>
        <h1>Something Went Wrong. Please Refresh</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "90vh",
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

  console.log(userData.sessions);

  if (mode === "user") {
    return (
      <Stats
        sessions={userData.sessions}
        contactName={userData.name.trim()}
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
