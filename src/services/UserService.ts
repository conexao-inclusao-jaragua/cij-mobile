import axios from "../api";

import { TUserForm } from "../types";

const basePath = "/users";

class UserService {
  async create(user: TUserForm) {
    const { cpf, email, gender, name, password, phone } = user;

    return await axios.post(basePath, {
      cpf,
      gender,
      name,
      phone,
      user: { email, password },
    });
  }

  async getUserByToken(token: string) {
    return await axios.post("/get-user-data", { token });
  }
}

export default new UserService();
