<template>
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

</template>

<script>
import Button from "src/components/BtnManipObj.vue"
export default {
  components: {
    Button
  },
  data() {
    return {
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

</style>
