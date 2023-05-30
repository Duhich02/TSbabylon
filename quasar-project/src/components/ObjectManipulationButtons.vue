<template>
  <div class="q-pa-md">
    <div class="q-buttons">
      <q-btn @click="togglePositionGizmoBtn" :color="radio === 'position' ? 'primary' : 'secondary'" label="Смещение" />
      <q-btn @click="toggleRotationGizmoBtn" :color="radio === 'rotation' ? 'primary' : 'secondary'" label="Вращение" />
      <q-btn @click="toggleScaleGizmoBtn" :color="radio === 'scaling' ? 'primary' : 'secondary'" label="Масштабирование" />
      <q-btn @click="initializeGizmoManagerBtn" :color="radio === 'cursor' ? 'primary' : 'secondary'" label="Курсор" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BasicScene } from 'src/scenes/MirLocationEditor';
import { Scene, Engine } from "@babylonjs/core";
import { ref } from 'vue';

let radio = ref<string>("cursor");
let basicScene: BasicScene | null = null;
let scene: Scene | null = null;

const canvas = document.querySelector("canvas");
if (canvas !== null) {
  scene = new Scene(new Engine(canvas, true));
  basicScene = new BasicScene(canvas);
}
//синглтон not recommended
//тут баг
const togglePositionGizmoBtn = () => {
  if (basicScene === null) {
    return;
  }
  basicScene.togglePositionGizmo();
  radio.value = "position";
};

const toggleRotationGizmoBtn = () => {
  if (basicScene === null) {
    return;
  }
  basicScene.toggleRotationGizmo();
  radio.value = "rotation";
};

const toggleScaleGizmoBtn = () => {
  if (basicScene === null) {
    return;
  }
  basicScene.toggleScaleGizmo();
  radio.value = "scaling";
};

const initializeGizmoManagerBtn = () => {
  if (basicScene === null || scene === null) {
    return;
  }
  // basicScene.initializeGizmoManager(scene);
  radio.value = "cursor";
}

</script>
