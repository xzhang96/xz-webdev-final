<template>
    <div>
        <br />
        <h1 class="font-weight-bold display-1">
            Search By Ingredients Results
        </h1>
        <br />
        <v-divider />
        <v-alert dense outlined type="error" v-if="error !== null">{{
            error
        }}</v-alert>
        <br />
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
                            <v-card class="elevation-2 mx-auto">
                                <v-img
                                    :src="result.image"
                                    width="100%"
                                    class="align-end"
                                >
                                </v-img>
                                <v-card-title>
                                    {{ result.title }}
                                    <v-spacer />
                                    <v-icon color="red">mdi-heart</v-icon
                                    >&nbsp;{{ result.likes }}
                                </v-card-title>
                                <v-card-text>
                                    <v-list>
                                        <v-list-item>
                                            <h4>
                                                Used Ingredients From
                                                Query:&nbsp;
                                            </h4>
                                            <div class="content">
                                                <template
                                                    v-for="usedIngredient in result.usedIngredients"
                                                >
                                                    <v-chip
                                                        :key="usedIngredient.id"
                                                        outlined
                                                        color="teal"
                                                        small
                                                    >
                                                        {{
                                                            usedIngredient.name
                                                        }} </v-chip
                                                    >&nbsp;
                                                </template>
                                            </div>
                                        </v-list-item>
                                        <v-list-item>
                                            <h4>Missed Ingredients:&nbsp;</h4>
                                            <div class="content">
                                                <template
                                                    v-for="missedIngredient in result.missedIngredients"
                                                >
                                                    <v-chip
                                                        :key="
                                                            missedIngredient.id
                                                        "
                                                        outlined
                                                        color="teal"
                                                        small
                                                    >
                                                        {{
                                                            missedIngredient.name
                                                        }} </v-chip
                                                    >&nbsp;
                                                </template>
                                            </div>
                                        </v-list-item>
                                    </v-list>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        color="teal"
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
import SearchService from '@/services/SearchService';
export default {
    data() {
        return {
            error: null,
            results: [],
        };
    },
    methods: {
        explore(id) {
            this.$router.push({
                name: 'recipe',
                query: { id: id },
            });
        },
    },
    mounted: async function () {
        try {
            const response = await SearchService.searchByIngredients(
                this.$route.query
            );
            this.results = response.data;
        } catch (error) {
            this.error = error.response.data.error;
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-card {
    text-align: left;
}
.v-list {
    padding-left: -5px;
}
</style>
