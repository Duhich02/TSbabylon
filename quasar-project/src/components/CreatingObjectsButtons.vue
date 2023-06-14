<template>
  <div class="q-pa-md">
    <q-btn-dropdown bg-grey-4 label="+">
      <q-icon name="search" @click.stop.prevent />
      <q-list style="display: flex; flex-direction: column">
        <q-btn-dropdown bg-grey-4 label="Добавить 3D объект">

          <q-item clickable v-close-popup @click="createCube">
            <q-item-section>
              <q-item-label>Куб</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="createSphere">
            <q-item-section>
              <q-item-label>Сфера</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="createCylinder">
            <q-item-section>
              <q-item-label>Цилиндр</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="createEmptyMesh">
            <q-item-section>
              <q-item-label>пустота</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="createPlane">
            <q-item-section>
              <q-item-label>Плоскость</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="createGround">
            <q-item-section>
              <q-item-label>Площадка</q-item-label>
            </q-item-section>
          </q-item>
        </q-btn-dropdown>

        <q-btn-dropdown bg-grey-4 label="Добавить свет">

          <q-item clickable v-close-popup @click="createPointLight">
            <q-item-section>
              <q-item-label>PointLight</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="createDirectionalLight">
            <q-item-section>
              <q-item-label>DirectionalLight</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="createSpotLight">
            <q-item-section>
              <q-item-label>SpotLight</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="createHemisphericLight">
            <q-item-section>
              <q-item-label>HemisphericLight</q-item-label>
            </q-item-section>
          </q-item>

        </q-btn-dropdown>

        <q-btn-dropdown bg-grey-4 label="Добавить камеру">

          <q-item clickable v-close-popup @click="createFreeCamera">
            <q-item-section>
              <q-item-label>FreeCamera</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="createArcRotateCamera">
            <q-item-section>
              <q-item-label>ArcRotateCamera</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="createTargetCamera">
            <q-item-section>
              <q-item-label>TargetCamera</q-item-label>
            </q-item-section>
          </q-item>
        </q-btn-dropdown>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import {mapGetters, mapMutations, useStore} from "vuex";

export default {
  components: {
  },

  data() {
    return {
      store: useStore(),
    }
  },

  computed: {
    ...mapGetters({EditorScene: 'basicSceneInstance/GET_EDITORSCENE_INSTANCE'}),
  },

  mounted() {
  },

  methods: {
    createCube (){
      this.EditorScene.addCube()
    },
    createSphere(){
      this.EditorScene.addSphere()
    },
    createCylinder(){
      this.EditorScene.addCylinder()
    },
    createEmptyMesh(){
      this.EditorScene.addEmptyMesh()
    },
    createPlane(){
      this.EditorScene.addPlane();
    },
    createGround(){
      this.EditorScene.addGround();
    },
    createPointLight(){
      this.EditorScene.addPointLight();
    },
    createDirectionalLight(){
      this.EditorScene.addDirectionalLight();
    },
    createSpotLight(){
      this.EditorScene.addSpotLight();
    },
    createHemisphericLight(){
      this.EditorScene.addHemisphericLight();
    },
    createFreeCamera(){
      this.EditorScene.addFreeCamera();
    },
    createArcRotateCamera(){
      this.EditorScene.addArcRotateCamera();
    },
    createTargetCamera(){
      this.EditorSceneInstance.addTargetCamera();
    },
  },
}

</script>
