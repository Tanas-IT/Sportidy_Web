import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import style from "./LandingPage.module.scss";
import { themeColors } from "../../constants/GlobalStyles";

import themeSample from "../../assets/images/Theme_bg.png";
import landingImage1 from "../../assets/images/SPORTYDINoBg.png";
import Customer1 from "../../assets/images/customer1.png";
import Customer2 from "../../assets/images/customer2.png";
import Customer3 from "../../assets/images/customer3.png";
import Customer4 from "../../assets/images/customer4.png";

import IOS from "../../assets/images/ios.png";
import Android from "../../assets/images/android.png";

function LandingPage() {
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
    <>
      <Flex direction="column" align="center" justify="center" w="100%" h="auto">
        <Box id="about" py={24} px={24} bg="#F5F7FA" w="100%">
          <Flex align="center" justify="space-around">
            <Box textAlign="start">
              <Heading size="2xl" mb={4} color={themeColors.textColor}>
                Discover Your Sports Tribe with SPORTYDI
              </Heading>
              <Text fontSize="xl" fontWeight="bold" color={themeColors.textColor}>
                - Connect with like-minded sports enthusiasts near you
              </Text>
              <Text fontSize="xl" fontWeight="bold" color={themeColors.textColor}>
                - Fastly & Benefits
              </Text>
              <Text fontSize="xl" fontWeight="bold" color={themeColors.textColor}>
                - Improving public health
              </Text>
              <Flex>
                <Button
                  mt={6}
                  bg={themeColors.primaryButton}
                  colorScheme="white"
                  size="lg"
                  _hover={{
                    borderColor: "transparent",
                    bg: `${themeColors.primaryButton}`,
                    opacity: 0.9,
                  }}
                  onClick={() => handleNavigateAndScroll("pricing")}
                >
                  <img style={{ margin: "0 10px" }} src={IOS} alt="IOS" />
                  Download For IOS
                </Button>
                <Button
                  mt={6}
                  ml={10}
                  bg={themeColors.primaryButton}
                  colorScheme="white"
                  size="lg"
                  _hover={{
                    borderColor: "transparent",
                    bg: `${themeColors.primaryButton}`,
                    opacity: 0.9,
                  }}
                  onClick={() => handleNavigateAndScroll("pricing")}
                >
                  <img style={{ margin: "0 10px" }} src={Android} alt="Android" />
                  Download For Android
                </Button>
              </Flex>
            </Box>

            <Box
              width="40%"
              bg="#F5F7FA"
              _hover={{
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
                willChange: "transform",
              }}
              transition="transform 0.3s ease-in-out"
            >
              <img src={themeSample} alt="Dịch vụ Smart Menu" className={style.img} />
            </Box>
          </Flex>
        </Box>

        {/* Giới thiệu */}
        <Box py={2} px={24} textAlign="center" bg="#fff" w="100%">
          <Flex align="center" justify="flex-start">
            <Box minW="25%" textAlign="start">
              <img src={landingImage1} alt="Dịch vụ Smart Menu" className={style.imgBgWhite} />
            </Box>
            <Box textAlign="left" marginLeft="6rem" marginBottom="5rem">
              <Heading className={style.title}>What is SPORTIDY</Heading>
              <Text fontSize="xl" color="gray.600" lineHeight="tall" width="80%">
                - SPORTIDI is the ultimate platform for sports fans to connect, collaborate, and
                celebrate their passion for athletics. Whether you're looking to find a pickup game,
                organize a watch party, or just chat with fellow enthusiasts. SPORTIDI makes it easy
                to build your sports tribe.
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box py={16} px={8} textAlign="center" w="100%" bg="#F5F7FA">
          {/* Tiêu đề chính */}
          <Box mb={8}>
            <Heading className={style.title}>Why Choose SPORTYDI?</Heading>
          </Box>
          <Flex justify="space-evenly" wrap="wrap" gap={6} marginBottom={5}>
            <Box
              key="1"
              p={6}
              rounded="md"
              maxW="500px"
              bg="white"
              boxShadow="xl"
              textAlign="left"
              _hover={{
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
                willChange: "transform",
              }}
              transition="transform 0.3s ease-in-out"
            >
              <Box mb={4}>
                <Text fontSize="30px" color="#F7660F" fontWeight="bold">
                  Find Your Sports Tribe
                </Text>
              </Box>
              <Heading fontSize="20px" mb={2} color={themeColors.textColor}></Heading>
              <Text fontSize="18px" color="gray.600" lineHeight="tall">
                Browse profiles of sports fans with similar interests and passions. Connect over
                your favorite teams, leagues, and activities.
              </Text>
            </Box>
            <Box
              key="1"
              p={6}
              rounded="md"
              maxW="500px"
              bg="white"
              boxShadow="xl"
              textAlign="left"
              _hover={{
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
                willChange: "transform",
              }}
              transition="transform 0.3s ease-in-out"
            >
              <Box mb={4}>
                <Text fontSize="30px" color="#FA5A5C" fontWeight="bold">
                  Organize Local Sports Events
                </Text>
              </Box>
              <Heading fontSize="20px" mb={2} color={themeColors.textColor}></Heading>
              <Text fontSize="18px" color="gray.600" lineHeight="tall">
                Easily create and promote pickup games, watch parties, tournaments, and other
                sports-related meetups in your community.
              </Text>
            </Box>
          </Flex>
          <Flex justify="space-evenly" wrap="wrap" gap={6}>
            <Box
              key="1"
              p={6}
              rounded="md"
              maxW="500px"
              bg="white"
              boxShadow="xl"
              textAlign="left"
              _hover={{
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
                willChange: "transform",
              }}
              transition="transform 0.3s ease-in-out"
            >
              <Box mb={4}>
                <Text fontSize="30px" color="#FA5A5C" fontWeight="bold">
                  Collaborate
                </Text>
              </Box>
              <Heading fontSize="20px" mb={2} color={themeColors.textColor}></Heading>
              <Text fontSize="18px" color="gray.600" lineHeight="tall">
                Engage in discussions, share tips and strategies, and coordinate with your new
                sports friends through the Sprotydi chat and collaboration features.
              </Text>
            </Box>
            <Box
              key="1"
              p={6}
              rounded="md"
              maxW="500px"
              bg="white"
              boxShadow="xl"
              textAlign="left"
              _hover={{
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
                willChange: "transform",
              }}
              transition="transform 0.3s ease-in-out"
            >
              <Box mb={4}>
                <Text fontSize="30px" color="#FA5A5C" fontWeight="bold">
                  Earn Rewards
                </Text>
              </Box>
              <Heading fontSize="20px" mb={2} color={themeColors.textColor}></Heading>
              <Text fontSize="18px" color="gray.600" lineHeight="tall">
                Participate in challenges, share content, and invite friends to earn points and
                unlock exclusive Sprotydi rewards and perks.
              </Text>
            </Box>
          </Flex>
        </Box>

        {/* Lợi ích */}
        <Box id="benefits" py={16} px={8} bg="#F5F7FA" textAlign="center" w="100%">
          <Heading className={style.title} mb="50px">
            What our customers say
          </Heading>
          <Flex justify="space-evenly" wrap="wrap" gap={6}>
            <Box
              key="1"
              p={6}
              rounded="md"
              maxW="500px"
              bg="white"
              boxShadow="xl"
              textAlign="left"
              _hover={{
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
                willChange: "transform",
              }}
              transition="transform 0.3s ease-in-out"
            >
              <Box style={{ display: "flex" }} mb={4}>
                <img
                  style={{
                    width: "48px",
                    marginRight: "10px",
                    height: "48px",
                    borderRadius: "50%",
                  }}
                  src={Customer1}
                  alt="customer1"
                />
                <Text fontSize="30px" color="#F58400" fontWeight="bold">
                  Jamine H.
                </Text>
              </Box>
              <Heading fontSize="20px" mb={2} color={themeColors.textColor}></Heading>
              <Text fontSize="18px" color="gray.600" lineHeight="tall">
                Engage in discussions, share tips and strategies, and coordinate with your new
                sports friends through the Sprotydi chat and collaboration features.
              </Text>
            </Box>
            <Box
              key="1"
              p={6}
              rounded="md"
              maxW="500px"
              bg="white"
              boxShadow="xl"
              textAlign="left"
              _hover={{
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
                willChange: "transform",
              }}
              transition="transform 0.3s ease-in-out"
            >
              <Box mb={4}>
                <Text fontSize="30px" color="#FA5A5C" fontWeight="bold">
                  Earn Rewards
                </Text>
              </Box>
              <Heading fontSize="20px" mb={2} color={themeColors.textColor}></Heading>
              <Text fontSize="18px" color="gray.600" lineHeight="tall">
                Participate in challenges, share content, and invite friends to earn points and
                unlock exclusive Sprotydi rewards and perks.
              </Text>
            </Box>
          </Flex>
        </Box>

        {/* Tính năng */}
        <Box id="features" pb={8} px={24} textAlign="center" bg="#fff" w="100%">
          <Flex align="center" justify="flex-start">
            <Box textAlign="left" marginLeft="6rem">
              <Heading
                style={{ textTransform: "uppercase", color: "#000", width: "550px" }}
                className={style.title}
              >
                Download <span style={{ color: "#F7660F" }}>SPORTYDI</span> Now and Start Connecting
                with Sports <br /> Fans Near You!
              </Heading>
              <Text fontSize={20}>
                We are dedicated to pushing the boundaries of what <br /> can be achieved.
              </Text>
              <Flex>
                <Button
                  mt={6}
                  bg={themeColors.primaryButton}
                  colorScheme="white"
                  size="lg"
                  _hover={{
                    borderColor: "transparent",
                    bg: `${themeColors.primaryButton}`,
                    opacity: 0.9,
                  }}
                  onClick={() => handleNavigateAndScroll("pricing")}
                >
                  <img style={{ margin: "0 10px" }} src={IOS} alt="IOS" />
                  Download For IOS
                </Button>
                <Button
                  mt={6}
                  ml={10}
                  bg={themeColors.primaryButton}
                  colorScheme="white"
                  size="lg"
                  _hover={{
                    borderColor: "transparent",
                    bg: `${themeColors.primaryButton}`,
                    opacity: 0.9,
                  }}
                  onClick={() => handleNavigateAndScroll("pricing")}
                >
                  <img style={{ margin: "0 10px" }} src={Android} alt="Android" />
                  Download For Android
                </Button>
              </Flex>
            </Box>
            <Box minW="25%" textAlign="start">
              <img src={themeSample} alt="Features" className={style.imgBgWhite} />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default LandingPage;
