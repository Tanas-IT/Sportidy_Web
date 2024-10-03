import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Image,
  Input,
  ModalBody,
  ModalFooter,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import style from "./ModalFormProduct.module.scss";
import { toast } from "react-toastify";
import { validateProductForm } from "../../../utils/validation";
import { getPlayFieldById } from "../../../services/ProductService";
import { getInitialPlayFieldForm } from "../../../utils/initialData";
import { PlayFieldDataEdit } from "../../../payloads/responses/PlayFieldCreate.model";
import { PlayFieldForm } from "../../../models/PlayFieldForm.model";

interface ModalFormProductProps {
  id?: number;
  handleCreate?: (productForm: FormData) => void;
  handleEdit?: (id: number, productForm: PlayFieldDataEdit) => void;
  onClose: () => void;
  isEdit: boolean;
}

const ModalFormProduct: React.FC<ModalFormProductProps> = ({
  id,
  onClose,
  handleCreate,
  isEdit,
  handleEdit,
}) => {
  const brandId = id;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<PlayFieldForm>(getInitialPlayFieldForm());

  useEffect(() => {
    if (isEdit && id) {
      const loadProductData = async () => {
        try {
          setIsLoading(true);

          const product = await getPlayFieldById(id);
          setIsLoading(false);

          if (product) {
            setFormData({
              playFieldName: { value: product.data.playFieldName, errorMessage: "" },
              address: { value: product.data.address, errorMessage: "" },
              status: { value: product.data.status, errorMessage: "" },
              price: { value: product.data.price, errorMessage: "" },
            });
          } else {
            throw new Error("PlayField not found");
          }
        } catch (err) {
          console.error("Error fetching product data:", err);
          toast.error("Error fetching product data");
        }
      };

      loadProductData();
    }
  }, []);

  const handleChange = (field: keyof PlayFieldForm, value: string | number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: { value, errorMessage: "" },
    }));
  };

  const handleSubmit = async () => {
    const errors = validateProductForm(formData);

    const updatedFormData = {
      playFieldName: {
        value: formData.playFieldName.value,
        errorMessage: errors.playFieldName,
      },
      address: { value: formData.address.value, errorMessage: errors.address },
      price: { value: formData.price.value, errorMessage: errors.price },
      status: { value: formData.status.value, errorMessage: errors.status.toString() },
    };
    setFormData(updatedFormData);

    const productForm: PlayFieldDataEdit = {
      playFieldId: id!,
      playFieldName: formData.playFieldName.value,
      address: formData.address.value?.toString(),
      price: formData.price.value,
      status: formData.status.value,
    };
    handleEdit?.(id!, productForm);
  };

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
        zIndex="9999"
      >
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <ModalBody>
        <Flex className={style.ModalBody}>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>PlayField Id</Text>
            <Input
              className={style.InputField}
              placeholder="VD: Sân bóng đá"
              value={brandId}
              readOnly
            />
          </Flex>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>PlayField Name</Text>
            <Input
              className={style.InputField}
              placeholder="VD: Sân bóng đá"
              value={formData.playFieldName.value}
              onChange={(e) => handleChange("playFieldName", e.target.value)}
            />
            {formData.playFieldName.errorMessage && (
              <Text className={style.ErrorText}>{formData.playFieldName.errorMessage}</Text>
            )}
          </Flex>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>Address</Text>
            <Input
              className={style.InputField}
              placeholder="VD: TPHCM"
              value={formData.address.value?.toString()}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            {formData.address.errorMessage && (
              <Text className={style.ErrorText}>{formData.address.errorMessage}</Text>
            )}
          </Flex>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>Status</Text>
            <select
              id="isActive"
              value={formData.status.value}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option disabled hidden value="">
                Select one
              </option>
              <option value="2">Active</option>
              <option value="3">Banned</option>
            </select>
          </Flex>
          <Flex className={style.ModalBodyItem}>
            <Text className={style.FieldTitle}>Giá</Text>
            <Input
              className={style.InputField}
              placeholder="Giá: 100000"
              value={formData.price.value?.toString()}
              onChange={(e) => handleChange("price", e.target.value)}
            />
            {formData.price.errorMessage && (
              <Text className={style.ErrorText}>{formData.price.errorMessage}</Text>
            )}
          </Flex>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Flex className={style.Footer}>
          <Button onClick={() => onClose()}>Huỷ</Button>
          <Button className={style.AddProductBtn} onClick={handleSubmit}>
            {isEdit ? "Lưu" : "Tạo mới"}
          </Button>
        </Flex>
      </ModalFooter>
    </>
  );
};

export default ModalFormProduct;
