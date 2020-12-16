import Api from '@/services/Api'

export default {
  searchByDish (params) {
    return Api().get(`searchRecipes`, {params: params})
  },
  searchByIngredients (params) {
    return Api().get(`searchRecipesByIngredients`, {params: params})
  },
  getRecipe (id) {
    return Api().get(`getRecipesById/${id}`)
  },
  getInstruction (id) {
    return Api().get(`getInstructionsById/${id}`)
  }
}
