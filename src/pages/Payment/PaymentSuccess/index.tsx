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
import { toast } from "react-toastify";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { updatePaymentStatus } from "../../../services/PaymentService";
import { PaymentStatus } from "../../../constants/Enum";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
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

      if (statusParam != null && statusParam.toUpperCase() != "PAID") {
        navigate(
          `/payment/payment-failure?playFieldIdParam=${playFieldIdParam}&userId=${userIdParam}&orderCode=${bookingCode}&price=${priceParam}`,
        );
      }

      if (userIdParam && bookingCode) {
        try {
          const result = await updatePaymentStatus(bookingCode, 1);
          if (result.data) {
            toast.success("Payment Success");
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        console.error("The Information when booking invalid");
      }
    };

    fetchChangePaymentStatus();
  }, []);

  const handleClickBackHome = () => {
    navigate("/");
  };

  const handleIntoduction = () => {
    navigate("/Buying-Guide");
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
        {/* Icon thành công */}
        <Icon as={AiOutlineCheckCircle} color="green.500" boxSize={24} mb={4} />

        {/* Tiêu đề */}
        <Heading as="h1" size={headingSize} mb={4}>
          Ticket Payment Successful
        </Heading>

        {/* Thông báo */}
        <Text fontSize={textSize} mb={6} px={4}>
          Thank you for your booking.
        </Text>

        {/* Các bước tiếp theo */}
        <VStack spacing={3} alignItems="center" mb={6} px={4}>
          <Text fontSize={textSize} fontWeight="bold">
            Next steps
          </Text>
          <HStack>
            <Icon as={AiOutlineCheckCircle} color="green.500" />
            <Text fontSize={textSize}>Check your QR Code in your device</Text>
          </HStack>
          <HStack>
            <Icon as={AiOutlineCheckCircle} color="green.500" />
            <Text fontSize={textSize}>Use QR Code to check in when come to playfield</Text>
          </HStack>
          <HStack>
            <Icon as={AiOutlineCheckCircle} color="green.500" />
            <Text fontSize={textSize}>Enjoy the match</Text>
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
          Return to home page
        </Button>

        {/* Nút chuyển đến trang hướng dẫn sử dụng */}
        <Button
          onClick={handleIntoduction}
          variant="outline"
          size="lg"
          colorScheme="teal"
          width="full"
          maxW="300px"
        >
          View the payment introduction
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentSuccess;
