import Api from '@/services/Api'

export default {
  getPantry () {
    return Api().get(`getPantry`)
  },
  addItemToPantry (params) {
    return Api().post(`pantry/add_item`, params)
  },
  editItemInPantry (id, params) {
    return Api().put(`pantry/edit_item/${id}`, params)
  },
  deleteItemFromPantry (id) {
    return Api().delete(`pantry/remove_item/${id}`)
  }
}
