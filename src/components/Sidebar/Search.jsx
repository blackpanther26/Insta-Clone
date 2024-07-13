import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import { useRef } from "react";
import SuggestedUser  from "../SuggestedUsers/SuggestedUser";
const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, user, getUserProfile ,setUser} = useSearchUser();
  const searchRef = useRef(null);
  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };
  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay>
          <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
            <ModalHeader>Search</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleSearchUser}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input placeholder="search" ref={searchRef} />
                  <Flex w={"full"} justifyContent={"flex-end"}>
                    <Button
                      type={"submit"}
                      ml={"auto"}
                      my={4}
                      isLoading={isLoading}
                      size={"sm"}
                      variant={"ghost"}
                    >
                      Search
                    </Button>
                  </Flex>
                </FormControl>
              </form>
              {user && <SuggestedUser user={user} setUser={setUser}/>}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default Search;