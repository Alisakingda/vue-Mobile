import mockdata from "@/mock";
export default {
  state: {
    homeData: "1111"
  },
  getters: {
    get_homeData(state) {
      return state.homeData;
    }
  },
  mutations: {
    SET_HOMEDATA(state, payload) {
      state.homeData = payload;
    }
  },
  actions: {
    set_homedata({ commit }) {
      commit("SET_HOMEDATA");
    }
  }
};
