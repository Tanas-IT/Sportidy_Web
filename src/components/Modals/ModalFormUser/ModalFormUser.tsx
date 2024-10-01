import React, { useState } from "react";
import {
  ModalBody,
  Flex,
  Box,
  Select,
  Input,
  Text,
  RadioGroup,
  Stack,
  Radio,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import styles from "./ModalFormUser.module.scss";
import { themeColors } from "../../../constants/GlobalStyles";
import { CurrentForm } from "../../../constants/Enum";
import { BrandForm } from "../../../models/BrandForm.model";
import { UserForm } from "../../../models/UserForm.model";
import { validateUserForm } from "../../../utils/validation";
import {
  generateUsernameFromBranch,
  generateUsernameFromBrand,
} from "../../../utils/createUserName";
import { BranchForm } from "../../../models/BranchForm.model";
import {
  getInitialBranchForm,
  getInitialBrandForm,
  getInitialUserForm,
} from "../../../utils/initialData";

interface ModalFormBrandProps {
  isEdit: boolean;
  onClose: () => void;
  formPrevious?: CurrentForm;
  onOpenBranch?: () => void;
  onOpenBrand?: () => void;
  updateBrandData?: (data: BrandForm) => void;
  updateBranchData?: (data: BranchForm) => void;
  updateUserData: (data: UserForm, isSave: boolean) => void;
  saveBrandHandle?: (data: UserForm) => void;
  saveBranchHandle?: (data: UserForm) => void;
  brandName?: string;
  userData: UserForm;
  branch?: BranchForm;
}

const ModalFormUser: React.FC<ModalFormBrandProps> = ({
  isEdit,
  onClose,
  formPrevious,
  onOpenBranch,
  onOpenBrand,
  updateBrandData,
  updateBranchData,
  updateUserData,
  saveBrandHandle,
  saveBranchHandle,
  brandName,
  userData,
  branch,
}) => {
  var initialUserNameValue = "";
  if (formPrevious === CurrentForm.BRAND) {
    initialUserNameValue = brandName
      ? generateUsernameFromBrand(brandName)
      : userData.userName.value;
  } else if (formPrevious === CurrentForm.BRANCH) {
    initialUserNameValue = branch ? generateUsernameFromBranch(branch) : userData.userName.value;
  }

  const [formData, setFormData] = useState<UserForm>({
    userId: { value: userData.userId.value, errorMessage: "" },
    fullName: { value: userData.fullName.value, errorMessage: "" },
    userName: {
      value: initialUserNameValue ? initialUserNameValue : userData.userName.value,
      errorMessage: "",
    },
    phoneNumber: { value: userData.phoneNumber.value, errorMessage: "" },
    DOB: { value: userData.DOB.value, errorMessage: "" },
    gender: { value: userData.gender.value || 1, errorMessage: "" },
    isDeleted: { value: userData.isDeleted.value || 0, errorMessage: "" },
    description: { value: userData.description.value, errorMessage: "" },
  });

  const handleInputChange = (field: keyof UserForm, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: { value, errorMessage: "" },
    }));
  };

  const handleDateChange = (field: keyof UserForm, value: string) => {
    if (!isNaN(Date.parse(value))) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: { value: new Date(value), errorMessage: "" },
      }));
    }
  };

  const handleGenderChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: { value: Number(value), errorMessage: "" },
    }));
  };

  const handleDescriptionChange = (field: keyof UserForm, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: { value, errorMessage: "" },
    }));
  };

  const handleIsActiveChange = (value: string) => {
    console.log("Is Active Test: ", Number(value));
    setFormData((prevData) => ({
      ...prevData,
      isDeleted: { value: Number(value), errorMessage: "" },
    }));
  };

  const cancelHandler = () => {
    if (formPrevious === CurrentForm.BRAND) {
      updateBrandData?.(getInitialBrandForm());
    } else if (formPrevious === CurrentForm.BRANCH) {
      updateBranchData?.(getInitialBranchForm());
    }
    updateUserData?.(getInitialUserForm(), false);
    onClose();
  };

  const openFormPreviousHandler = () => {
    onClose();
    setTimeout(() => {
      if (formPrevious === CurrentForm.BRAND) {
        onOpenBrand?.();
      } else {
        onOpenBranch?.();
      }
      updateUserData?.(formData, true);
    }, 350);
  };

  const handleSaveForm = () => {
    const errors = validateUserForm(formData);
    console.log("Form Data", formData);
    const updatedFormData = {
      userId: { ...formData.userId, errorMessage: "" },
      fullName: { ...formData.fullName, errorMessage: errors.fullName },
      userName: { ...formData.userName, errorMessage: "" },
      phoneNumber: { ...formData.phoneNumber, errorMessage: errors.phoneNumber },
      DOB: { ...formData.DOB, errorMessage: errors.DOB },
      gender: { ...formData.gender, errorMessage: "" },
      isDeleted: { ...formData.isDeleted, errorMessage: "" },
      description: { ...formData.description, errorMessage: "" },
    };

    setFormData(updatedFormData);
    const hasError = Object.values(errors).some((error) => error !== "");

    if (!hasError) {
      if (isEdit) {
        updateUserData(formData, true);
      } else {
        if (formPrevious === CurrentForm.BRAND) {
          cancelHandler();
          saveBrandHandle?.(formData);
        } else if (formPrevious === CurrentForm.BRANCH) {
          cancelHandler();
          saveBranchHandle?.(formData);
        }
      }
    }
  };

  return (
    <>
      <ModalBody>
        <Flex direction="column" alignItems="stretch" className={styles.containerForm}>
          <Flex justify="space-between" mb={3}>
            <Box flex="1" ml={2}>
              <Text className={styles.textFontWeight600} py={3} pr={3}>
                FullName
              </Text>
              <Input
                placeholder="FullName"
                pl={3}
                value={formData.fullName.value}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
              {formData.fullName.errorMessage && (
                <Text color="red.500">{formData.fullName.errorMessage}</Text>
              )}
            </Box>
            <Input pl={3} type="hidden" value={formData.userId.value} />
          </Flex>

          <Flex justify="space-between" mb={3}>
            <Box flex="1" ml={2}>
              <Text className={styles.textFontWeight600} py={3} pr={3}>
                Username
              </Text>
              <Input readOnly placeholder="UserName" pl={3} value={formData.userName.value} />
            </Box>
            <Box flex="1" ml={2}>
              <Text className={styles.textFontWeight600} py={3} pr={3}>
                Description
              </Text>
              <Input
                placeholder="Description"
                pl={3}
                value={formData.description.value}
                onChange={(e) => handleDescriptionChange("description", e.target.value)}
              />
              {formData.description.errorMessage && (
                <Text color="red.500">{formData.description.errorMessage}</Text>
              )}
            </Box>
          </Flex>

          <Flex justify="space-between" mb={3} ml={2}>
            <Box flex="1">
              <Text className={styles.textFontWeight600} py={3} pr={3}>
                Phone
              </Text>
              <Input
                placeholder="Phone"
                pl={3}
                value={formData.phoneNumber.value}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              />
              {formData.phoneNumber.errorMessage && (
                <Text color="red.500">{formData.phoneNumber.errorMessage}</Text>
              )}
            </Box>

            <Box flex="1" ml={3}>
              <Text className={styles.textFontWeight600} py={3} pr={3}>
                Date Of Birth
              </Text>
              <Input
                type="date"
                pl={3}
                value={formData.DOB.value ? formData.DOB.value.toISOString().split("T")[0] : ""}
                onChange={(e) => handleDateChange("DOB", e.target.value)}
              />
              {formData.DOB.errorMessage && (
                <Text color="red.500">{formData.DOB.errorMessage}</Text>
              )}
            </Box>
          </Flex>

          <Flex justify="space-between" mb={3}>
            <Box flex="1" ml={3}>
              <Text className={styles.textFontWeight600} py={3} pr={3} mb={2}>
                Gender
              </Text>
              <RadioGroup value={formData.gender.value?.toString()} onChange={handleGenderChange}>
                <Stack spacing={5} direction="row" ml={3}>
                  <Radio value="1">
                    <Text className={styles.textFontWeight600}>Male</Text>
                  </Radio>
                  <Radio value="2">
                    <Text className={styles.textFontWeight600}>Female</Text>
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box flex="1" ml={3}>
              <Text className={styles.textFontWeight600} py={3} pr={3}>
                Active
              </Text>
              <Select
                id="isActive"
                value={formData.isDeleted.value}
                className={styles.isActive}
                onChange={(e) => handleIsActiveChange(e.target.value)}
              >
                <option disabled hidden value="">
                  Select one
                </option>
                <option value="0">Yes</option>
                <option value="1">No</option>
              </Select>
            </Box>
          </Flex>
        </Flex>
      </ModalBody>
      <ModalFooter justifyContent={isEdit ? "flex-end" : "space-between"}>
        {!isEdit && (
          <Button
            backgroundColor={themeColors.primaryButton}
            color="white"
            onClick={openFormPreviousHandler}
          >
            Back
          </Button>
        )}

        <Flex>
          <Button className={styles.CancelBtn} onClick={cancelHandler}>
            Cancel
          </Button>
          <Button onClick={handleSaveForm} className={styles.MainBtn}>
            Save
          </Button>
        </Flex>
      </ModalFooter>
    </>
  );
};

export default ModalFormUser;
