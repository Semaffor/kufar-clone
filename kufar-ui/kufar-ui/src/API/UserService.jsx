import AbstractService from "./AbstractService";
import axios from "axios";

export default class UserService extends AbstractService {

  static async findUserById(id) {
    return await AbstractService.findById("/user", id);
  }

  static async changeFavouriteStatus(postId, userId) {
    return await axios.put(AbstractService.blayt + "/user/addFavourite", {
      params: {
        productId: postId,
        userId: userId,
      }
    })
  }

  static async saveUser(newUser) {
    return await AbstractService.save("/user", newUser)
  }

  static async activateUser(uuid) {
    return await axios.get(AbstractService.blayt + "/user?code=" + uuid)
  }

  static async recoverPassword(values) {
    return await AbstractService.post("/user/recovery", values)
  }

  static async authInSystem(credentials) {
    return await AbstractService.post("/user/auth", credentials)
  }

  static async getAdvCount(vendorId) {
    return await AbstractService.get("/user/adv/"+vendorId)
  }

  static async findAllUsers() {
    return await AbstractService.findAll("/user/all");
  }
}