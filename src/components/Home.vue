<template>
<div>
    <br/>
    <h1 class="font-weight-bold display-1">
      Get Your Favorite Recipe Here!
    </h1>
    <br/>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
    >
      <v-tab>
        <h3>Search By Dish</h3>
      </v-tab>
      <v-tab>
        <h3>Search By Ingredients</h3>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <br/>
        <v-card
          class="mx-auto"
          width="70%"
        >
          <img
            width="100%"
            class="white--text align-end"
            src="../assets/food3.png"
          />
          <v-card-text>
            <v-form ref="searchItem">
              <v-text-field
                outlined
                label='Search By Dish*'
                append-icon='search'
                v-model="query"
                required
              >
              </v-text-field>
              <v-row>
                <v-col>
                  <v-select
                    v-model="cuisineValue"
                    :items="cuisineItems"
                    chips
                    label="Cuisine"
                    multiple
                    outlined
                    attach
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    v-model="typeValue"
                    :items="typeItems"
                    chips
                    label="Type"
                    multiple
                    outlined
                    attach
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    outlined
                    label='Max Ready Time (in minutes)'
                    v-model="maxReadyTime"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-select
                    v-model="pantryValue"
                    :items="pantryItems"
                    chips
                    label="Items From Pantry (Only for logged in users)"
                    multiple
                    outlined
                    attach
                    :disabled="$store.state.isUserLoggedIn === false"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    v-model="dietValue"
                    :items="dietItems"
                    chips
                    label="Diet"
                    outlined
                    attach
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    v-model="intoleranceValue"
                    :items="intoleranceItems"
                    chips
                    label="Intolerance"
                    multiple
                    outlined
                    attach
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
            <div>*indicates required field</div>
          </v-card-text>
          <v-card-actions class="action">
            <v-btn
              @click="submitSearchItem">
              Search
            </v-btn>
            <v-btn @click="clearSearchItem">
              Clear
            </v-btn>
            <br>
            <br>
          </v-card-actions>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <br/>
        <v-card
          class="mx-auto"
          width="70%"
        >
          <img
            width="100%"
            class="white--text align-end"
            src="../assets/ingredients6.png"
          />
          <v-card-text>
            <v-combobox
              v-model="ingredients"
              :items="pantryItems"
              chips
              clearable
              label="Search By Ingredients*"
              multiple
              prepend-icon="mdi-filter-variant"
              solo
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="remove(item)"
                >
                  <strong>{{ item }}</strong>&nbsp;
                  <span v-if="pantryItems.includes(item)">(From pantry)</span>
                </v-chip>
              </template>
            </v-combobox>
            <div>*indicates required field</div>
          </v-card-text>
          <v-card-actions class="action">
            <v-btn
              @click="submitSearchIngredients">
              Search
            </v-btn>
            <v-btn @click="clearSearchIngredients">
              Clear
            </v-btn>
            <br>
            <br>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
</div>
</template>

<script>
import PantryService from '@/services/PantryService'
export default {
  data () {
    return {
      error: null,
      query: '',
      tab: null,
      cuisineValue: [],
      cuisineItems: ['American', 'Cajun', 'Chinese', 'European', 'French', 'Indian', 'Italian', 'Japanese', 'Korean', 'Latin Amerian', 'Mediterranean', 'Mexican', 'Thai', 'Vietnamese'],
      typeValue: [],
      typeItems: ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'breakfast', 'beverage', 'soup'],
      maxReadyTime: 60,
      pantryValue: [],
      pantryItems: [],
      dietValue: null,
      dietItems: ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Vegan', 'Lacto-Vegetarian', 'None'],
      intoleranceValue: [],
      intoleranceItems: ['Dairy', 'Peanut', 'Soy', 'Egg', 'Seafood', 'Gluten', 'Shellfish', 'Sesame'],
      ingredients: null
    }
  },
  methods: {
    async submitSearchItem () {
      if (this.query === null) {
        alert('Please enter a query item!')
      }
      if (this.dietValue === 'None') {
        this.dietValue = null
      }
      let searchJson = {
        query: this.query,
        cuisine: this.cuisineValue.join(),
        type: this.typeValue.join(),
        maxReadyTime: this.maxReadyTime,
        includeIngredients: this.pantryValue.join(),
        diet: this.dietValue,
        intolerances: this.intoleranceValue.join(),
        addRecipeInformation: true
      }
      this.$router.push({
        name: 'searchDishResult',
        query: searchJson
      })
    },
    clearSearchItem () {
      this.query = null
      this.cuisineValue = []
      this.typeValue = []
      this.maxReadyTime = 60
      this.pantryValue = []
      this.dietValue = null
      this.intoleranceValue = []
    },
    async submitSearchIngredients () {
      if (this.ingredients === null) {
        alert('Please input at least one ingredient!')
      }
      this.$router.push({
        name: 'searchIngredientsResult',
        query: {ingredients: this.ingredients.join()}
      })
    },
    clearSearchIngredients () {
      this.ingredients = null
    },
    remove (item) {
      this.ingredients.splice(this.ingredients.indexOf(item), 1)
      this.ingredients = [...this.ingredients]
    }
  },
  mounted: async function () {
    if (this.$store.state.isUserLoggedIn) {
      try {
        const response = await PantryService.getPantry()
        response.data.map(item => {
          this.pantryItems.push(item.name)
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.action {
  padding-left: 40%;
}
</style>
