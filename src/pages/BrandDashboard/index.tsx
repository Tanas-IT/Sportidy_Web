import { Box, Card, CardBody, Flex, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import style from "./BrandDashboard.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import CardStats, { StatCardFeedback } from "../../components/Dashboard/CardStats";
import { themeColors } from "../../constants/GlobalStyles";
import { VscFeedback } from "react-icons/vsc";
import { MdImage } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import {
  AdminFeedbackDashboardData,
  FeedbackDashBoard,
} from "../../payloads/responses/DashboarData.model";
import { getInitialFeedbackDashboardData, getInitialFeedbackData } from "../../utils/initialData";
import { getFeedbackDashboard } from "../../services/DashbroadService";
import { getAllFeedback } from "../../services/CategoryService";
import { getOptions } from "../../utils/functionHelper";
import NavigationDot from "../../components/NavigationDot/NavigationDot";
import { textAlign } from "html2canvas-pro/dist/types/css/property-descriptors/text-align";

function FeedbackDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const flag = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<FeedbackDashBoard>(getInitialFeedbackDashboardData());
  const [feedbackData, setFeedbackData] = useState<AdminFeedbackDashboardData>(
    getInitialFeedbackData(),
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5]);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  useEffect(() => {
    if (location.state?.toastMessage && !flag.current) {
      toast.success(location.state.toastMessage, {
        autoClose: 2500,
      });
      flag.current = true;
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const loadData = async () => {
        const { statusCode, data } = await getFeedbackDashboard();
        const result = await getAllFeedback(currentPage, rowsPerPage, "");
        setFeedbackData(result.list);
        setTotalPages(result.totalPage);
        setTotalRecords(result.totalRecord);
        setRowsPerPageOption(getOptions(result.totalRecord));
        if (statusCode === 200) {
          setData(data);
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

  const stats = [
    {
      icon: VscFeedback,
      label: "Feedbacks",
      value: data.totalFeedback,
      bgColor: themeColors.userStatColor,
    },
    {
      icon: MdImage,
      label: "Images",
      value: data.totalImage,
      bgColor: themeColors.revenueDarkenColor,
    },
    {
      icon: MdOutlineStarPurple500,
      label: "Ratings",
      value: data.totalRating,
      bgColor: "#f3e011",
    },
  ];

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage],
  );

  const handleRowsPerPageChange = useCallback(
    (newRowsPerPage: number) => {
      setCurrentPage(1);
      setRowsPerPage(newRowsPerPage);
    },
    [setCurrentPage, setRowsPerPage],
  );

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
      <SimpleGrid columns={{ sm: 1, md: 1 }} spacing={4} mt={8}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
          {feedbackData.map((item, index) => (
            <StatCardFeedback
              key={index}
              avatar={item.avatar}
              content={item.content}
              fullName={item.userFullName}
              rating={item.rating}
              feedbackDate={item.feedbackDate}
              imageURL={item.imageUrl}
            />
          ))}
        </SimpleGrid>

        <NavigationDot
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          rowsPerPageOptions={rowsPerPageOption}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </SimpleGrid>
    </Box>
  );
}

export default FeedbackDashboard;
