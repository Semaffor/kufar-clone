import axios from "axios";

export default class AbstractService {

  static blayt = "http://localhost:8080/api/v1"

  static async getAll(limit = 10, page = 1, filter, order, uri) {
    return await axios.get(AbstractService.blayt + uri, {
      params: {
        _limit: limit,
        _page: page,
        filter: filter,
        order
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
    console.log(JSON.stringify(object))
    return await axios.post(AbstractService.blayt + uri, JSON.stringify(object), {
      headers: {
        'content-type': 'application/json',
        'charset':'utf-8'
      }
    });
  }

  static async put(uri, object) {
    console.log(JSON.stringify(object))
    return await axios.put(AbstractService.blayt + uri, JSON.stringify(object), {
      headers: {
        'content-type': 'application/json',
        'charset':'utf-8'
      }
    });
  }

  static async get(uri) {
    console.log(uri)
    return await axios.get(AbstractService.blayt + uri);
  }


}
