import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  HStack,
  Grid,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import style from "./LandingPage.module.scss";
import { themeColors } from "../../constants/GlobalStyles";

import { FaCheckCircle } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

import themeSample from "../../assets/images/Theme_bg.png";
import landingImage1 from "../../assets/images/SPORTYDINoBg.png";
import iconRestaurant from "../../assets/images/IconRestaurant.png";
import iconCafe from "../../assets/images/IconCafe.png";
import iconStore from "../../assets/images/IconStore.png";
import featuresImage from "../../assets/images/features.png";
import basicPackage from "../../assets/images/basicPackage.png";
import standardPackage from "../../assets/images/standardPackage.png";
import premiumPackage from "../../assets/images/premiumPackage.png";
import camera from "../../assets/images/camera.png";
import menuRecommend from "../../assets/images/menuRecommend.png";
import menuManage from "../../assets/images/menuManage.png";
import database from "../../assets/images/database.png";
import twoLaptop from "../../assets/images/2laptop.png";
import { PlanData } from "../../payloads/responses/PlanResponse.model";
import { getPlans } from "../../services/PlanService";
import { toast } from "react-toastify";
import { formatCurrencyVND } from "../../utils/functionHelper";
import { PricingPackageType } from "../../models/PricingPackageType";
import PricingPackageCard from "../../components/Payment/PricingPackageCard";
import IOS from "../../assets/images/ios.png";
import Android from "../../assets/images/android.png";

type BusinessType = {
  icon: string;
  title: string;
  description: string;
};

type Feature = {
  icon: string;
  text: string;
};

type Benefit = {
  icon: React.ElementType;
  text: string;
};

const businessTypes: BusinessType[] = [
  {
    icon: iconRestaurant,
    title: "Quán ăn",
    description: "Dễ dàng cập nhật thực đơn và tạo trải nghiệm tốt cho khách hàng.",
  },
  {
    icon: iconCafe,
    title: "Chuỗi cà phê",
    description: "Tối ưu hóa quy trình phục vụ và tăng cường hiệu quả vận hành.",
  },
  {
    icon: iconStore,
    title: "Dịch vụ buôn bán",
    description: "Giúp doanh nghiệp theo dõi thực đơn và nhu cầu khách hàng.",
  },
];

const features: Feature[] = [
  { icon: camera, text: "Nhận diện khuôn mặt" },
  { icon: menuRecommend, text: "Gợi ý thực đơn" },
  { icon: menuManage, text: "Quản lý thực đơn" },
  { icon: database, text: "Lưu trữ và phân tích dữ liệu khách hàng" },
];

const benefits: Benefit[] = [
  { icon: CiTimer, text: "Tiết kiệm thời gian" },
  { icon: MdKeyboardDoubleArrowUp, text: "Tăng doanh thu" },
  { icon: MdKeyboardDoubleArrowUp, text: "Cải thiện chất lượng dịch vụ" },
  { icon: FaCheckCircle, text: "Quản lý dễ dàng" },
  { icon: MdKeyboardDoubleArrowUp, text: "Nâng cao trải nghiệm người dùng" },
  { icon: FaCheckCircle, text: "Tích hợp dữ liệu thông minh" },
];

