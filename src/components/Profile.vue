<template>
<div>
  <v-container>
  <v-row no-gutters>
    <v-col
      cols="3">
  <v-card height="100vh" width="15vw">
    <v-navigation-drawer
      permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Hi, {{$store.state.user.firstName}}!
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="changeItem(item.title)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </v-card>
    </v-col>
    <v-col class="content" cols="9">
      <br>
      <v-sheet v-if="this.active === 'My Pantry'">
        <h1>My Pantry</h1>
        <v-divider/>
        <v-btn>

        </v-btn>
      </v-sheet>

      <v-sheet v-if="this.active === 'My Recipes'">
        <h1>My Recipes</h1>
        <v-divider/>
      </v-sheet>

      <v-sheet v-if="this.active === 'My Account'">
        <h1>My Account</h1>
        <v-divider/>
      </v-sheet>
    </v-col>
  </v-row>
  </v-container>
</div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'My Pantry', icon: 'mdi-basket' },
        { title: 'My Recipes', icon: 'mdi-book-open-variant' },
        { title: 'My Account', icon: 'mdi-account' }
      ],
      active: 'My Pantry'
    }
  },
  methods: {
    changeItem (item) {
      this.active = item
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h3{
  text-align: left;
}
</style>
