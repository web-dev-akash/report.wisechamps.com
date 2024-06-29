import { Box, Image, Tag, Text } from "@chakra-ui/react";
import "react-circular-progressbar/dist/styles.css";
import React, { useState } from "react";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import Compressor from "compressorjs";
import incorrect from "../../assets/incorrect.png";
import logo from "../../assets/Logo.png";
import wave from "../../assets/wave.gif";
import {
  Table,
  TableCaption,
  TableContainer,
  Th,
  Thead,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react";
import Avatar, { genConfig } from "react-nice-avatar";

export const Stats = ({
  contactName,
  sessions,
  percentage,
  grade,
  credits,
}) => {
  const config = genConfig(contactName);
  const [image, setImage] = useState(
    localStorage.getItem("fileBase64")
      ? JSON.parse(localStorage.getItem("fileBase64"))
      : null
  );

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(e.target.files[0]));
    new Compressor(file, {
      quality: 0.6,
      success: (res) => {
        getBase64(res).then((base64) => {
          localStorage.setItem("fileBase64", JSON.stringify(base64));
        });
      },
    });
  };

  return (
    <Box
      minHeight={"100vh"}
      display={["unset", "unset", "flex", "flex"]}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        width={"100%"}
        maxWidth={["100%", "100%", "600px", "600px"]}
        overflow={"hidden"}
        borderRadius={"10px"}
        border={["none", "none", "1px solid #4e46e4", "1px solid #4e46e4"]}
        padding={"1rem 10px"}
        textAlign={"center"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={"-10px"}
        >
          <Box>
            <Image src={logo} alt="Wisechamps" width={"120px"} />
          </Box>
          <Box mt={"5px"}>
            <Tag
              colorScheme="purple"
              fontSize={["11px", "11px", "13px", "14px"]}
            >
              Quiz Balance : {credits ? credits : 0}
            </Tag>
            <Tag
              colorScheme="purple"
              ml={1}
              fontSize={["11px", "11px", "13px", "14px"]}
            >
              Grade : {grade}
            </Tag>
          </Box>
        </Box>
        <Box>
          <Box width={"100%"} display={"flex"} gap={"20px"} m={"15px 0 20px 0"}>
            <Box display={"flex"} position={"relative"} overflow={"hidden"}>
              {image ? (
                <Image
                  src={image}
                  alt="Upload"
                  width={"70px"}
                  height={"70px"}
                  borderRadius={"50%"}
                  objectFit={"cover"}
                />
              ) : (
                <Box>
                  <Avatar
                    {...config}
                    style={{ width: "68px", height: "68px" }}
                  />
                  <Text fontSize={"10px"}>Add Photo</Text>
                </Box>
              )}
              <input
                type="file"
                onChange={handleChange}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "120px",
                  height: "120px",
                  cursor: "pointer",
                  opacity: "0",
                  borderRadius: "10px",
                }}
              />
            </Box>
            <Box flexBasis={"73%"} textAlign={"left"}>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Text fontSize={30} fontWeight={500}>
                  Hi,{" "}
                  <Text
                    as={"span"}
                    fontSize={30}
                    fontWeight={700}
                    textTransform={"uppercase"}
                  >
                    {contactName.split(" ")[0].length > 2
                      ? contactName.split(" ")[0]
                      : contactName}
                  </Text>
                </Text>
                <Image
                  position={"relative"}
                  top={"-6px"}
                  transform={"rotateY(180deg)"}
                  src={wave}
                  alt="👋"
                  width={"40px"}
                />
              </Box>
              <Box>
                <Text fontSize={["13px", "13px", "14px", "15px"]}>
                  Weekly Report{" "}
                  <Tag
                    colorScheme="purple"
                    size={["sm", "sm", "sm", "md"]}
                    fontSize={["11px", "11px", "13px", "15px"]}
                  >
                    {new Date(sessions[0].Session_Date_Time).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "long",
                      }
                    )}{" "}
                    -{" "}
                    {new Date(
                      sessions[sessions.length - 1].Session_Date_Time
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                    })}
                  </Tag>
                </Text>
              </Box>
            </Box>
          </Box>
          <hr
            style={{
              color: "#ccc",
            }}
          ></hr>
          <Box>
            <Text
              textAlign={"left"}
              fontSize={["15px", "15px", "18px", "20px"]}
              m={"10px 0 0 0"}
              fontWeight={600}
            >
              IQ Meter
            </Text>
            <Box
              style={{
                width: "50%",
                margin: "0 auto",
              }}
            >
              <AnimatedProgressProvider value={percentage} />
            </Box>
          </Box>
          {sessions?.length > 0 ? (
            <Box>
              <Text
                textAlign={"left"}
                fontSize={["15px", "15px", "18px", "20px"]}
                m={"15px 0 5px 0"}
                fontWeight={600}
              >
                Performance
              </Text>
              <TableContainer
                borderRadius={"10px"}
                whiteSpace={"unset"}
                maxWidth={"100%"}
                margin={"0 auto"}
                id={"tableContainer"}
              >
                <Table size={"sm"} border={"1px solid #646cff"}>
                  <TableCaption>
                    Weekly Report updates every{" "}
                    <Tag size={"sm"} colorScheme={"purple"}>
                      Sunday
                    </Tag>{" "}
                    evening.
                  </TableCaption>
                  <Thead>
                    <Tr height={"50px"}>
                      <Th>
                        <Text fontSize={["11px", "11px", "13px", "14px"]}>
                          Topic
                        </Text>
                      </Th>
                      <Th
                        isNumeric
                        borderRight={"1px solid #fff"}
                        borderLeft={"1px solid #fff"}
                      >
                        <Text fontSize={["11px", "11px", "13px", "14px"]}>
                          Score
                        </Text>
                      </Th>
                      <Th>
                        <Text fontSize={["11px", "11px", "13px", "14px"]}>
                          Date
                        </Text>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {sessions.map(
                      (
                        {
                          Session_Name,
                          Session_Date_Time,
                          Quiz_Score,
                          Subject,
                          Total_Questions,
                          attempted,
                        },
                        i
                      ) => (
                        <Tr key={i}>
                          <Td>
                            {!Session_Name
                              ? `${Subject} Live Quiz`
                              : Session_Name}
                          </Td>
                          <Td isNumeric>
                            {attempted ? (
                              <Tag
                                size={"sm"}
                                colorScheme={Quiz_Score >= 6 ? "green" : "red"}
                              >
                                {Quiz_Score}/{Total_Questions}
                              </Tag>
                            ) : (
                              <Box display={"flex"} justifyContent={"center"}>
                                <img src={incorrect} alt="NA" width={"30px"} />
                              </Box>
                            )}
                          </Td>
                          <Td>
                            {" "}
                            <Tag
                              width={"58px"}
                              size={"sm"}
                              colorScheme={Quiz_Score >= 6 ? "green" : "red"}
                            >
                              {new Date(Session_Date_Time).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </Tag>
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
