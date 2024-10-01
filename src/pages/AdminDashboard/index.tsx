import style from "./AdminDashboard.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  Heading,
  Icon,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  GridItem,
  Grid,
  Flex,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { FaUserCheck, FaLuggageCart } from "react-icons/fa";
import { MdOutlineStadium, MdOutlinePayment } from "react-icons/md";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { themeColors } from "../../constants/GlobalStyles";
import {
  formatCurrency,
  formatCurrencyVND,
  formatDate,
  formatDateAndTime,
} from "../../utils/functionHelper";
import { ChartOptions } from "chart.js/auto";
import {
  getDashboardAdmin,
  getPaymentInDashboardAdmin,
  getPlayFieldInDashboardAdmin,
  getUserInDashboardAdmin,
} from "../../services/DashbroadService";
import {
  AdminPaymentDasboardData,
  AdminPlayFieldDashboardData,
  AdminRevenueDashboardData,
  AdminUserDashboardData,
} from "../../payloads/responses/DashboarData.model";
import {
  getInitialAdminPaymentDashboardData,
  getInitialAdminPlayFieldDashboardData,
  getInitialAdminRevenueDashboardData,
  getInitialAdminUserDashboardData,
} from "../../utils/initialData";
import { PaymentStatus } from "../../constants/Enum";
import CardStats from "../../components/Dashboard/CardStats";
import LineChart from "../../components/Dashboard/LineChart";
import BarChart from "../../components/Dashboard/BarChart";
import PieChart from "../../components/Dashboard/PieChart";

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [revenueData, setRevenueData] = useState<AdminRevenueDashboardData>(
    getInitialAdminRevenueDashboardData(),
  );
  const [userData, setUserData] = useState<AdminUserDashboardData>(
    getInitialAdminUserDashboardData(),
  );

  const [playFieldData, setPlayFieldData] = useState<AdminPlayFieldDashboardData>(
    getInitialAdminPlayFieldDashboardData(),
  );

  const [paymentData, setPaymentData] = useState<AdminPaymentDasboardData>(
    getInitialAdminPaymentDashboardData(),
  );

  const labelPieChart = playFieldData.fieldPercentages.map((x) => x.fieldTypeName);
  const dataPieChart = playFieldData.fieldPercentages.map((x) => x.percentage);

  const location = useLocation();
  const navigate = useNavigate();
  const flag = useRef(false);

  useEffect(() => {
    if (location.state?.toastMessage && !flag.current) {
      toast.success(location.state.toastMessage, {
        autoClose: 2500,
      });
      flag.current = true;
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const stats = [
    {
      icon: FaUserCheck,
      label: "Total User",
      value: userData.totalUsers,
      bgColor: themeColors.userStatColor,
    },
    {
      icon: FaLuggageCart,
      label: "Total Revenue",
      value: formatCurrencyVND(revenueData.totalRevenue.toString()),
      bgColor: themeColors.revenueDarkenColor,
    },
    // {
    //   icon: MdOutlineStadium,
    //   label: "Total PlayField",
    //   value: playFieldData.totalPlayField,
    //   bgColor: themeColors.tradeMarkDarkenColor,
    // },
    {
      icon: MdOutlinePayment,
      label: "Total Booking",
      value: playFieldData.totalBooking,
      bgColor: themeColors.tradeMarkDarkenColor,
    },
  ];

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: revenueData.monthlyRevenues
          .sort((a, b) => a.month - b.month)
          .map((rev) => rev.revenue),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: themeColors.revenueLightenColor,
        fill: true,
      },
    ],
  };

  const lineChartOptions: ChartOptions<"line"> = {
    scales: {
      y: {
        ticks: {
          callback: function (value: number | string) {
            return value.toLocaleString("vi-VN");
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "User",
        data: userData.monthlyStatistics
          .sort((a, b) => a.month - b.month)
          .map((count) => count.userCount),
        backgroundColor: themeColors.tradeMarkLightenColor,
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  const pieChartData = {
    labels: labelPieChart,
    datasets: [
      {
        label: "Rate",
        data: dataPieChart,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 71, 1)",
          "rgba(60, 179, 113, 1)",
          "rgba(30, 144, 255, 1)",
          "rgba(238, 130, 238, 1)",
          "rgba(255, 215, 0, 1)",
          "rgba(255, 105, 180, 1)",
          "rgba(100, 149, 237, 1)",
          "rgba(255, 140, 0, 1)",
          "rgba(0, 255, 255, 1)",
          "rgba(255, 20, 147, 1)",
          "rgba(148, 0, 211, 1)",
          "rgba(0, 250, 154, 1)",
          "rgba(255, 0, 255, 1)",
          "rgba(255, 228, 196, 1)",
          "rgba(240, 248, 255, 1)",
          "rgba(135, 206, 250, 1)",
          "rgba(255, 182, 193, 1)",
          "rgba(64, 224, 208, 1)",
          "rgba(255, 69, 0, 1)",
          "rgba(173, 255, 47, 1)",
          "rgba(0, 191, 255, 1)",
          "rgba(255, 0, 0, 1)",
          "rgba(255, 140, 86, 1)",
          "rgba(147, 112, 219, 1)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const loadData = async () => {
        const yearOfNow = new Date().getFullYear();
        const dataRevenue = await getDashboardAdmin(yearOfNow);
        const userDashboard = await getUserInDashboardAdmin(yearOfNow);
        const playFieldDashboard = await getPlayFieldInDashboardAdmin(yearOfNow);
        const paymentDashboard = await getPaymentInDashboardAdmin();

        if (userDashboard.statusCode == 200) {
          setUserData(userDashboard.data);
          setRevenueData(dataRevenue);
          setPlayFieldData(playFieldDashboard);

          setPaymentData(paymentDashboard.data);
          setIsLoading(false);
        }
      };

      setTimeout(loadData, 500);
    } catch (err) {
      toast.error("Lỗi khi lấy dữ liệu");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!flag.current) {
      fetchData();
      flag.current = true;
    } else {
      fetchData();
    }
  }, [fetchData]);
  console.log("Is Loading", isLoading);
  if (isLoading) {
    return (
      <Flex
        position="fixed"
        top="0"
        left="0"
        height="100vh"
        width="100%"
        justifyContent="center"
        alignItems="center"
        bg="rgba(0, 0, 0, 0.2)"
        zIndex="9999"
      >
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />
      </Flex>
    );
  }

  return (
    <Box className={style.container_dashboard}>
      <CardStats stats={stats} />

      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4} mt={8}>
        <LineChart
          title={"Statistic Revenue By Month Of " + revenueData.year}
          data={lineChartData}
          options={lineChartOptions}
        />
        <BarChart title="Statistic User By Month" data={barChartData} />
      </SimpleGrid>

      <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4} mt={8}>
        <GridItem colSpan={1}>
          <PieChart title="Rate Of PlayField Type In Total Booking" data={pieChartData} />
        </GridItem>

        <GridItem colSpan={2}>
          <Card>
            <CardBody>
              <Heading className={style.title}>Transaction History</Heading>
              <Box maxHeight="300px" overflowY="auto">
                <Table className={style.tablePaymentHistory}>
                  <Thead>
                    <Tr>
                      <Th className={style.subtitle}>User</Th>
                      <Th className={style.subtitle}>Transaction Date</Th>
                      <Th className={style.subtitle}>Amount</Th>
                      <Th className={style.subtitle}>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {paymentData != null
                      ? paymentData.map((transaction, index) => (
                          <Tr key={index}>
                            <Td className={style.textDescription}>
                              <Badge
                                colorScheme="white"
                                maxW="250px"
                                whiteSpace="normal"
                                textOverflow="clip"
                                fontSize="14px"
                              >
                                <span
                                  style={{
                                    textTransform: "initial",
                                    fontSize: "16px",
                                  }}
                                >
                                  {transaction.email}
                                </span>
                              </Badge>
                            </Td>
                            <Td className={style.textDescription}>
                              {formatDateAndTime(transaction.dateOfTransaction)}
                            </Td>
                            <Td className={style.textDescription}>
                              {formatCurrency(transaction.totalAmount.toString())}
                            </Td>
                            <Td className={style.textDescription}>
                              {transaction.status === PaymentStatus.Succeed ? (
                                <Badge colorScheme="green">Succeed</Badge>
                              ) : transaction.status === PaymentStatus.Failed ? (
                                <Badge colorScheme="red">Failed</Badge>
                              ) : transaction.status === PaymentStatus.Pending ? (
                                <Badge colorScheme="yellow">Pending</Badge>
                              ) : transaction.status === PaymentStatus.Cancelled ? (
                                <Badge colorScheme="red">Cancelled</Badge>
                              ) : (
                                <Badge colorScheme="red">Have an error</Badge>
                              )}
                            </Td>
                          </Tr>
                        ))
                      : ""}
                  </Tbody>
                </Table>
              </Box>
            </CardBody>
          </Card>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}

export default AdminDashboard;
