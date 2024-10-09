import React from "react";
import { Box, Flex, Heading, Text, Button, VStack, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { themeColors } from "../../../constants/GlobalStyles";

import qr from "../../../assets/images/qrCode.jpg";

function BuyingGuide() {
  const navigate = useNavigate();

  return (
    <Box w="100%" h="100%" p={8} backgroundColor="#fff">
      <VStack spacing={6} align="stretch" maxWidth="1000px" mx="auto">
        <Heading as="h1" size="xl">
          Payment instructions
        </Heading>

        <Text fontSize="xl">Please transfer money to us in one of the following forms.</Text>

        <Text fontSize="xl">
          After confirming the transfer information, your account will be automatically activated.
          If you encounter any problems, you can contact us via fanpage or call directly for
          support.
        </Text>

        <Text fontSize="xl">
          Contact{" "}
          <a
            href="https://www.facebook.com/sportydi.fptuni"
            style={{ color: themeColors.primaryButton, fontWeight: "bold" }}
          >
            Sportydi fanpage
          </a>
          . Support Hotline:{" "}
          <span style={{ color: themeColors.primaryButton, fontWeight: "bold" }}>096-128-7613</span>
        </Text>

        <Divider />
        <VStack align="start" pl="20px" lineHeight={2}>
          <ul>
            <li>
              <Text as="b" fontSize="xl">
                BIDV Bank - Vietnam Joint Stock Commercial Bank for Investment and Development
              </Text>
            </li>
            <ul style={{ paddingLeft: 20 }}>
              <li>
                <Text fontSize="xl">
                  Account holder: <b>BUI THE TAM</b>
                </Text>
              </li>
              <li>
                <Text fontSize="xl">
                  Account number: <b className="font-12">6521960303</b>
                </Text>
              </li>
              <li>
                <Text fontSize="xl">Transfer content: Order_code</Text>
              </li>
              <li>
                <Box>
                  <Text fontSize="xl" mb="4px">
                    Scan QR code{" "}
                  </Text>
                </Box>
                <Box id="collapseExtrabank1" className="accordion-collapse collapse show">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sportidy-447fd.appspot.com/o/Account_Intro.jpg?alt=media&token=ca1cd760-097b-4873-990f-d35a7c3ddf53"
                    alt="QR Code"
                    style={{ width: "320px" }}
                  />
                </Box>
              </li>
            </ul>
          </ul>
        </VStack>

        <Divider />

        <Text fontSize="xl" textAlign="left">
          When purchasing tickets, you confirm that you have read and agree to Sportydi's Terms and
          Conditions of Transaction.
        </Text>

        {/* <Flex justifyContent="center">
          <Button
            colorScheme="teal"
            onClick={() => navigate("/")}
            mt={4}
            size="lg"
          >
            Trở về trang chủ
          </Button>
        </Flex> */}
      </VStack>
    </Box>
  );
}

export default BuyingGuide;
