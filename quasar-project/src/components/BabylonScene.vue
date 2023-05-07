<template>
  <canvas width="1480" height="750" />
  <Button style="position: absolute; top: 0; left: 0;"/>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import { BasicScene } from 'src/scenes/MyFirstScene.ts';
import Button from "src/components/Button.vue"

onMounted(() => {
  const canvas = document.querySelector("canvas");
  new BasicScene(canvas);
});

</script>
