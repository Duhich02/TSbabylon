<template>
  <div class="q-pa-md">
    <div class="q-buttons">
      <q-btn @click="enablePositionGizmoBtn" :color="radio === 'position' ? 'primary' : 'secondary'" icon="open_with" label="Перемещение" />
      <q-btn @click="enableRotationGizmoBtn" :color="radio === 'rotation' ? 'primary' : 'secondary'" icon="rotate_right" label="Вращение" />
      <q-btn @click="enableScaleGizmoBtn" :color="radio === 'scaling' ? 'primary' : 'secondary'" icon="zoom_out_map" label="Масштабирование" />
      <q-btn @click="initializeGizmoManagerBtn" :color="radio === 'cursor' ? 'primary' : 'secondary'" icon="mouse" label="Курсор" />
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import {mapGetters, useStore} from 'vuex';
// import {EditorScene} from "../scenes/MirEditor";

export default {

  components: {
  },

  data() {
    return {
      store: useStore(),
      radio: ref("cursor"),
      // eScene: EditorScene,
    }
  },

  computed: {
    ...mapGetters({eSceneInstance: 'basicSceneInstance/GET_EDITORSCENE_INSTANCE'}),
  },

  mounted() {
    console.log(this.eSceneInstance)
    // this.eScene = this.eSceneInstance
    console.log(this.store.state.EditorSceneInstance)
  },

  methods: {
    enablePositionGizmoBtn() {
      console.log(this.eScene)
      this.eSceneInstance.enablePositionGizmo()
      this.radio = "position";
    },
    enableRotationGizmoBtn() {
      this.eSceneInstance.enableRotationGizmo()
      this.radio = "rotation";
    },
    enableScaleGizmoBtn() {
      this.eSceneInstance.enableScaleGizmo()
      this.radio = "scaling";
    },
    initializeGizmoManagerBtn() {
      this.radio = "cursor";
    },
  },
}
</script>
