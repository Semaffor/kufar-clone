import AbstractService from "./AbstractService";

export default class CategoryService extends AbstractService {

  static async getAllCategories() {
    return await AbstractService.findAll("/category")
  }
}