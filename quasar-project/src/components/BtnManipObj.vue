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
import {EditorScene} from "../scenes/MirEditor";

export default {
  components: {
  },
  data() {
    return {
      store: useStore(),
      radio: ref("position"),
      eScene: EditorScene,
    }
  },
  computed: {
    ...mapGetters({eSceneInstance: 'GET_EDITORSCENE_INSTANCE'}),
  },
  mounted() {
    this.eScene = this.eSceneInstance
  },
  methods: {
    enablePositionGizmoBtn() {
      this.eScene.enablePositionGizmo()
      this.radio = "position";
    },
    enableRotationGizmoBtn() {
      this.eScene.enableRotationGizmo()
      this.radio = "rotation";
    },
    enableScaleGizmoBtn() {
      this.eScene.enableScaleGizmo()
      this.radio = "scaling";
    },
    initializeGizmoManagerBtn() {
      this.radio = "cursor";
    },
  },
}
</script>
