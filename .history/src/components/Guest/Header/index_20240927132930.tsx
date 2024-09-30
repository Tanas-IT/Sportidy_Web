import React from "react";
import { Box, Flex, Heading, Button, Link, Image } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { themeColors } from "../../../constants/GlobalStyles";
import logo from "../../../assets/images/SPORTYDINoBg.png";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateAndScroll = (hash: string) => {
    if (window.location.pathname !== "/") {
      navigate("/");
    }

    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <Box
      as="header"
      w="100%"
      bg="gray.100"
      px={12}
      position="fixed"
      top="0"
      zIndex="9999"
      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <Flex justify="space-between" align="center" wrap="wrap">
        {/* Logo và tên */}
        <Flex align="center" cursor="pointer" onClick={() => navigate("/")}>
          <Box
            color="white"
            rounded="full"
            mr={4}
            w="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={logo} alt="Logo" w="100%" h="auto" />
          </Box>
          <Heading sx={{ marginBottom: "20px" }} size="lg" color={themeColors.primaryButton}>
            SPORTIDI
          </Heading>
        </Flex>

        {/* Liên kết và nút */}
        <Flex justify="flex-start" align="center">
          <Flex align="flex-end" fontSize="lg">
            <Link mx={5} fontWeight="bold" onClick={() => handleNavigateAndScroll("intro")}>
              Introduction
            </Link>
            <Link mx={5} fontWeight="bold" onClick={() => handleNavigateAndScroll("about")}>
              About
            </Link>
            <Link mx={5} fontWeight="bold" onClick={() => handleNavigateAndScroll("feedback")}>
              Feedback
            </Link>
            <Link mx={5} fontWeight="bold" onClick={() => handleNavigateAndScroll("download")}>
              Download
            </Link>
          </Flex>

          {/* Nút Đăng nhập */}
          <Button
            leftIcon={<FaUser />}
            bg={themeColors.primaryButton}
            colorScheme="white"
            variant="solid"
            ml={6}
            size="lg"
            _hover={{
              borderColor: "transparent",
              bg: `${themeColors.primaryButton}`,
              opacity: 0.9,
            }}
            onClick={() => navigate("/login")}
          >
            Sign in
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
