<template>
  <canvas width="1050" height="500" />
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import { BasicScene } from 'src/scenes/MirLocationEditor.ts';

onMounted(() => {
  const canvas = document.querySelector("canvas");
  new BasicScene(canvas);
});

</script>
