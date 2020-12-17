import Api from '@/services/Api';

export default {
    getRecipes() {
        return Api().get(`getRecipes`);
    },
    saveRecipe(params) {
        return Api().post(`recipe/saveRecipe`, params);
    },
    removeRecipe(id) {
        return Api().delete(`recipe/removeRecipe/${id}`);
    },
};
