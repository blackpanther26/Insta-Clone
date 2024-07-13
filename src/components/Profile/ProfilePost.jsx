import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state)=>state.userProfile)
  const authUser = useAuthStore((state)=>state.user)
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease-in-out"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={10}>
            <Flex gap={1} alignItems={"center"}>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"}>{post.likes.length}</Text>
            </Flex>
            <Flex gap={1} alignItems={"center"}>
              <FaComment size={20} />
              <Text fontWeight={"bold"}>{post.comments.length}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
          alt="profile post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              maxH={"90vh"}
              minH={"50vh"}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={post.imageURL} alt="profile post" />
              </Flex>
              <Flex
                flex={1}
                flexDirection={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex gap={4} alignItems={"center"}>
                    <Avatar src={userProfile.profilePicURL} size={"sm"} name="pixel" />
                    <Text fontWeight={"bold"} fontSize={14}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {authUser.uid===userProfile.uid&&(
                    <Button
                    bg={"transparent"}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      borderRadius={4}
                      p={1}
                    >
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )}
                </Flex>
                <Divider my={4} bg={"gray.700"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxHeight={"500px"}
                  overflowY={"auto"}
                >
                  <Comment
                    createdAt="2d ago"
                    username="john_doe"
                    profilePic="https://randomuser.me/api/portraits/men/2.jpg"
                    text={"Amazing!"}
                  />
                  

                </VStack>
                <Divider bg={"gray.700"} marginTop={"auto"} />
                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;