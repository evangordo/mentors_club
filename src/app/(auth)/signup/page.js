"use client";
import { useFormState } from "react-dom";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { sendEmail, register } from "../../lib/actions";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Image from "../../components/Image";
import google from "../../assets/googleSignin.png";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("mentee");
  const [state, formAction] = useFormState(register, undefined);
  const router = useRouter();
  const [sendEmailState, sendEmailAction] = useFormState(sendEmail, {
    error: null,
    success: false,
  });

  const handleSignUpSuccess = useCallback(
    (email, role, name) => {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", role);
      localStorage.setItem("firstName", name);
      if (role === "mentor") {
        router.push("/mentorinfo");
      } else if (role === "mentee") {
        router.push("/menteeinfo");
      } else {
        router.push("/");
      }
    },
    [router]
  );

  useEffect(() => {
    if (state?.success) {
      const formData = new FormData(document.querySelector("form"));
      sendEmailAction(formData);
      const email = formData.get("email");
      const firstName = formData.get("firstName");
      handleSignUpSuccess(email, role, firstName);
    }
    if (sendEmailState.success) {
      alert("Email sent!");
    }
    if (sendEmailState.error) {
      alert("Error sending email!");
    }
  }, [
    state?.success,
    sendEmailState,
    handleSignUpSuccess,
    role,
    sendEmailAction,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formAction(formData);
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <form onSubmit={handleSubmit}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} mb={2} color={"gray.600"}>
              join the mentors clubs today!
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input name="firstName" type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input name="lastName" type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl as="fieldset" isRequired>
                <RadioGroup defaultValue="mentee" onChange={setRole}>
                  <HStack spacing="24px">
                    <FormLabel>Im signing up as a:</FormLabel>
                    <Radio name="role" value="mentor">
                      Mentor
                    </Radio>
                    <Radio name="role" value="mentee">
                      Mentee
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"green.400"}
                  color={"white"}
                  _hover={{
                    bg: "green.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Text align={"center"}>Or</Text>
              <Button
                variant="outline"
                borderRadius="lg"
                loadingText="Submitting"
                size="lg"
                bg={"#464768"}
                color={"white"}
                _hover={{
                  bg: "grey.500",
                }}
              >
                <Box
                  bg="white"
                  p={0}
                  m={2}
                  rounded={"full"}
                  justifyContent={"start"}
                >
                  <Image boxSize={10} src={google} alt="signin" />
                </Box>
                Sign up with Google
              </Button>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href="/Login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
