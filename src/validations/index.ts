import * as yup from "yup";

export const userSchema = yup.object().shape({
  cpf: yup
    .string()
    .required("O CPF é obrigatório")
    .length(11, "O CPF deve ter 11 dígitos"),
  name: yup
    .string()
    .required("O nome é obrigatório")
    .min(2, "Nome muito curto"),
  email: yup
    .string()
    .email("Email precisa ser válido")
    .required("O email é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
  gender: yup.string().required("O gênero é obrigatório"),
});

export const companySchema = yup.object().shape({
  name: yup
    .string()
    .required("O nome é obrigatório")
    .min(2, "Nome muito curto"),
  cnpj: yup
    .string()
    .required("O CNPJ é obrigatório")
    .length(14, "O CNPJ deve ter 14 dígitos"),
  phone: yup.string(),
  email: yup
    .string()
    .required("O domínio é obrigatório")
    .min(2, "Domínio muito curto"),
  password: yup.string().required("A senha é obrigatória"),
});
