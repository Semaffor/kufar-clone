import axios from "axios";
import AbstractService from "./AbstractService";

export default class UserService extends AbstractService {

  static async findUserById(id) {
    return await AbstractService.findById("/user", id);
  }
}