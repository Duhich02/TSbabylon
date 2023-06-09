import { store } from 'quasar/wrappers'
import {createStore, Store as VuexStore, useStore as vuexUseStore} from 'vuex'
import basicSceneInstance from './editor'
// import { ExampleStateInterface } from './editor/state';



/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      basicSceneInstance,
    },
    strict: false,
  });

  return Store;
});
