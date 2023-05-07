<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm" style="color: white">
      <q-radio v-model="radio" val="action" label="Курсор" />
      <q-radio v-model="radio" val="position" label="Смещение" />
      <q-radio v-model="radio" val="rotation" label="Вращение" />
      <q-radio v-model="radio" val="scaling" label="Масштабирование" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const radio = ref<string>("rotation");

</script>

<style lang="sass" scoped>
</style>
