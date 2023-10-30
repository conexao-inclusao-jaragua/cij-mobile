import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import { Button } from "@gluestack-ui/themed";

import { useSecureStore } from "../../hooks/useSecureStore";
import AuthService from "../../services/AuthService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { defineUser, removeUser } from "../../redux/user/uesrSlice";

const Home = () => {
  const router = useRouter();
  const store = useSecureStore();
  const dispatch = useAppDispatch();
  const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);

  const getToken = async () => {
    const token = await store.getValueFor("token");

    if (typeof token == "string") {
      const user = await AuthService.getMe(token);

      if (user) {
        dispatch(defineUser({ user }));
      }
    }
  };

  const logout = () => {
    dispatch(removeUser());
    store.deleteValueFor("token");

    router.push("/signin");
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button onPress={() => getToken()}>
        <Text>save</Text>
      </Button>

      <Button onPress={() => logout()}>
        <Text>Logout</Text>
      </Button>

      <Text>{user?.name}</Text>
    </SafeAreaView>
  );
};

export default Home;
