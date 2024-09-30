import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import bg from "../../assets/images/theme_login-removebg.png";
import avatar from "../../assets/images/SPORTYDINoBg.png";
import wave from "../../assets/images/wave.png";
import style from "./Login.module.scss";
import { IoMdPerson } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { login } from "../../services/AuthenticationService";
import { toast } from "react-toastify";
import Loading from "../../assets/gif/loadingCoffee.gif";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserLoginData } from "../../payloads/responses/LoginResponse.model";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  let flag = false;

  useEffect(() => {
    if (location.state?.toastMessage && !flag) {
      toast.error(location.state.toastMessage, {
        autoClose: 2500,
      });
      flag = true;
    }
  }, [location.state]);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      loginHandler();
    }
  };

  const loginHandler = async () => {
    if (!credentials.username || !credentials.password) {
      toast.error("Please enter email and password");
      return;
    }
    try {
      setIsLoading(true);
      const response = await login(credentials.username, credentials.password);

      if (response.httpCode === 200) {
        console.log("Response: ", response);
        const decodedToken = jwtDecode(response.token.accessToken) as UserLoginData;
        localStorage.setItem("role", decodedToken.role.toString());
        localStorage.setItem("AccessToken", response.token.accessToken);
        localStorage.setItem("RefreshToken", response.token.refreshToken);
        const toastMessage = response.message;

        if (decodedToken.role === "ADMIN") {
          // const brand = await getBrandByUserId(response.data.userId);
          localStorage.setItem("UserId", decodedToken.UserId.toString());
          // localStorage.setItem("BrandId", brand.data.brandId.toString());
          // localStorage.setItem("BrandName", brand.data.brandName.toString());
          // localStorage.setItem("BrandLogo", brand.data.imageUrl.toString());
          // ---------------------------------------------------------------
          navigate("/admin-dashboard", { state: { toastMessage } });
        }
        // else if (response.data.roleId.toString() === UserRole.Admin.toString()) {
        //   localStorage.setItem("UserId", response.data.userId.toString());
        //   navigate("/admin-dashboard", { state: { toastMessage } });
        // }
      }
    } finally {
      setIsLoading(false);
    }
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
        bg="#E1C278"
        zIndex="9999"
      >
        <Image src={Loading} />
      </Flex>
    );
  }

  return (
    <>
      <Flex className={style.Login}>
        <Flex className={style.LeftContainer}>
          <Image src={wave} className={style.Wave} />
          <Image src={bg} className={style.Bg} />
        </Flex>
        <Flex className={style.RightContainer}>
          <Flex className={style.FormContainer}>
            <Flex className={style.HeaderContainer}>
              <Image src={avatar} className={style.Avatar} />
              <Text className={style.WelcomeText}>WELCOME</Text>
            </Flex>
            <Flex className={style.InputContainer}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <IoMdPerson />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Email"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <RiLockPasswordLine />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  />
                  <InputRightElement className={style.ShowPasswordContainer}>
                    <Button className={style.ShowPasswordButton} onClick={handleShowClick}>
                      {showPassword ? "Ẩn" : "Hiện"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Flex>
            <Button className={style.LoginButton} onClick={loginHandler}>
              Sign in
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Login;
