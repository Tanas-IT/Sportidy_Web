import {
  Badge,
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Searchbar from "../../../components/Searchbar";
import Loading from "../../../components/Loading";
import NavigationDot from "../../../components/NavigationDot/NavigationDot";
import style from "./PaymentHistory.module.scss";
import { formatCurrencyVND, formatDateAndTime, getOptions } from "../../../utils/functionHelper";
import { PaymentData } from "../../../payloads/responses/PaymentData.model";
import { toast } from "react-toastify";
import { getPayments } from "../../../services/PaymentService";
import { PaymentStatus } from "../../../constants/Enum";
import * as XLSX from "xlsx";

const PagmentHistory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [sortedData, setSortedData] = useState<PaymentData[]>([]);
  const [sortBy, setSortBy] = useState<keyof PaymentData>("bookingDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [data, setData] = useState<PaymentData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5]);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const fetchData = useCallback(
    async (searchValue?: string) => {
      try {
        setIsLoading(true);
        let result;

        const loadData = async () => {
          if (searchValue) {
            result = await getPayments(currentPage, rowsPerPage, searchValue);
          } else {
            result = await getPayments(currentPage, rowsPerPage, "");
            console.log(result);
          }
          setData(result.list);
          setTotalPages(result.totalPage);
          setTotalRecords(result.totalRecord);
          setRowsPerPageOption(getOptions(result.totalRecord));
          setIsLoading(false);
          if (isInitialLoad) {
            setIsInitialLoad(false);
          }
        };

        if (isInitialLoad) {
          setTimeout(async () => {
            await loadData();
          }, 500);
        } else {
          await loadData();
        }
      } catch (err) {
        toast.error("Lỗi khi lấy dữ liệu");
        setIsLoading(false);
      }
    },
    [currentPage, rowsPerPage, isInitialLoad],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, currentPage, isInitialLoad]);

  // Sắp xếp dữ liệu phía client
  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      let valA, valB;

      // Xác định giá trị cần so sánh theo loại dữ liệu
      if (sortBy === "price") {
        // Giá trị dạng số (price)
        valA = a[sortBy] as unknown as number;
        valB = b[sortBy] as unknown as number;
      } else if (sortBy === "bookingDate") {
        // Giá trị dạng ngày (bookingDate)
        valA = new Date(a[sortBy] as unknown as string).getTime();
        valB = new Date(b[sortBy] as unknown as string).getTime();
      } else if (sortBy === "bookingId") {
        // Giá trị dạng chuỗi (bookingId)
        valA = a[sortBy] as unknown as string;
        valB = b[sortBy] as unknown as string;
      } else if (sortBy === "playFieldName") {
        // Giá trị dạng chuỗi từ playField (playFieldName)
        valA = a.playField.playFieldName.toLowerCase();
        valB = b.playField.playFieldName.toLowerCase();
      } else if (sortBy === "status") {
        const statusTextMapping: { [key in 1 | 2 | 3 | 4]: string } = {
          1: "Success",
          2: "Failed",
          3: "Pending",
          4: "Cancelled",
        };

        // Kiểm tra và ép kiểu giá trị
        valA = statusTextMapping[a[sortBy] as 1 | 2 | 3 | 4] || "Unknown";
        valB = statusTextMapping[b[sortBy] as 1 | 2 | 3 | 4] || "Unknown";
      } else if (sortBy === "playFieldOwnerName") {
        // Giá trị dạng chuỗi (playFieldOwnerName)
        valA = a.playFieldOwnerName.toLowerCase();
        valB = b.playFieldOwnerName.toLowerCase();
      } else {
        // Giá trị mặc định (các trường khác) là chuỗi
        valA = (a[sortBy] as string).toLowerCase();
        valB = (b[sortBy] as string).toLowerCase();
      }

      if (sortDirection === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
    setSortedData(sorted);
  }, [data, sortBy, sortDirection]);

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

  async function handleSearch(value: string) {
    fetchData(value);
  }

  async function handleExportToExcel() {
    const downloadData = await getPayments(undefined, undefined, undefined);
    // Xử lý dữ liệu: Loại bỏ các thuộc tính không mong muốn và map playFieldName, status
    const filteredData = downloadData.list.map((item: PaymentData) => {
      const { playField, playFieldFeedbacks, payments, customerId, playFieldId, status, ...rest } =
        item;

      // Chuyển đổi giá trị status thành chuỗi
      let statusText = "";
      switch (status) {
        case 1:
          statusText = "Success";
          break;
        case 2:
          statusText = "Failed";
          break;
        case 3:
          statusText = "Pending";
          break;
        case 4:
          statusText = "Cancelled";
          break;
        default:
          statusText = "Have an error"; // Hoặc một giá trị mặc định khác nếu cần
      }

      // Thêm playFieldName từ playField vào rest và status đã chuyển đổi
      return {
        ...rest,
        playFieldName: playField?.playFieldName,
        status: statusText, // Chuyển đổi status sang chuỗi
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Statistic");
    XLSX.writeFile(workbook, "Transaction_History.xlsx");
  }

  const handleSort = (column: keyof PaymentData) => {
    const newDirection = sortBy === column && sortDirection === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortDirection(newDirection);
  };

  return (
    <Flex className={style.container}>
      <Flex className={style.searchWrapper}>
        <Searchbar onSearch={handleSearch} />
        <Button
          onClick={handleExportToExcel}
          style={{ marginRight: "18px", backgroundColor: "#466d6b", color: "white" }}
        >
          Export To Excel
        </Button>
      </Flex>
      <Flex className={style.PaymentHistory}>
        <TableContainer className={style.PaymentHistoryTbl}>
          <Table>
            <TableCaption>Table Manage Transaction History</TableCaption>
            <Thead>
              <Tr>
                <Th className={style.HeaderTbl} onClick={() => handleSort("bookingId")}>
                  Booking Code {sortBy === "bookingId" && (sortDirection === "asc" ? "↑" : "↓")}
                </Th>
                <Th className={style.HeaderTbl} onClick={() => handleSort("bookingDate")}>
                  Booking Date {sortBy === "bookingDate" && (sortDirection === "asc" ? "↑" : "↓")}
                </Th>
                <Th className={style.HeaderTbl} onClick={() => handleSort("playFieldName")}>
                  PlayField Name{" "}
                  {sortBy === "playFieldName" && (sortDirection === "asc" ? "↑" : "↓")}
                </Th>
                <Th className={style.HeaderTbl} onClick={() => handleSort("status")}>
                  Status {sortBy === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                </Th>
                <Th className={style.HeaderTbl} onClick={() => handleSort("price")}>
                  Price {sortBy === "price" && (sortDirection === "asc" ? "↑" : "↓")}
                </Th>
                <Th className={style.HeaderTbl} onClick={() => handleSort("playFieldOwnerName")}>
                  PlayField Owner's Name{" "}
                  {sortBy === "playFieldOwnerName" && (sortDirection === "asc" ? "↑" : "↓")}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {isInitialLoad && isLoading ? (
                <Tr>
                  <Td colSpan={10} className={style.LoadingCell}>
                    <Loading />
                  </Td>
                </Tr>
              ) : sortedData.length === 0 ? (
                <Tr>
                  <Td colSpan={10}>No Transaction History For Display</Td>
                </Tr>
              ) : (
                sortedData.map((payment, index) => (
                  <Tr key={payment.bookingId} className={style.PaymentHistoryItem}>
                    <Td>{payment.bookingId}</Td>
                    <Td>{formatDateAndTime(payment.bookingDate)}</Td>
                    <Td>{payment.playField.playFieldName}</Td>
                    <Td>
                      {payment.status === PaymentStatus.Succeed ? (
                        <Badge colorScheme="green">Success</Badge>
                      ) : payment.status === PaymentStatus.Failed ? (
                        <Badge colorScheme="red">Failed</Badge>
                      ) : payment.status === PaymentStatus.Pending ? (
                        <Badge colorScheme="yellow">Pending</Badge>
                      ) : payment.status === PaymentStatus.Cancelled ? (
                        <Badge colorScheme="red">Cancel</Badge>
                      ) : (
                        <Badge colorScheme="red">Have an error</Badge>
                      )}
                    </Td>
                    <Td>{formatCurrencyVND(payment.price.toString())}</Td>
                    <Td>{payment.playFieldOwnerName}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>

        <NavigationDot
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          rowsPerPageOptions={rowsPerPageOption}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Flex>
    </Flex>
  );
};

export default PagmentHistory;
