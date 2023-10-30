import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "@gluestack-ui/themed";

const UserIcon = () => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        router.push("/signin");
      }}
    >
      <Text>Login</Text>
    </Pressable>
  );
};

export default UserIcon;
