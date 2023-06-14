<template>
  <div>
    <div class="input-columns">
      <div class="input-column">
        <div class="q-pb-lg">Расположение</div>
        <div class="q-pb-lg">Поворот</div>
        <div class="q-pb-lg">Размер</div>
      </div>

      <div class="input-column">
        <q-input class="input-column" @update:model-value="(arg)=>onChange(arg, 'locationX')" filled v-model="locationX" @input="" label="X" dense />
        <q-input class="input-column" @update:model-value="(arg)=>onChange(arg, 'rotationX')" filled v-model="rotationX" label="X" dense />
        <q-input class="input-column" @update:model-value="(arg)=>onChange(arg, 'ScaleX')" filled v-model="ScaleX" label="X" dense />
      </div>

      <div class="input-column">
        <q-input class="input-column" @update:model-value="(arg)=>onChange(arg, 'locationY')" filled v-model="locationY" label="Y" dense />
        <q-input class="input-column" @update:model-value="(arg)=>onChange(arg, 'rotationY')" filled v-model="rotationY" label="Y" dense />
        <q-input class="input-column" @update:model-value="(arg)=>onChange(arg, 'ScaleY')" filled v-model="ScaleY" label="Y" dense />
      </div>

      <div class="input-column">
        <q-input class="input-column" @update:model-value="(arg)=>onChange(arg, 'locationZ')" filled v-model="locationZ" label="Z" dense />
        <q-input class="input-column" @update:model-value="(arg)=>onChange(arg, 'rotationZ')" filled v-model="rotationZ" label="Z" dense />
        <q-input class="input-column" @update:model-value="(arg)=>onChange(arg, 'ScaleZ')" filled v-model="ScaleZ" label="Z" dense />
      </div>
    </div>
  </div>
</template>
//splice(0, deleteCount.length - 1)
<script>
import {ref, watch} from "vue";
import {mapGetters, useStore} from "vuex";
export default {
  components: {
  },
  data() {
    return {
      store: useStore(),
      locationX: ref(),
      locationY: ref(),
      locationZ: ref(),
      rotationX: ref(),
      rotationY: ref(),
      rotationZ: ref(),
      ScaleX: ref(),
      ScaleY: ref(),
      ScaleZ: ref(),
      changeProp: '',
    }
  },
  computed: {
    ...mapGetters({eSceneInstance: 'basicSceneInstance/GET_EDITORSCENE_INSTANCE'}),
  },
  mounted() {
    // this.changeProp = this.eSceneInstance.getSelectedObjectProperties(posX, posY, posZ, rotX, rotY, rotZ, ScaleX, ScaleY, ScaleZ)
  },
  watch: {
    changeProp(newVal, oldVal){

    }
    // this.eSceneInstance.getSelectedObjectProperties(this.locationX, this.locationY)
    // console.log(this.eSceneInstance.getSelectedObjectProperties(this.locationX))
  },
  methods: {
    onChange(arc, type){
      switch (type){
        case 'locationX':
          this.eSceneInstance.changePositionX(arc)
          break
        case 'locationY':
          this.eSceneInstance.changePositionY(arc)
          break
        case 'locationZ':
          this.eSceneInstance.changePositionZ(arc)
          break
        case 'rotationX':
          this.eSceneInstance.changeRotationX(arc)
          break
        case 'rotationY':
          this.eSceneInstance.changeRotationY(arc)
          break
        case 'rotationZ':
          this.eSceneInstance.changeRotationZ(arc)
          break
        case 'ScaleX':
          this.eSceneInstance.changeScaleX(arc)
          break
        case 'ScaleY':
          this.eSceneInstance.changeScaleY(arc)
          break
        case 'ScaleZ':
          this.eSceneInstance.changeScaleZ(arc)
          break
      }
    }
  },
}
//todo lock ес будут проблемы

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
