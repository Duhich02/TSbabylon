import {MUTATE_EDITORSCENE_INSTANCE} from "src/store/editor/mutations";

export function SET_EDITORSCENE_INSTANCE (state, instance) {
  state.commit('MUTATE_EDITORSCENE_INSTANCE', instance);
}
