import axios from "../api";

import { TLogin } from "../types";

const basePath = "/login";

class LoginService {
  async login(user: TLogin) {
    return await axios.post(basePath, user, {
      withCredentials: false,
    });
  }
}

export default new LoginService();
