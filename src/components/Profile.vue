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
        <br/>
        <div class="error" v-html="error"/>
        <v-data-table
          v-if="pantry !== null"
          :headers="headers"
          :items="pantry"
          class="elevation-2 pantry"
          :search="search"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            label="Item name"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.category"
                            label="Category"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.quantity"
                            label="Quantity"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.unit"
                            label="Unit"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-sheet>

      <v-sheet v-if="this.active === 'My Recipes'">
        <h1>My Recipes</h1>
        <v-divider/>
      </v-sheet>

      <v-sheet v-if="this.active === 'My Account'">
        <v-row>
        <h1>My Account Information</h1>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small class="mr-2">mdi-pencil</v-icon>Edit Account Info
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Edit User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="First Name"
                      v-model="editedInfo.firstName"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Last Name"
                      v-model="editedInfo.lastName"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Email"
                      v-model="editedInfo.email"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Password*"
                      required
                      type="password"
                      v-model="editedInfo.password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="updateInfo()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-row>
        <br/>
        <div class="error" v-html="error"/>
        <v-card width="70%">
          <v-card-text>
            <v-row>
              <v-col>
                First Name
              </v-col>
              <v-col>
                {{$store.state.user.firstName}}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Last Name
              </v-col>
              <v-col>
                {{$store.state.user.lastName}}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Email
              </v-col>
              <v-col>
                {{$store.state.user.email}}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
  </v-container>
</div>
</template>

<script>
import PantryService from '@/services/PantryService'
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      items: [
        { title: 'My Pantry', icon: 'mdi-basket' },
        { title: 'My Recipes', icon: 'mdi-book-open-variant' },
        { title: 'My Account', icon: 'mdi-account' }
      ],
      active: 'My Pantry',
      error: null,
      pantry: null,
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Item',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Category', value: 'category' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Unit', value: 'unit' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        category: '',
        quantity: null,
        unit: ''
      },
      defaultItem: {
        name: '',
        category: '',
        quantity: null,
        unit: ''
      },
      editedInfo: {
        firstName: this.$store.state.user.firstName,
        lastName: this.$store.state.user.lastName,
        email: this.$store.state.user.email,
        password: null
      }
    }
  },
  methods: {
    changeItem (item) {
      this.active = item
    },
    editItem (item) {
      this.editedIndex = this.pantry.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.pantry.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm () {
      try {
        await PantryService.deleteItemFromPantry(this.editedItem.id)
        window.location.reload()
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async save () {
      if (this.editedIndex > -1) {
        try {
          await PantryService.editItemInPantry(this.editedItem.id, {
            name: this.editedItem.name,
            category: this.editedItem.category,
            quantity: this.editedItem.quantity,
            unit: this.editedItem.unit,
            UserId: this.$store.state.user.id
          })
          window.location.reload()
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        try {
          await PantryService.addItemToPantry({
            name: this.editedItem.name,
            category: this.editedItem.category,
            quantity: this.editedItem.quantity,
            unit: this.editedItem.unit,
            UserId: this.$store.state.user.id
          })
          window.location.reload()
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    },
    async updateInfo () {
      if (this.editedInfo.password === null) {
        alert('You must enter a password to edit your account info!')
      } else {
        try {
          const response = await AuthenticationService.editProfile({
            firstName: this.editedInfo.firstName,
            lastName: this.editedInfo.lastName,
            email: this.editedInfo.email,
            password: this.editedInfo.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.close()
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  },
  mounted: async function () {
    try {
      const response = await PantryService.getPantry()
      this.pantry = response.data
    } catch (error) {
      this.error = error.response.data.error
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h3{
  text-align: left;
}
.pantry {
  padding: 25px;
}
</style>
