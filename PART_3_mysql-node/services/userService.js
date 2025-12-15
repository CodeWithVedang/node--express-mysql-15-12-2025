import bcrypt from "bcryptjs";
import { UserModel } from "../models/userModel.js";

export const UserService = {
  async createUser(data) {
    const hashed = await bcrypt.hash(data.password, 10);
    const id = await UserModel.createUser(
      data.name,
      data.username,
      hashed,
      data.role
    );
    return id;
  },

  async updateUser(id, data) {
    await UserModel.updateUser(id, data.name, data.role, data.status);
  }
};
