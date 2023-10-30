import axios from "../api";

import { TLogin, TUser } from "../types";
import { GENDER } from "../types/TUser";

const basePath = "/users/login";

class LoginService {
  async login(user: TLogin) {
    return await axios.post(basePath, user, {
      withCredentials: false,
    });
  }

  async getMe(token: string): Promise<TUser | null> {
    await axios.get("/health");

    return {
      cpf: "123",
      email: "kenzo@gmail",
      gender: GENDER.Male,
      id: 1,
      name: "Kenzo",
      password: "123",
    } as TUser;
  }
}

export default new LoginService();
