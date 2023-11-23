export enum GENDER {
  Male = "male",
  Female = "female",
  Other = "other",
}

type TUser = {
  id: number;
  name: string;
  cpf: string;
  phone?: string;
  email: string;
  password: string;
  gender: GENDER;
};

export default TUser;
