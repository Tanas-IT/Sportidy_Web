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
import { AiOutlineCloseCircle } from "react-icons/ai";
import { updatePaymentStatus } from "../../../services/PaymentService";
import { PaymentStatus } from "../../../constants/Enum";
import { useNavigate } from "react-router-dom";

function PaymentCancel() {
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
      const bookingCode = queryParams.get("bookingCode");
      const priceParam = queryParams.get("price");

      if (userIdParam && bookingCode) {
        try {
          const result = updatePaymentStatus(bookingCode, 4);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error("Thông tin ID thanh toán hoặc người dùng không hợp lệ.");
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
        {/* Icon thanh toán bị hủy */}
        <Icon as={AiOutlineCloseCircle} color="red.500" boxSize={24} mb={4} />

        {/* Tiêu đề */}
        <Heading as="h1" size={headingSize} mb={4}>
          Payment is cancelled!
        </Heading>

        {/* Thông báo */}
        <Text fontSize={textSize} mb={6} px={4}>
          Your payment has been canceled. Please try again or contact support if you need help.
        </Text>

        {/* Các bước tiếp theo */}
        <VStack spacing={3} alignItems="center" mb={6} px={4}>
          <Text fontSize={textSize} fontWeight="bold">
            Next steps:
          </Text>
          <HStack>
            <Icon as={AiOutlineCloseCircle} color="red.500" />
            <Text fontSize={textSize}>
              Try your payment again or choose a different payment method.
            </Text>
          </HStack>
          <HStack>
            <Icon as={AiOutlineCloseCircle} color="red.500" />
            <Text fontSize={textSize}>Check email for more information if there is a problem.</Text>
          </HStack>
          <HStack>
            <Icon as={AiOutlineCloseCircle} color="red.500" />
            <Text fontSize={textSize}>Contact support if you need help.</Text>
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

export default PaymentCancel;
