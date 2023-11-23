import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AlertCircleIcon,
  Box,
  Button,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Text,
  InputSlot,
  InputIcon,
  EyeIcon,
  EyeOffIcon,
} from "@gluestack-ui/themed";

import { useAppDispatch } from "../../redux/hooks.ts";
import { defineUser } from "../../redux/user/uesrSlice.ts";
import LoginService from "../../services/AuthService.ts";
import { useToast } from "../../hooks/useToast.tsx";
import { useSecureStore } from "../../hooks/useSecureStore.ts";

import { TLogin, TToast } from "../../types";

import { styles, sxs } from "./signin.style.ts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Signin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();
  const store = useSecureStore();

  const [login, setLogin] = useState<TLogin>({ email: "", password: "" });
  const [form, setForm] = useState({ isInvalid: false });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleEmailChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setLogin({
      ...login,
      email: e.nativeEvent.text,
    });
  };

  const handlePasswordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setLogin({
      ...login,
      password: e.nativeEvent.text,
    });
  };

  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isInvalidData = () => {
    if (login.email === "" || login.password === "") {
      return true;
    }

    return false;
  };

  const authenticate = async () => {
    if (isInvalidData()) {
      setForm({ ...form, isInvalid: true });
      return;
    }

    try {
      const res = await LoginService.login(login);
      delete res.data.user_info.password;

      await store.save("token", res.data.token);
      dispatch(defineUser({ user: res.data.user_info }));

      toast.showToast({
        action: "success",
        title: "Sucesso",
        message: "Logado com sucesso!",
      } as TToast);

      router.push("/");
    } catch (error) {
      toast.showToast({
        action: "error",
        title: "Erro",
        message: "Usuário ou senha inválidos",
      } as TToast);

      console.log("error: ", error);
    }
  };

  // $primary400 é o padrão
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box style={styles.container}>
          <FormControl style={styles.form} isInvalid={form.isInvalid}>
            <Box>
              <FormControlLabel>
                <FormControlLabelText sx={sxs.formLabel}>
                  Email
                </FormControlLabelText>
              </FormControlLabel>

              <Input isRequired>
                <InputField value={login.email} onChange={handleEmailChange} />
              </Input>
            </Box>

            <Box>
              <FormControlLabel>
                <FormControlLabelText sx={sxs.formLabel}>
                  Senha
                </FormControlLabelText>
              </FormControlLabel>

              <Input isRequired>
                <InputField
                  value={login.password}
                  onChange={handlePasswordChange}
                  type={isPasswordVisible ? "text" : "password"}
                />

                <InputSlot pr="$3" onPress={toggleVisibility}>
                  {isPasswordVisible ? (
                    <InputIcon as={EyeIcon} color="$darkBlue300" size="lg" />
                  ) : (
                    <InputIcon as={EyeOffIcon} color="$darkBlue300" size="lg" />
                  )}
                </InputSlot>
              </Input>
            </Box>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Insira todas as informações
              </FormControlErrorText>
            </FormControlError>

            <Button onPress={authenticate}>
              <Text color="$textLight0">Entrar</Text>
            </Button>

            <Link style={styles.withoutLoginText} href="/">
              Continuar sem Login
            </Link>

            <Link style={styles.withoutLoginText} href="/signup">
              Cadastre-se
            </Link>
          </FormControl>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signin;
