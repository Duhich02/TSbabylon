<template>
  <canvas width="1480" height="750" />
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import { BasicScene } from 'src/scenes/MyFirstScene.ts';

onMounted(() => {
  const canvas = document.querySelector("canvas");
  new BasicScene(canvas);
});

</script>
