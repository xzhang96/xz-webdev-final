import Api from '@/services/Api'

export default {
  getPantry () {
    return Api().get(`getPantry`)
  },
  addItemToPantry (params) {
    return Api().post(`pantry/addItem`, params)
  },
  editItemInPantry (id, params) {
    return Api().put(`pantry/editItem/${id}`, params)
  },
  deleteItemFromPantry (id) {
    return Api().delete(`pantry/removeItem/${id}`)
  }
}