function LandingPage() {
  const navigate = useNavigate();
  const [pricingPackages, setPricingPackages] = useState<PricingPackageType[]>([]);

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

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const result = await getPlans();
        if (result.isSuccess) {
          const packages: PricingPackageType[] = result.data.map(
            (plan: PlanData, index: number) => ({
              id: plan.planId,
              image: [basicPackage, standardPackage, premiumPackage][index],
              title: plan.planName,
              price: `${formatCurrencyVND(plan.price.toString())}/tháng`,
              features: [
                `${plan.maxMenu} lượt tạo thực đơn`,
                `${plan.maxAccount} lượt tạo chi nhánh`,
              ],
            }),
          );
          setPricingPackages(packages);
        } else {
          toast.error("Không có dữ liệu kế hoạch");
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu gói dịch vụ", err);
      }
    };

    fetchPlans();
  }, []);

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
        <Box py={8} px={24} textAlign="center" bg="#fff" w="100%">
          <Flex align="center" justify="flex-start">
            <Box minW="25%" textAlign="start">
              <img src={landingImage1} alt="Dịch vụ Smart Menu" className={style.imgBgWhite} />
            </Box>
            <Box textAlign="left" marginLeft="6rem" marginBottom="5rem">
              <Heading className={style.title}>What is SPORTIDY</Heading>
              <Text fontSize="xl" color="gray.600" lineHeight="tall">
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
            <Heading className={style.title}>Tối ưu quản lý thực đơn với Smart Menu</Heading>
            <Text fontSize="20px" color="gray.600">
              Smart Menu phù hợp với
            </Text>
          </Box>

          {/* Danh sách các doanh nghiệp phù hợp */}
          <Flex justify="space-evenly" wrap="wrap" gap={6}>
            <Box
              key="1"
              p={6}
              rounded="md"
              maxW="280px"
              bg="white"
              boxShadow="xl"
              textAlign="center"
              _hover={{
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
                willChange: "transform",
              }}
              transition="transform 0.3s ease-in-out"
            >
              <Box mb={4}>
                <img src="{business.icon}" alt="{business.title}" width={48} />
              </Box>
              <Heading fontSize="20px" mb={2} color={themeColors.textColor}></Heading>
              <Text fontSize="18px" color="gray.600" lineHeight="tall">
                {/* //{business.description}" */}
              </Text>
            </Box>
            <Box
              key="1"
              p={6}
              rounded="md"
              maxW="280px"
              bg="white"
              boxShadow="xl"
              textAlign="center"
              _hover={{
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
                willChange: "transform",
              }}
              transition="transform 0.3s ease-in-out"
            >
              <Box mb={4}>
                <img src="{business.icon}" alt="{business.title}" width={48} />
              </Box>
              <Heading fontSize="20px" mb={2} color={themeColors.textColor}></Heading>
              <Text fontSize="18px" color="gray.600" lineHeight="tall">
                {/* //{business.description}" */}
              </Text>
            </Box>
            <Box
              key="1"
              p={6}
              rounded="md"
              maxW="280px"
              bg="white"
              boxShadow="xl"
              textAlign="center"
              _hover={{
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
                willChange: "transform",
              }}
              transition="transform 0.3s ease-in-out"
            >
              <Box mb={4}>
                <img src="{business.icon}" alt="{business.title}" width={48} />
              </Box>
              <Heading fontSize="20px" mb={2} color={themeColors.textColor}></Heading>
              <Text fontSize="18px" color="gray.600" lineHeight="tall">
                {/* //{business.description}" */}
              </Text>
            </Box>
            <Box
              key="1"
              p={6}
              rounded="md"
              maxW="280px"
              bg="white"
              boxShadow="xl"
              textAlign="center"
              _hover={{
                transform: "scale(1.2)",
                transition: "transform 0.3s ease-in-out",
                willChange: "transform",
              }}
              transition="transform 0.3s ease-in-out"
            >
              <Box mb={4}>
                <img src="{business.icon}" alt="{business.title}" width={48} />
              </Box>
              <Heading fontSize="20px" mb={2} color={themeColors.textColor}></Heading>
              <Text fontSize="18px" color="gray.600" lineHeight="tall">
                {/* //{business.description}" */}
              </Text>
            </Box>
          </Flex>
        </Box>

        {/* Tính năng */}
        <Box id="features" pb={8} px={24} textAlign="center" bg="#fff" w="100%">
          <Flex align="center" justify="flex-start">
            <Box minW="25%" textAlign="start">
              <img src={featuresImage} alt="Features" className={style.imgBgWhite} />
            </Box>
            <Box textAlign="left" marginLeft="6rem">
              <Heading className={style.title} mb="50px">
                Tính năng nổi bật
              </Heading>
              <Grid templateColumns="1fr 1fr" gap={6}>
                {features.map((feature, i) => (
                  <HStack spacing={4} mb={6} key={i}>
                    <img src={feature.icon} alt={feature.text} width="40" height="40" />
                    <Text fontSize="xl" color="gray.600" lineHeight="tall">
                      {feature.text}
                    </Text>
                  </HStack>
                ))}
              </Grid>
            </Box>
          </Flex>
        </Box>

        {/* Lợi ích */}
        <Box id="benefits" py={16} px={8} bg="#F5F7FA" textAlign="center" w="100%">
          <Heading className={style.title} mb="50px">
            Lợi ích nổi bật của Smart Menu
          </Heading>
          <Flex justify="center" align="center" wrap="wrap" gap={4}>
            {/* Cột bên trái */}
            <Box>
              <VStack align="flex-start" spacing={6}>
                {benefits.slice(0, 3).map((benefit, index) => (
                  <HStack key={index}>
                    <Icon as={benefit.icon} w={6} h={6} color="teal.500" />
                    <Text fontSize="2xl" color="gray.600">
                      {benefit.text}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            {/* Hình ảnh ở giữa */}
            <Box maxW="50%">
              <img src={twoLaptop} alt="Lợi ích" className={style.img} />
            </Box>

            {/* Cột bên phải */}
            <Box>
              <VStack align="flex-start" spacing={6}>
                {benefits.slice(3, 6).map((benefit, index) => (
                  <HStack key={index}>
                    <Icon as={benefit.icon} w={6} h={6} color="teal.500" />
                    <Text fontSize="2xl" color="gray.600">
                      {benefit.text}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </Flex>
        </Box>

        {/* Bảng giá */}
        <Box id="pricing" py={8} px={8} bg="#fff" textAlign="center" w="100%">
          <Flex direction="column" align="center" justify="center" textAlign="center" mb={8}>
            <Heading className={style.title} p={2}>
              Chọn gói dịch vụ phù hợp cho doanh nghiệp của bạn
            </Heading>
            <Text fontSize="20px" color="gray.600" maxW="700px" textAlign="center">
              Với Smart Menu, doanh nghiệp có thể tối ưu hoá trải nghiệm khách hàng, nâng cao hiệu
              suất hoạt động, và tăng doanh thu bằng cách cung cấp thực đơn cá nhân hóa dựa trên
              nhân khẩu học của mỗi khách hàng.
            </Text>
          </Flex>
          <Flex justify="space-evenly" wrap="wrap" gap={6} pb={48}>
            {pricingPackages.map((pricing, index) => (
              <PricingPackageCard key={pricing.id} pricing={pricing} />
            ))}
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default LandingPage;
