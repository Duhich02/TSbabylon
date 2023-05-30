<template>
  <div class="q-pa-none">
    <q-layout view="hHh Lpr lff" container style="height: 750px">

      <q-header style="height: 100px;" :class="$q.dark.isActive ? 'bg-black ' : 'bg-secondary'">
        <q-toolbar>
          <q-icon style="width: 50px; height: 50px;"/>
          <q-toolbar-title><strong>Мир 1Т Редактор Игры</strong></q-toolbar-title>
        </q-toolbar>

        <section style="height: 50px; " class='bg-positive'>
          <q-toolbar style="display:flex; align-items:center;">
            <Button style="position: absolute; top: 10; left: 0;"/>
          </q-toolbar>
        </section>
      </q-header>

      <q-page-container>
        <q-page>
          <babylon-scene/>
        </q-page>
      </q-page-container>

      <q-drawer
        side="right"
        show-if-above
        bordered
        :width="200"
        :breakpoint="500"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-4'"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
          </div>
        </q-scroll-area>
      </q-drawer>

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

      <q-footer class="bg-grey-5" style="height: 150px;">
        <q-toolbar>
          <q-btn class="bg-grey-4"/>
          <q-btn class="bg-grey-4"/>
          <q-btn class="bg-grey-4"/>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup>
import BabylonScene from "components/BabylonScene";
import Button from "src/components/ObjectManipulationButtons.vue"
import { ref } from 'vue'
import ObjectInput from 'src/components/ObjectsTransformationInput.vue'
import BtnCreate from "../components/CreatingObjectsButtons.vue";

const toggleLabelInputs = ref(true);
//названия и комментарии
//названия компонентов
//вынесить весь функционал роботы с 3д в basicScene
//добавить сюда мозги кнопок/инпутов
//разделить на компоненты секции и дроверы
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
