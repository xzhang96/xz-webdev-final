<template>
<div>
    <br>
    <h1 class="font-weight-bold display-1">Search By Dish Results</h1>
    <br>
    <v-divider/>
    <v-alert dense outlined type="error" v-if="error !== null">{{error}}</v-alert>
    <br>
    <v-item-group>
    <v-container>
      <v-row>
        <v-col
          v-for="result in results"
          :key="result.id"
          cols="12"
          md="4"
        >
          <v-item>
            <v-card
              class="elevation-2 mx-auto"
            >
              <v-img
                :src=result.image
                width="100%"
                class="align-end"
              >
              </v-img>
              <v-card-title>
                {{result.title}}
              </v-card-title>
              <v-card-text>
                • Score: {{result.spoonacularScore}}<br>
                • Ready in Minutes: {{result.readyInMinutes}}<br>
                • Servings: {{result.servings}}
              </v-card-text>
              <v-card-actions>
              <v-btn
                color="primary lighten-2"
                text
                @click="explore(result.id)"
              >
                Explore
              </v-btn>
            </v-card-actions>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</div>
</template>

<script>
import SearchService from '@/services/SearchService'
export default {
  data () {
    return {
      error: null,
      results: []
    }
  },
  methods: {
    explore (id) {
      this.$router.push({
        name: 'recipe',
        query: {id: id}
      })
    }
  },
  mounted: async function () {
    try {
      const response = await SearchService.searchByDish(this.$route.query)
      this.results = response.data.results
    } catch (error) {
      this.error = error.response.data.error
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-card {
  text-align: left;
}
</style>
