import React from "react";
import logo from "../assets/Logo.png";
import { Box, Text } from "@chakra-ui/react";

export const ExistingUser = ({ email, handleChange, handleClick }) => {
  return (
    <Box
      height={["85vh", "85vh", "90vh", "90vh"]}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <img
        src={logo}
        alt="Wisechamps"
        width={"100px"}
        style={{
          position: "absolute",
          top: "5px",
          left: "10px",
        }}
      />
      <div className="main">
        <Text fontWeight={700} mb={1}>
          Email
        </Text>
        <div className="form">
          <input
            className="input"
            type="email"
            placeholder="Enter Email"
            inputMode="email"
            onChange={handleChange}
          />
          <Text fontSize={"11px"} color={"red"} m={"5px 0 12px 0"}>
            * Please use the registered Email.
          </Text>
          <button id="submit-btn" onClick={() => handleClick(email)}>
            Submit
          </button>
        </div>
      </div>
    </Box>
  );
};
