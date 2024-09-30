import {
  Avatar,
  Flex,
  Text,
  Icon,
  Divider,
  Link as ChakraLink,
  useDisclosure,
} from "@chakra-ui/react";
import style from "./Sidebar.module.scss";
import React, { useState, useEffect } from "react";
import { CgAddR } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { Link as ReactRouterLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/SPORTYDINoBg.png";
import { AiOutlineCreditCard, AiOutlineCustomerService } from "react-icons/ai";
import { MdOutlineStadium } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { useTranslation } from "react-i18next";

import { UserForm } from "../../../models/UserForm.model";
import { UserRole } from "../../../constants/Enum";
import { getInitialUserForm } from "../../../utils/initialData";
import { toast } from "react-toastify";
import ModalForm from "../../Modals/ModalForm/ModalForm";
import ModalFormUser from "../../Modals/ModalFormUser/ModalFormUser";
import { themeColors } from "../../../constants/GlobalStyles";

function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [item, setItem] = useState("");

  // USER DATA
  const [userData, setUserData] = useState<UserForm>(getInitialUserForm());

  const { onOpen: onOpenBrand } = useDisclosure();
  const { onOpen: onOpenBranch } = useDisclosure();
  const { isOpen: isOpenUser, onClose: onCloseUser } = useDisclosure();

  const changeItem = setItem;

  const getMenuPartFromPathname = (pathname: string) => {
    const match = pathname.match(/^\/([^\/]+)/);
    return match ? match[1] : "";
  };

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const roleIdString = localStorage.getItem("RoleId");
  const roleId = roleIdString ? roleIdString : "";
  const menuItems = [
    {
      icon: MdOutlineDashboard,
      label: t("dashboard"),
      to: "/admin-dashboard",
      permissionRole: [UserRole.Admin],
      isDisabled: false,
    },

    {
      icon: AiOutlineUser,
      label: t("users"),
      to: "/users",
      permissionRole: [UserRole.Admin],
      isDisabled: false,
    },
    {
      icon: AiOutlineCreditCard,
      label: t("paymentHistory"),
      to: "/payment-history",
      permissionRole: [UserRole.Admin],
      isDisabled: false,
    },

    {
      icon: MdOutlineStadium,
      label: t("Playfield"),
      to: "/playfield",
      permissionRole: [UserRole.Admin],
      isDisabled: false,
    },

    {
      icon: AiOutlineCustomerService,
      label: t("Feedback"),
      divider: true,
      to: "/feedback",
      permissionRole: [UserRole.Admin],
      isDisabled: false,
    },

    {
      icon: IoSettingsOutline,
      label: t("settings"),
      divider: true,
      to: "/settings",
      isDisabled: false,
    },
    {
      icon: CgAddR,
      label: t("new brand"),
      onclick: onOpenBrand,
      permissionRole: UserRole.Admin,
      isDisabled: false,
    },
  ];

  useEffect(() => {
    const currentItem = menuItems.find((menuItem) => menuItem.to === location.pathname);
    if (currentItem) {
      setItem(currentItem.label);
    }
  }, [location.pathname, menuItems]);

  function logoutHandler() {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    const toastMessage = localStorage.getItem("toastMessage");
    if (toastMessage) {
      toast.success(toastMessage);
      localStorage.removeItem("toastMessage");
    }
  }, []);

  const updateUserData = (data: UserForm) => {
    setUserData(data);
  };

  const filteredMenuItems = menuItems.filter((menuItem) => {
    if (!menuItem.permissionRole) return true;
    if (Array.isArray(menuItem.permissionRole)) {
      return menuItem.permissionRole.toString().includes(roleId);
    }
    return menuItem.permissionRole.toString() === roleId;
  });

  const currentPathPart = getMenuPartFromPathname(location.pathname);

  return (
    <Flex className={style.Sidebar} width={isExpanded ? "250px" : "65px"} direction="column">
      <Flex>
        <Flex className={style.Logo}>
          <Avatar src={Logo} className={style.Avatar} />
          {isExpanded && <Text className={style.LogoText}>SPORTIDI</Text>}
        </Flex>
        <IoIosArrowForward
          className={style.ArrowSidebar}
          onClick={toggleSidebar}
          style={{
            transform: `rotate(${isExpanded ? 180 : 0}deg)`,
            color: "#fff",
          }}
        />
      </Flex>

      <Flex className={style.MenuItems} direction="column">
        {filteredMenuItems.map((menuItem, index) => (
          <React.Fragment key={index}>
            <ChakraLink
              as={menuItem.to && !menuItem.isDisabled ? ReactRouterLink : "button"}
              {...(menuItem.to ? { to: menuItem.to } : {})}
              className={`${style.MenuItem} ${menuItem.isDisabled ? style.disabled : ""}`}
              style={{ textDecoration: "none" }}
              onClick={
                !menuItem.isDisabled
                  ? menuItem.to
                    ? () => changeItem(menuItem.label)
                    : menuItem.onclick
                  : undefined
              }
              backgroundColor={
                item === menuItem.label ||
                (menuItem.label === t("brands") && currentPathPart === "branches") ||
                (menuItem.label === t("brands") && currentPathPart === "brands")
                  ? themeColors.sidebarBgColor
                  : "#fff"
              }
              color={
                item === menuItem.label ||
                (menuItem.label === t("brands") && currentPathPart === "branches") ||
                (menuItem.label === t("brands") && currentPathPart === "brands")
                  ? "#F1F8E8"
                  : "black"
              }
              cursor={menuItem.isDisabled ? "not-allowed" : "pointer"}
            >
              <Flex>
                <Icon as={menuItem.icon} className={style.MenuIcon} />
                {isExpanded && <Text className={style.MenuText}>{menuItem.label}</Text>}
              </Flex>
            </ChakraLink>
            {menuItem.divider && <Divider />}
          </React.Fragment>
        ))}
      </Flex>

      <Flex className={style.Profile} onClick={logoutHandler}>
        <MdLogout className={style.LogoutIcon} />
        {isExpanded && <Text className={style.LogoutText}>Đăng Xuất</Text>}
      </Flex>

      <ModalForm
        formBody={
          <ModalFormUser
            isEdit={false}
            onClose={onCloseUser}
            onOpenBranch={onOpenBranch}
            onOpenBrand={onOpenBrand}
            updateUserData={updateUserData}
            userData={userData}
          />
        }
        isEdit={false}
        stepperIndex={1}
        onClose={onCloseUser}
        isOpen={isOpenUser}
        title={t("Thêm người dùng mới")}
        updateUserData={updateUserData}
      />
    </Flex>
  );
}

export default Sidebar;
