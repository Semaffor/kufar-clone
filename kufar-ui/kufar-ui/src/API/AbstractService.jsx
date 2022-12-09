import axios from "axios";

export default class AbstractService {

  static ref = "/api/v1";

  static async getAll(limit = 10, page = 1, uri) {
    return await axios.get(AbstractService.ref + uri, {
      params: {
        _limit: limit,
        _page: page
      }
    })
  }

  static async findById(uri, id) {
    return await axios.get(AbstractService.ref + uri + "/" + id);
  }
}
