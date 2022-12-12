import AbstractService from "./UserService";

export default class ProductService extends AbstractService {

  static async getAllProducts(limit = 10, page = 1, filter="", order) {
    return await AbstractService.getAll(limit, page, filter, order, "/product")
  }

  static async findProductById(id) {
    return await AbstractService.findById("/product", id);
  }

  static async saveProduct(product) {
    return await AbstractService.save("/product", product);
  }
}
