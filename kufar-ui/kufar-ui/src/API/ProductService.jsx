import axios from "axios";
import AbstractService from "./UserService";

export default class ProductService extends AbstractService {

  static async getAllProducts(limit = 10, page = 1) {
    return await AbstractService.getAll(limit, page, "/product")
  }

  static async findProductById(id) {
    return await AbstractService.findById("/product", id);
  }
}
