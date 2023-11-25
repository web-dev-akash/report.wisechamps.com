import React, { useState, useEffect } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RadialSeparators from "./RadialSeparators";

const AnimatedProgressProvider = ({ value }) => {
  const [percentage, setPercentage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < value) {
        setPercentage((prevPercentage) => prevPercentage + 1);
      }
    }, 15);
  }, [value, percentage]);

  return (
    <CircularProgressbarWithChildren
      background={true}
      value={percentage}
      backgroundPadding={5}
      text={`${percentage}%`}
      strokeWidth={10}
      styles={buildStyles({
        pathColor: "#fff",
        textSize: "12px",
        backgroundColor: "#646cff",
        trailColor: "rgba(129, 140, 248)",
        strokeLinecap: "butt",
        textColor: "#fff",
      })}
    >
      <RadialSeparators
        count={15}
        style={{
          background: "#646cff",
          width: "2px",
          height: `${15}%`,
        }}
      />
    </CircularProgressbarWithChildren>
  );
};

export default AnimatedProgressProvider;
