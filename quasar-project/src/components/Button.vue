<template>
  <div class="q-pa-md">
    <div class="radio-buttons">
      <q-radio v-model="radio" val="position" label="Смещение" />
      <q-radio v-model="radio" val="rotation" label="Вращение" />
      <q-radio v-model="radio" val="scaling" label="Масштабирование" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BasicScene } from 'src/scenes/MyFirstScene';
import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Color3,
  HemisphericLight,
  Nullable,
  AbstractMesh,
  UtilityLayerRenderer,
} from "@babylonjs/core";
import {
  GizmoManager,
  RotationGizmo,
  ScaleGizmo,
  PositionGizmo,
} from "@babylonjs/core/Gizmos";
import {ref, watch} from 'vue';

const radio = ref<string>("rotation");
let basicScene: BasicScene | null = null;

const canvas = document.querySelector("canvas");
if (canvas !== null) {
  basicScene = new BasicScene(canvas);
}

watch(radio, (newVal, oldVal) => {
  if (basicScene === null) {
    return;
  }

  basicScene.disableGizmos();

  if (newVal === "position") {
    basicScene.enablePositionGizmo();
  } else if (newVal === "rotation") {
    basicScene.enableRotationGizmo();
  } else if (newVal === "scaling") {
    basicScene.enableScaleGizmo();
  }
});
</script>
