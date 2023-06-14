
export function SET_EDITORSCENE_INSTANCE (state, instance) {
  console.log(state, instance)
  state.commit('MUTATE_EDITORSCENE_INSTANCE', instance);
}
