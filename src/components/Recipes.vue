<template>
<div>
    <v-layout justify-center row wrap>
      <v-flex xs6>
    <v-form>
    <v-text-field
      outlined
      label='Search your recipe'
      append-icon='search'
      v-model="recipe"
      click:append='searchRecipe'>
    </v-text-field>

    </v-form>
      </v-flex>
    </v-layout>

</div>
</template>

<script>
export default {
  data () {
    return {
      recipe: ''
    }
  },
  methods: {
    searchRecipe () {
      console.log('search recipe')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
