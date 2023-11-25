import { Box, ChakraProvider, Tag, Text } from "@chakra-ui/react";
import "react-circular-progressbar/dist/styles.css";
import React, { createRef, useState } from "react";
import preview from "../../assets/preview.jpg";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { useScreenshot } from "./Screenshot";
import Compressor from "compressorjs";
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

export const Stats = ({ contactName, attemps, percentage, grade, credits }) => {
  const ref = createRef(null);
  const [image, setImage] = useState(
    localStorage.getItem("fileBase64")
      ? JSON.parse(localStorage.getItem("fileBase64"))
      : null
  );
  const [screenshot, setScreenshot] = useScreenshot();

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

  const shareImage = async () => {
    setScreenshot(ref.current);
  };

  return (
    <ChakraProvider resetCSS={true} disableGlobalStyle={true}>
      <Box
        width={["340px", "340px", "500px", "50%"]}
        overflow={"hidden"}
        pb={5}
        pt={[1, 1, 1, 2]}
        boxShadow={[
          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        ]}
        borderRadius={"20px"}
      >
        <Box ref={ref}>
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={[
              "flex-start",
              "flex-start",
              "space-between",
              "space-between",
            ]}
            p={["10px", "10px", "10px 50px", "10px 50px"]}
            gap={[8, 8, 0, 0]}
          >
            <Box
              display={"flex"}
              position={"relative"}
              width={"120px"}
              height={"120px"}
              overflow={"hidden"}
            >
              <img
                src={image ? image : preview}
                alt="Upload"
                width={"100%"}
                height={"100%"}
                style={{
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
              />
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
                }}
              />
            </Box>
            <Box color={"#646cff"}>
              <Text
                textTransform={"uppercase"}
                fontFamily={"Lemon, Poppins, sans-serif"}
                fontSize={30}
              >
                {contactName.split(" ")[0].length > 2
                  ? contactName.split(" ")[0]
                  : contactName}
              </Text>
              <Text fontFamily={"Lemon, Poppins, sans-serif"}>
                Credits : {credits ? credits : 0}
              </Text>
              <Text fontFamily={"Lemon, Poppins, sans-serif"}>
                Grade : {grade}
              </Text>
            </Box>
          </Box>
          <hr
            style={{
              margin: "10px 0",
              color: "#ccc",
            }}
          ></hr>
          <Box>
            <Text
              textAlign={"left"}
              color={"#646cff"}
              fontSize={23}
              m={"10px 0 10px 20px"}
              fontFamily={"Lemon, Poppins, sans-serif"}
            >
              IQ Meter :
            </Text>
            <Box
              style={{
                width: "50%",
                margin: "0px auto",
              }}
            >
              <AnimatedProgressProvider value={percentage} />
            </Box>
          </Box>
          {attemps.length > 0 ? (
            <Box>
              <Text
                textAlign={"left"}
                color={"#646cff"}
                fontSize={23}
                m={"15px 0 10px 20px"}
                fontFamily={"Lemon, Poppins, sans-serif"}
              >
                Performance :
              </Text>
              <TableContainer
                borderRadius={"10px"}
                whiteSpace={"unset"}
                maxWidth={"95%"}
                margin={"0 auto"}
                id={"tableContainer"}
              >
                <Table size={"sm"} border={"1px solid #646cff"}>
                  <TableCaption>
                    Weekly Report updates every{" "}
                    <Tag size={"sm"} colorScheme={"linkedin"}>
                      Sunday
                    </Tag>{" "}
                    evening.
                  </TableCaption>
                  <Thead>
                    <Tr height={"50px"}>
                      <Th>Topic</Th>
                      <Th
                        isNumeric
                        borderRight={"1px solid #fff"}
                        borderLeft={"1px solid #fff"}
                      >
                        Score
                      </Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {attemps.map(
                      (
                        {
                          Session_Name,
                          Session_Date_Time,
                          Quiz_Score,
                          Subject,
                          Total_Questions,
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
                            <Tag
                              size={"sm"}
                              colorScheme={Quiz_Score >= 6 ? "green" : "red"}
                            >
                              {Quiz_Score}/{Total_Questions}
                            </Tag>
                          </Td>
                          <Td>
                            {" "}
                            <Tag
                              width={"55px"}
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
    </ChakraProvider>
  );
};
