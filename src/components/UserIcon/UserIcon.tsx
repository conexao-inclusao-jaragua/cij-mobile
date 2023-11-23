import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Box, Image, Text } from "@gluestack-ui/themed";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeUser } from "../../redux/user/uesrSlice";
import { useSecureStore } from "../../hooks/useSecureStore";

const UserIcon = () => {
  const router = useRouter();
  const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);
  const dispatch = useAppDispatch();
  const store = useSecureStore();

  const logout = async () => {
    dispatch(removeUser());
    await store.deleteValueFor("token");

    router.push("/signin");
  };

  return (
    <Box>
      {user ? (
        <Pressable onPress={logout}>
          <Text>Logout</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            router.push("/signin");
          }}
        >
          <Text>Login</Text>
        </Pressable>
      )}
    </Box>
  );
};

export default UserIcon;
