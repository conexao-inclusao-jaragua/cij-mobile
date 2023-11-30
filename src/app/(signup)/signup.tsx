import { useState } from "react";
import { TToast, TUser } from "../../types";
import { GENDER } from "../../types/TUser";
import {
  AlertCircleIcon,
  Box,
  Button,
  EyeIcon,
  EyeOffIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioLabel,
  Text,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles, sxs } from "./signup.style.ts";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Link, useRouter } from "expo-router";
import { userSchema } from "../../validations/index.ts";
import { useToast } from "../../hooks/useToast.tsx";
import UserService from "../../services/UserService.ts";
import { RadioIndicator } from "@gluestack-ui/themed";
import { CircleIcon } from "@gluestack-ui/themed";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUp = () => {
  const toast = useToast();
  const router = useRouter();
  const [user, setUser] = useState<Omit<TUser, "id">>({
    cpf: "",
    email: "",
    gender: GENDER.Male,
    name: "",
    password: "",
    phone: "",
  });
  const [form, setForm] = useState({ isInvalid: false });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleChange = (field: keyof Omit<TUser, "id">, value: any) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  const createUser = () => {
    userSchema
      .validate(user)
      .then(() => {
        if (user.password !== confirmPassword) {
          toast.showToast({
            action: "error",
            title: "Erro",
            message: "As senhas não coincidem",
          } as TToast);

          return;
        }

        UserService.create(user)
          .then((res: any) => {
            toast.showToast({
              action: "success",
              title: "Sucesso",
              message: "Usuário criado com sucesso",
            } as TToast);

            router.push("/signin");
          })
          .catch((err: any) => {
            toast.showToast({
              action: "error",
              title: "Erro",
              message: "Erro ao criar usuário",
            } as TToast);
          });
      })
      .catch((err) => {
        setForm({ isInvalid: true });

        toast.showToast({
          action: "error",
          title: "Erro",
          message: err.message,
        } as TToast);
      });
  };

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
                  Nome Completo
                </FormControlLabelText>
              </FormControlLabel>

              <Input isRequired>
                <InputField
                  value={user.name}
                  onChange={(
                    e: NativeSyntheticEvent<TextInputChangeEventData>
                  ) => handleChange("name", e.nativeEvent.text)}
                />
              </Input>
            </Box>

            <Box>
              <FormControlLabel>
                <FormControlLabelText sx={sxs.formLabel}>
                  CPF
                </FormControlLabelText>
              </FormControlLabel>

              <Input isRequired>
                <InputField
                  value={user.cpf}
                  onChange={(
                    e: NativeSyntheticEvent<TextInputChangeEventData>
                  ) => handleChange("cpf", e.nativeEvent.text)}
                />
              </Input>
            </Box>

            <Box>
              <Text sx={sxs.formLabel}>Gênero</Text>
              <RadioGroup
                value={user.gender}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                  handleChange("gender", e)
                }
              >
                <Box style={styles.radioGroup}>
                  <Radio value={GENDER.Male} size="sm">
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>Masculino</RadioLabel>
                  </Radio>

                  <Radio value={GENDER.Female} size="sm">
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>Feminino</RadioLabel>
                  </Radio>

                  <Radio value={GENDER.Other} size="sm">
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>Outros</RadioLabel>
                  </Radio>
                </Box>
              </RadioGroup>
            </Box>

            <Box>
              <FormControlLabel>
                <FormControlLabelText sx={sxs.formLabel}>
                  Celular
                </FormControlLabelText>
              </FormControlLabel>

              <Input isRequired>
                <InputField
                  value={user.phone}
                  onChange={(
                    e: NativeSyntheticEvent<TextInputChangeEventData>
                  ) => handleChange("phone", e.nativeEvent.text)}
                />
              </Input>
            </Box>

            <Box>
              <FormControlLabel>
                <FormControlLabelText sx={sxs.formLabel}>
                  Email
                </FormControlLabelText>
              </FormControlLabel>

              <Input isRequired>
                <InputField
                  value={user.email}
                  onChange={(
                    e: NativeSyntheticEvent<TextInputChangeEventData>
                  ) => handleChange("email", e.nativeEvent.text)}
                />
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
                  value={user.password}
                  onChange={(
                    e: NativeSyntheticEvent<TextInputChangeEventData>
                  ) => handleChange("password", e.nativeEvent.text)}
                  type={isPasswordVisible ? "text" : "password"}
                />

                <InputSlot
                  pr="$3"
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <InputIcon as={EyeIcon} color="$darkBlue300" size="lg" />
                  ) : (
                    <InputIcon as={EyeOffIcon} color="$darkBlue300" size="lg" />
                  )}
                </InputSlot>
              </Input>
            </Box>

            <Box>
              <FormControlLabel>
                <FormControlLabelText sx={sxs.formLabel}>
                  Confirmar Senha
                </FormControlLabelText>
              </FormControlLabel>

              <Input isRequired>
                <InputField
                  value={confirmPassword}
                  onChange={(
                    e: NativeSyntheticEvent<TextInputChangeEventData>
                  ) => setConfirmPassword(e.nativeEvent.text)}
                  type={isConfirmPasswordVisible ? "text" : "password"}
                />

                <InputSlot
                  pr="$3"
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                >
                  {isConfirmPasswordVisible ? (
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

            <Button onPress={createUser}>
              <Text color="$textLight0">Criar</Text>
            </Button>

            <Link style={styles.withoutLoginText} href="/">
              Continuar sem Login
            </Link>

            <Link style={styles.withoutLoginText} href="/signin">
              Entre
            </Link>
          </FormControl>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
