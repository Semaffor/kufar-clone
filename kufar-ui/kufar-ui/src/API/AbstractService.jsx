import axios from "axios";

export default class AbstractService {

  static blayt = "http://localhost:8080/api/v1"

  static async getAll(limit = 10, page = 1, filter, uri) {
    return await axios.get(AbstractService.blayt + uri, {
      params: {
        _limit: limit,
        _page: page,
        filter: filter
      }
    })
  }

  static async findAll(uri) {
    const response = await axios.get(AbstractService.blayt + uri);
    return response.data
  }

  static async findById(uri, id) {
    return await axios.get(AbstractService.blayt + uri + "/" + id);
  }

  static async save(uri, object) {
    console.log(object)
    return await axios.post(AbstractService.blayt + uri, JSON.stringify(object), {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  static async post(uri, object) {
    console.log(object)
    return await axios.post(AbstractService.blayt + uri, JSON.stringify(object), {
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
