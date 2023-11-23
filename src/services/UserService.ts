import axios from "../api";
import { TUser } from "../types";

const basePath = "/users";

class UserService {
  async create(user: Omit<TUser, "id">) {
    return await axios.post(`${basePath}/create`, user, {
      withCredentials: false,
    });
  }
}

export default new UserService();
