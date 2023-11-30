import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import { Button } from "@gluestack-ui/themed";

import { useSecureStore } from "../../hooks/useSecureStore";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { defineUser, removeUser } from "../../redux/user/uesrSlice";
import axios from "axios";
import UserService from "../../services/UserService";

const Home = () => {
  const router = useRouter();
  const store = useSecureStore();
  const dispatch = useAppDispatch();
  const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);

  const getToken = async () => {
    const token = await store.getValueFor("token");

    if (typeof token == "string") {
      try {
        const res = await UserService.getUserByToken(token);
        const user = res.data.user_info;

        if (user) {
          dispatch(defineUser({ user }));
        }
      } catch (err) {
        console.log(err);
        await store.deleteValueFor("token");
      }
    }
  };

  const logout = () => {
    dispatch(removeUser());
    store.deleteValueFor("token");

    router.push("/signin");
  };

  const getHealth = () => {
    axios
      .get(
        "https://ec2-18-228-222-57.sa-east-1.compute.amazonaws.com:3040/health"
      )
      .then((res: any) => console.log(res.data))
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button onPress={() => getHealth()}>
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
