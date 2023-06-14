<template>
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

      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script>

export default {
  components: {
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
