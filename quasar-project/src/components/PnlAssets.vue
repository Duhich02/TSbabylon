<template>
  <q-footer class="bg-grey-5" style="height: 150px;">
    <q-toolbar>
      <ul>
        <li v-for="(fileName, index) in fileNames" :key="index" @click="addObjectToScene(fileName)">
          {{ fileName }}
        </li>
      </ul>
    </q-toolbar>
  </q-footer>
</template>

<script>
import {mapGetters, useStore} from 'vuex';
import { ref } from 'vue';
export default {
  components: {
  },
  data() {
    return {
      store: useStore(),
      fileNames: [],

    }
  },
  computed: {
    // ...mapGetters({EditorScene: 'GET_EDITORSCENE_INSTANCE'}),
    // ...mapGetters({fileNames: 'ADD_OBJECT_TO_SCENE'}),

    // doneTodosCount () {
    //   return this.$store.getters.ADD_OBJECT_TO_SCENE
    // }
  },
  mounted() {
    // this.addObjectToScene(filesName)
    // console.log(filesName)
  },
  methods: {
    // addObjectToScene(filesName){
    //   const fileNames = store.commit('ADD_OBJECT_TO_SCENE', filesNames); //mutation
    },
}

</script>

<style scoped>

</style>
