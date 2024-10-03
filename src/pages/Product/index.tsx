import {
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";

import style from "./Product.module.scss";
import { useCallback, useEffect, useState } from "react";
import { ProductData } from "../../payloads/responses/ProductData.model";
import {
  createProduct,
  deletePlayfield,
  getPlayFields,
  updatePlayfield,
} from "../../services/ProductService";
import { toast } from "react-toastify";
import moment from "moment";
import NavigationDot from "../../components/NavigationDot/NavigationDot";
import Loading from "../../components/Loading";
import ModalForm from "../../components/Modals/ModalForm/ModalForm";
import ModalFormProduct from "../../components/Modals/ModalFormProduct/ModalFormProduct";
import Searchbar from "../../components/Searchbar";
import { useLocation, useNavigate } from "react-router-dom";
import ActionMenuProduct from "../../components/ActionMenu/ActionMenuProduct/ActionMenuProduct";
import { formatCurrency, getOptions } from "../../utils/functionHelper";
import { PlayFieldData } from "../../payloads/responses/PlayFieldData.model";
import { PlayFieldDataEdit } from "../../payloads/responses/PlayFieldCreate.model";

function Product() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<PlayFieldData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rowsPerPageOption, setRowsPerPageOption] = useState<number[]>([5]);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const { isOpen: isOpenProduct, onOpen: onOpenProduct, onClose: onCloseProduct } = useDisclosure();

  const location = useLocation();
  const navigate = useNavigate();
  let flag = false;

  useEffect(() => {
    if (location.state?.toastMessage && !flag) {
      toast.success(location.state.toastMessage, {
        autoClose: 2500,
      });
      flag = true;
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);

  const fetchData = useCallback(
    async (searchValue?: string) => {
      try {
        setIsLoading(true);
        let result;

        const loadData = async () => {
          if (searchValue) {
            result = await getPlayFields(currentPage, rowsPerPage, searchValue);
          } else {
            result = await getPlayFields(currentPage, rowsPerPage, "");
          }
          setData(result.list);
          setTotalPages(result.totalPage);
          setTotalRecords(result.totalRecord);
          setRowsPerPageOption(getOptions(result.totalRecord));
          setIsLoading(false);
        };

        setTimeout(loadData, 500);
      } catch (err) {
        toast.error("Lỗi khi lấy dữ liệu");
        setIsLoading(false);
      }
    },
    [currentPage, rowsPerPage],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  async function handleCreate(productForm: FormData) {
    try {
      setIsLoading(true);
      const productResult = await createProduct(productForm);

      if (productResult.statusCode === 200) {
        fetchData();
        toast.success("Thêm sản phẩm thành công");
        onCloseProduct();
      } else {
        toast.error(productResult.message);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  async function handleDelete(id: number) {
    try {
      const result = await deletePlayfield(id);
      if (result.statusCode === 200) {
        if ((totalRecords - 1) % rowsPerPage === 0 && currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        } else {
          fetchData();
        }
        toast.success("Delete Playfield Success");
      }
    } catch (e) {
      toast.error("Delete Playfield Failed");
    }
  }

  async function handleEdit(id: number, plafieldForm: PlayFieldDataEdit) {
    try {
      console.log("Before Update: ", id);
      const result = await updatePlayfield(id, plafieldForm);
      if (result.statusCode === 200) {
        fetchData();
        toast.success("Update PlayField Success");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Update PlayField Failed");
    }
  }

  async function handleSearch(value: string) {
    fetchData(value);
  }

  return (
    <Flex className={style.container}>
      <Flex className={style.searchWrapper}>
        <Searchbar onSearch={handleSearch} />
        <ModalForm
          formBody={
            <ModalFormProduct onClose={onCloseProduct} handleCreate={handleCreate} isEdit={false} />
          }
          onClose={onCloseProduct}
          isOpen={isOpenProduct}
          title={"Edit PlayField"}
        />
      </Flex>
      <Flex className={style.Product}>
        <TableContainer className={style.ProductTbl}>
          <Table>
            <TableCaption>Table Of Manage PlayField</TableCaption>
            <Thead>
              <Tr>
                <Th className={style.HeaderTbl}>No.</Th>
                <Th className={style.HeaderTbl}>Playfield Name</Th>
                <Th className={style.HeaderTbl}>Image</Th>
                <Th className={style.HeaderTbl}>Type</Th>
                <Th className={style.HeaderTbl}>Price</Th>
                <Th className={style.HeaderTbl}>Open-Close Time</Th>
                <Th className={style.HeaderTbl}>Playfield's Owner</Th>
                <Th className={style.HeaderTbl}>Address</Th>
                <Th className={style.HeaderTbl}>Cài đặt</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <Tr>
                  <Td colSpan={10} className={style.LoadingCell}>
                    <Loading />
                  </Td>
                </Tr>
              ) : data.length === 0 ? (
                <Tr>
                  <Td colSpan={10}>No Playfield to display</Td>
                </Tr>
              ) : (
                data.map((playfield, index) => (
                  <Tr key={playfield.playFieldCode} className={style.ProductItem}>
                    <Td>{(currentPage - 1) * rowsPerPage + index + 1}</Td>
                    <Td>{playfield.playFieldName}</Td>
                    <Td>
                      <img
                        src={playfield.avatarImage}
                        alt={playfield.playFieldName}
                        className={style.ProductImage}
                      />
                    </Td>
                    <Td>{playfield.sportName}</Td>
                    <Td>{formatCurrency(playfield.price.toString())}</Td>
                    <Td>
                      {playfield.openTime} - {playfield.closeTime}
                    </Td>
                    <Td className={style.WrapText}>{playfield.fullName}</Td>
                    <Td>{playfield.address}</Td>
                    <Td>
                      <ActionMenuProduct
                        id={playfield.playFieldId}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                      />
                    </Td>
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
}

export default Product;
