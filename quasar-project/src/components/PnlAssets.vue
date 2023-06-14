<template>
  <q-footer class="bg-grey-5" style="height: 150px;">
    <q-toolbar>
      <ul style="display:flex; flex-direction: row-reverse; color: black; flex-wrap: wrap">
        <li style="padding: 0 25px 0 0;" v-for="(fileName, index) in storeFileName" :key="index" @click="addObjectToScene(fileName)">
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
    }
  },
  computed: {
    ...mapGetters({storeFileName: 'basicSceneInstance/ADD_OBJECT_TO_SCENE'}),
    ...mapGetters({eSceneInstance: 'basicSceneInstance/GET_EDITORSCENE_INSTANCE'}),
  },
  mounted() {
  },
  methods: {
    addObjectToScene(fileName) {
      console.log(fileName)
      this.eSceneInstance.TSaddObjectToScene(fileName)
    }
  },
}

</script>

<style scoped>

</style>
