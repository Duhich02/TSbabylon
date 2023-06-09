<template>
  <q-drawer
    show-if-above
    :width="270"
    :breakpoint="700"
    class="bg-grey-4"
  >
    <q-scroll-area class="fit">
      <div class="q-pa-sm">

        <div class="toggle-label" @click="toggleLabelInputs = !toggleLabelInputs">
          <q-icon :name="toggleLabelInputs ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" />
          <span>Трансформация</span>
        </div>
        <div v-if="toggleLabelInputs">
          <object-input/>
        </div>
        <btn-create/>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
import ObjectInput from 'src/components/ObjectsTransformationInput.vue'
import BtnCreate from "../components/CreatingObjectsButtons.vue";
import {ref} from "vue";
import {mapGetters, useStore} from "vuex";
export default {
  components: {
    ObjectInput,
    BtnCreate
  },
  data() {
    return {
      toggleLabelInputs: ref(true),
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>

.toggle-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.toggle-label span {
  margin-left: 8px;
}
</style>
