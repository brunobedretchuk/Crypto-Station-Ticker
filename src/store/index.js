import { createStore } from "vuex";



const store = createStore({

  state() {
    return {
      allData: {
        "id": "",
        "symbol": "",
        "name": "",
        "image": {
            "thumb": "",
            "small": "",
            "large": ""
        },
        "market_cap_rank": 0,
        "market_data": {
            "current_price": {
                "usd": 0,
              },
            "price_change_percentage_24h_in_currency": {
                "usd": 0
            },
    }
  },
      dataReady: false,
    };
  },
  mutations: {
    searchAllData(state, payload) {
      if(payload){
        state.allData = payload;
      }
    },
    updatePriceVarData(state, payload) {
      state.allData.market_data.current_price.usd = payload.market_data.current_price.usd;
      state.allData.market_data.price_change_percentage_24h = payload.market_data.price_change_percentage_24h
    },
  },
  actions: {
    searchAllData(context , payload){
      const data = payload;
     context.commit('searchAllData' , data);
    },
    updatePriceVarData(context , payload){
      const data = payload;
     context.commit('updatePriceVarData' , data);
    },
  },
  getters: {
    getAllData(state){
      return state.allData
    },
    getPriceData(state){
      return state.allData.market_data.current_price.usd
    },
    getVarData(state){
      return state.allData.market_data.price_change_percentage_24h
    }
  },
});

export default store;
