<template>
<div>
  <v-alert dense outlined type="error" v-if="error !== null">{{error}}</v-alert>
  <v-card v-if="recipe !== null">
    <v-row>
      <v-col cols="3">
        <v-navigation-drawer
          absolute
          permanent
          left
          app
          v-if="this.$vuetify.breakpoint.mdAndUp"
        >
          <v-img :src=recipe.image width="100%">
          </v-img>
          <v-list dense>
            <v-list-item>
              <v-btn
                v-if="this.$store.state.isUserLoggedIn"
                fab
                small
                block
                rounded
                color="teal"
                @click="save"
                :disabled="saved"
              >
                <v-icon>mdi-heart-plus</v-icon>&nbsp;
                <h3>Save</h3>
              </v-btn>
            </v-list-item>
            <br>
            <v-list-item>
              <div>Rating: {{recipe.spoonacularScore}}</div>
            </v-list-item>
            <v-list-item>
              <div>Health Score: {{recipe.healthScore}}</div>
            </v-list-item>
            <v-list-item>
              <div>Servings: {{recipe.servings}}</div>
            </v-list-item>
            <v-list-item>
              <div>Ready in Minutes: {{recipe.readyInMinutes}}</div>
            </v-list-item>
            <v-list-item>
              <div>
                <v-icon v-if="recipe.vegetarian">mdi-check</v-icon>
                <v-icon v-if="!recipe.vegetarian">mdi-close</v-icon>
                &nbsp;Vegetarian
              </div>
            </v-list-item>
            <v-list-item>
              <div>
                <v-icon v-if="recipe.vegan">mdi-check</v-icon>
                <v-icon v-if="!recipe.vegan">mdi-close</v-icon>
                &nbsp;Vegan
              </div>
            </v-list-item>
            <v-list-item>
              <div>
                <v-icon v-if="recipe.glutenFree">mdi-check</v-icon>
                <v-icon v-if="!recipe.glutenFree">mdi-close</v-icon>
                &nbsp;Gluten Free
              </div>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="9">
        <br>
        <h1 class="font-weight-bold display-1">{{recipe.title}}</h1>
        <v-alert dense outlined type="error" v-if="error !== null">{{error}}</v-alert>
        <br>
        <div class="content">
          <h2>Summary:</h2>
          <v-divider/>
          <br>
          <p v-html="recipe.summary"></p>
          <br>
          <h2>Ingredients:</h2>
          <v-divider/>
          <br>
          <template>
            <v-data-table
              :headers="ingredientsHeaders"
              :items="recipe.extendedIngredients"
              :items-per-page="6"
              class="elevation-1"
            ></v-data-table>
          </template>
          <br>
          <br>
          <h2>Instructions</h2>
          <v-divider/>
          <br>
          <v-list v-if="this.recipe.analyzedInstructions.length !== 0">
            <template v-for="(step, index) in recipe.analyzedInstructions[0].steps">
              <v-list-item :key="index">
                <v-list-item-content>
                <h3 class="instruction-title" v-html="step.number + `. ` + step.step"></h3>
                <div class="content">Ingredients:
                  <template v-for="(ingredient, index) in step.ingredients">
                    <v-chip :key="index" outlined color="teal" small>
                      {{ingredient.name}}
                    </v-chip>&nbsp;
                  </template>
                </div>
                <div class="content">Equipments:
                  <template v-for="(equipment, index) in step.equipment">
                    <v-chip :key="index" outlined color="teal" small>
                      {{equipment.name}}
                    </v-chip>&nbsp;
                  </template>
                </div>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </div>
      </v-col>
    </v-row>
  </v-card>
</div>
</template>

<script>
import RecipeService from '@/services/RecipeService'
import SearchService from '@/services/SearchService'
export default {
  data () {
    return {
      ingredientsHeaders: [
        {text: 'Name', value: 'originalName'},
        {text: 'Category', value: 'aisle'},
        {text: 'Amount', value: 'amount'},
        {text: 'Unit', value: 'unit'}
      ],
      recipe: null,
      error: null,
      saved: false
    }
  },
  methods: {
    async save () {
      try {
        await RecipeService.saveRecipe({
          title: this.recipe.title,
          spoonId: this.recipe.id,
          image: this.recipe.image,
          UserId: this.$store.state.user.id
        })
        this.saved = true
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  mounted: async function () {
    try {
      const response = await SearchService.getRecipe(this.$route.query.id)
      this.recipe = response.data
      if (this.$store.state.isUserLoggedIn) {
        const saveResponse = await RecipeService.getRecipes()
        let recipe
        for (recipe of saveResponse.data) {
          if (recipe.spoonId === this.recipe.id) {
            this.saved = true
            break
          }
        }
      }
    } catch (error) {
      this.error = error.response.data.error
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  text-align: left;
  padding: 10px;
}
.instruction-title {
  width: 100%;
}
</style>
