<template>
  <div>
    <div class="input-columns">
      <div class="input-column">
        <div class="q-pb-lg">Расположение</div>
        <div class="q-pb-lg">Поворот</div>
        <div class="q-pb-lg">Размер</div>
      </div>

      <div class="input-column">
        <q-input class="input-column" filled v-model="locationX" @input="" label="X" dense />
        <q-input class="input-column" filled v-model="rotationX" label="X" dense />
        <q-input class="input-column" filled v-model="ScaleX" label="X" dense />
      </div>

      <div class="input-column">
        <q-input class="input-column" filled v-model="locationY" label="Y" dense />
        <q-input class="input-column" filled v-model="rotationY" label="Y" dense />
        <q-input class="input-column" filled v-model="ScaleY" label="Y" dense />
      </div>

      <div class="input-column">
        <q-input class="input-column" filled v-model="locationZ" label="Z" dense />
        <q-input class="input-column" filled v-model="rotationZ" label="Z" dense />
        <q-input class="input-column" filled v-model="ScaleZ" label="Z" dense />
      </div>
    </div>
  </div>
</template>

<script>
import {ref, watch} from "vue";
import {event as selectedObject} from "quasar";
import {mapGetters, useStore} from "vuex";
export default {
  components: {
  },
  data() {
    return {
      store: useStore(),
      radio: ref("cursor"),
      locationX: ref(0),
      locationY: ref(0),
      locationZ: ref(0),
      rotationX: ref(0),
      rotationY: ref(0),
      rotationZ: ref(0),
      ScaleX: ref(0),
      ScaleY: ref(0),
      ScaleZ: ref(0),
    }
  },
  computed: {
    // ...mapGetters({EditorScene: 'GET_EDITORSCENE_INSTANCE'}),
  },
  mounted() {

  },
  methods: {
    // const locationX = ref(0);
    // const locationY = ref(0);
    // const locationZ = ref(0);
    // const rotationX = ref(0);
    // const rotationY = ref(0);
    // const rotationZ = ref(0);
    // const ScaleX = ref(0);
    // const ScaleY = ref(0);
    // const ScaleZ = ref(0);
  },
}



//todo lock ес будут проблемы
// watch(locationX, (value) => {
//   selectedObject.position.x = parseFloat(value);
// });
// watch(locationY, (value) => {
//   selectedObject.position.y = parseFloat(value);
// });
// watch(locationZ, (value) => {
//   selectedObject.position.z = parseFloat(value);
// });
// watch(rotationX, (value) => {
//   selectedObject.position.x = parseFloat(value);
// });
// watch(rotationY, (value) => {
//   selectedObject.position.y = parseFloat(value);
// });
// watch(rotationZ, (value) => {
//   selectedObject.position.z = parseFloat(value);
// });
// watch(ScaleX, (value) => {
//   selectedObject.position.x = parseFloat(value);
// });
// watch(ScaleY, (value) => {
//   selectedObject.position.y = parseFloat(value);
// });
// watch(ScaleZ, (value) => {
//   selectedObject.position.z = parseFloat(value);
// });

</script>

<style scoped>
.input-columns {
  display: flex;
}

.input-column {
  width: 90%;
  margin-right: 2px;
}
</style>
