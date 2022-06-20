<template>
  <!-- <h1 class="text-slate-200" v-for="coin in coins" :key="coin.id">
       #{{coin.market_cap_rank}}-------{{coin.name}}----------------------{{coin.current_price}}
    </h1> -->

  <div
    class="text-white font-bold tracking-widest sm:flex sm:flex-col sm:items-center"
  >
    <h1 class="p-1 text-center">Top 10</h1>

    <div class="mb-5 sm:w-3/5">
      <div class="my-5 rankHeaders grid grid-cols-9 p-1">
        <div
          v-for="header in tableHeaders"
          :key="header"
          :class="{
            'col-start-2': header == 'Coin',
            'col-end-5': header == 'Coin',
            'col-start-5': header == 'Price',
            'col-end-8': header == 'Price',
            'col-start-8': header == '24h Var',
            'col-end-10': header == '24h Var',
          }"
        >
          {{ header }}
        </div>
      </div>

      <div
        v-for="coin in coins"
        :key="coin"
        class="rankRows grid grid-cols-9 p-1"
      >
        <div>{{ coin.rank }}</div>
        <div class="col-start-2 col-end-5">
          <button class="flex gap-2 items-center" @click="redirectToCoinPage(coin.id)">
            <img :src="coin.image" alt="" /> {{ coin.coin }}
          </button>
        </div>
        <div class="col-start-5 col-end-8">
          {{ convertNumtoPrice(coin.price) }}
        </div>
        <div
          class="flex justify-between col-start-8 col-end-10 text-sm sm:justify-start"
          :class="{
            'text-red-500': coin.var < 0,
            'text-green-500': coin.var >= 0,
          }"
        >
          <div>{{ plusSign(coin.var) }}{{ coin.var.toFixed(2) }}</div>
          <div>%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   coins attributes: rank - coin - price - var - image - id
      coins: [],
      tableHeaders: ["#", "Coin", "Price", "24h Var"],
    };
  },
  props: ["coinsInRankStr"],
  computed: {
    coinsInRankParsed() {
      return parseInt(this.coinsInRankStr);
    },
  },
  methods: {
    async fetchTopXCoins(coinsInRank) {
      try {
        let res = await this.$http.get(this.defineRequestURL(coinsInRank));
        let coinsBeforeTreatment = res.data;
        this.coins = this.treatCoins(coinsBeforeTreatment);
      } catch (e) {
        console.log(e);
      }
    },
    async updatePriceVar(coinsInRank) {
      setInterval(async () => {
        try {
          let res = await this.$http.get(this.defineRequestURL(coinsInRank));
          let coinsBeforeTreatment = res.data;
          let coinsAfterTreatment = this.treatCoins(coinsBeforeTreatment);
          for (let i = 0; i < coinsInRank; i++) {
            this.coins[i].price = coinsAfterTreatment[i].price;
            this.coins[i].var = coinsAfterTreatment[i].var;
          }
        } catch (e) {
          console.log(e);
        }
      }, 10000);
    },
    defineRequestURL(coinsInRank) {
      return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsInRank}&page=1&sparkline=false&price_change_percentage=24h`;
    },
    treatCoins(coinsBeforeTreatment) {
      let coinsAfterTreatment = [];
      for (let coinPreTreatment of coinsBeforeTreatment) {
        let tempObject = { rank: "", coin: "", price: 0, var: 0 };
        tempObject.rank = coinPreTreatment.market_cap_rank;
        tempObject.coin = coinPreTreatment.symbol;
        tempObject.price = coinPreTreatment.current_price;
        tempObject.var = coinPreTreatment.price_change_percentage_24h;
        tempObject.image = coinPreTreatment.image;
        tempObject.id = coinPreTreatment.id;
        coinsAfterTreatment.push(tempObject);
      }
      return coinsAfterTreatment;
    },
    convertNumtoPrice(num) {
      return num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
        style: "currency",
        currency: "USD",
      });
    },
    plusSign(variation) {
      if (variation > 0) {
        return "+";
      }
    },
    redirectToCoinPage(id) {
      this.$router.push(`/dashboard/${id}`);
    },
  },
  async mounted() {
    await this.fetchTopXCoins(this.coinsInRankParsed);
    this.updatePriceVar(this.coinsInRankParsed);
  },
};
</script>

<style scoped>
.rankHeaders {
  background-color: #000232;
  border-top: 1px solid #2f52a0;
  border-bottom: 1px solid #2f52a0;
}
.rankRows {
  background-color: #000232;
  border-top: 1px solid #2f52a0;
}
img {
  width: 20px;
}
button {
    padding: 0px 30px 0px 0px;
    transition: all .25s;
    border-radius: 10px;
}
button:hover {
    background-color: #2f52a0;
    
}
</style>
