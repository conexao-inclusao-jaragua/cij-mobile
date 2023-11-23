import * as SecureStore from "expo-secure-store";

export const useSecureStore = () => {
  const save = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  };

  const getValueFor = async (key: string) => {
    let result = await SecureStore.getItemAsync(key);
    return result;
  };

  const deleteValueFor = async (key: string) => {
    let result = await SecureStore.deleteItemAsync(key);
    return result;
  };

  return { save, getValueFor, deleteValueFor };
};
