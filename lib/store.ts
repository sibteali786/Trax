import { createStore, action } from "easy-peasy";

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
});

// * We might be thinking if its immutable or not and answer is simply yes
// * it is immutable underneath using Immer
