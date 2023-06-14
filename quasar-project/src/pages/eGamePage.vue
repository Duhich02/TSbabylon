<template>
  <div class="q-pa-none">
    <q-layout view="hHh Lpr lff" container style="height: 750px">
      <pnl-comands/>
      <pnl-inspect/>
      <pnl-objects/>
      <canvas width="1280" height="700" ref="eCanvas"/>
      <pnl-assets/>
    </q-layout>
  </div>
</template>

<script>
import PnlComands from "../components/PnlComands";
import PnlInspect from "../components/PnlInspect";
import PnlObjects from "../components/PnlObjects";
import PnlAssets from "../components/PnlAssets";
import {EditorScene} from 'src/scenes/MirEditor';
import {mapActions, useStore} from 'vuex';


export default {
  components: {
    PnlComands,
    PnlInspect,
    PnlObjects,
    PnlAssets,
  },
  data() {
    return {
      eScene: EditorScene,
      name: '',
      store: useStore(),
    }
  },
  computed: {

  },
  methods: {
    ...mapActions({setInstanceScene: 'basicSceneInstance/SET_EDITORSCENE_INSTANCE'}),
  },
  mounted() {
    this.eScene =  new EditorScene(this.$refs.eCanvas)

    this.setInstanceScene(this.eScene)
  },
}


  // const activeButton = computed(() => {
  //   console.log("activeButton" + activeButton)
  //   return store.getters.GET_ACTIVE_BUTTONS;
  // });
  //
  // const addObjectToScene = () => {
  //
  // }
  //
  //
  // //export
  // const enableGizmoBtn = () => {
  //   switch (activeButton.value) {
  //     case 'position':
  //       console.log(basicSceneInstance);
  //       basicScene?.enableGizmo(scene?.gizmoManager, 'position');
  //       break;
  //     case 'rotation':
  //       basicScene?.enableGizmo(scene?.gizmoManager, 'rotation');
  //       break;
  //     case 'scaling':
  //       basicScene?.enableGizmo(scene?.gizmoManager, 'scaling');
  //       break;
  //     default:
  //       break;
  //   }
  // };
  //
  //
  // const createdItem = computed(() => {
  //   console.log("createdItem" + createdItem)
  //   return store.getters.GET_CREATED_ITEM;
  // });
  //
  // //cut
  // const handleCreatedItem = (createdItem) => {
  //   switch (createdItem) {
  //     case 'Куб':
  //       basicScene.addCube(basicScene);
  //       break;
  //     case 'Сфера':
  //       basicScene.addSphere(basicScene);
  //       break;
  //     case 'Цилиндр':
  //       basicScene.addCylinder(basicScene);
  //       break;
  //     case 'пустота':
  //       basicScene.addEmptyMesh(basicScene);
  //       break;
  //     case 'Плоскость':
  //       basicScene.addPlane(basicScene);
  //       break;
  //     case 'Площадка':
  //       basicScene.addGround(basicScene);
  //       break;
  //     case 'PointLight':
  //       basicScene.addPointLight(basicScene);
  //       break;
  //     case 'DirectionalLight':
  //       basicScene.addDirectionalLight(basicScene);
  //       break;
  //     case 'SpotLight':
  //       basicScene.addSpotLight(basicScene);
  //       break;
  //     case 'HemisphericLight':
  //       basicScene.addHemisphericLight(basicScene);
  //       break;
  //     case 'FreeCamera':
  //       basicScene.addFreeCamera(basicScene);
  //       break;
  //     case 'ArcRotateCamera':
  //       basicScene.addArcRotateCamera(basicScene);
  //       break;
  //     case 'TargetCamera':
  //       basicScene.addTargetCamera(basicScene);
  //       break;
  //     default:
  //       break;
  //   }

// handleCreatedItem(createdItem.value);



</script>

<style scoped>

</style>
