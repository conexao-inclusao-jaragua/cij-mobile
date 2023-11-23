import axios from "../api";

import { TLogin, TUser } from "../types";
import { GENDER } from "../types/TUser";

const basePath = "/login/user";

class LoginService {
  async login(user: TLogin) {
    return await axios.post(basePath, user, {
      withCredentials: false,
    });
  }

  async getMe(token: string) {
    return await axios.post("/get-user-data", { token });
  }
}

export default new LoginService();
