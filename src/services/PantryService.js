import Api from '@/service/Api'

export default {
  getPantry (email) {
    return Api().get(`pantry/${email}`)
  }
}
