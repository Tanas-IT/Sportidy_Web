import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  useBreakpointValue,
  Icon,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai"; // Import biểu tượng thất bại
import { updatePaymentStatus } from "../../../services/PaymentService";
import { PaymentStatus } from "../../../constants/Enum";
import { useNavigate } from "react-router-dom";

function PaymentFailure() {
  const navigate = useNavigate();
  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });
  const textSize = useBreakpointValue({ base: "md", md: "xl" });
  const [isRenew, setIsRenew] = useState<boolean>(false);

  useEffect(() => {
    const fetchChangePaymentStatus = async () => {
      const queryParams = new URLSearchParams(location.search);
      const playFieldIdParam = queryParams.get("playfieldId");
      const userIdParam = queryParams.get("userId");
      const statusParam = queryParams.get("status");
      const orderCode = queryParams.get("orderCode");
      const priceParam = queryParams.get("price");

      if (orderCode && userIdParam) {
        try {
          const result = await updatePaymentStatus(orderCode, 2);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error("Invalid payment or user ID information.");
      }
    };

    fetchChangePaymentStatus();
  }, []);

  const handleClickBackHome = () => {
    navigate("/");
  };

  return (
    <Box height="100vh" bg="gray.100" w="100%" p={4}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        textAlign="center"
        maxW="650px" // Giới hạn chiều rộng để cân đối nội dung
        mx="auto" // Canh giữa cho nội dung
      >
        {/* Icon thất bại */}
        <Icon as={AiOutlineCloseCircle} color="red.500" boxSize={24} mb={4} />

        {/* Tiêu đề */}
        <Heading as="h1" size={headingSize} mb={4}>
          Payment failed!
        </Heading>

        {/* Thông báo */}
        <Text fontSize={textSize} mb={6} px={4}>
          An error occurred during payment. Please try again later.
        </Text>

        {/* Hướng dẫn các bước khắc phục */}
        <VStack spacing={3} alignItems="center" mb={6} px={4}>
          <Text fontSize={textSize} fontWeight="bold">
            You can try:
          </Text>
          <HStack>
            <Icon as={AiOutlineCloseCircle} color="red.500" />
            <Text fontSize={textSize}>Double check your card or account information</Text>
          </HStack>
          <HStack>
            <Icon as={AiOutlineCloseCircle} color="red.500" />
            <Text fontSize={textSize}>
              Try again in a few minutes if there is a network problem
            </Text>
          </HStack>
          <HStack>
            <Icon as={AiOutlineCloseCircle} color="red.500" />
            <Text fontSize={textSize}>Contact support if problem persists.</Text>
          </HStack>
        </VStack>

        {/* Nút quay về trang chủ */}
        <Button
          onClick={handleClickBackHome}
          colorScheme="teal"
          size="lg"
          mb={4}
          width="full"
          maxW="300px"
        >
          Back to home page
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentFailure;
