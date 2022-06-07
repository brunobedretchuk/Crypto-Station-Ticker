<template>
  <div class="main">
    <div
      class="coinTabs rounded-t-lg flex flex-col justify-between mt-20 mx-4 lg:mx-40 2xl:mx-80 md:flex-row"
    >
      <div class="flex justify-between md:justify-start">
        <button class="w-1/5 sm:w-auto">
          <div
            class="tab rounded-tl-lg"
            :class="{ selectedTab: param == 'bitcoin' }"
            @click="selectTab('bitcoin')"
          >
            Bitcoin
          </div>
        </button>

        <button class="w-1/5 md:w-auto">
          <div
            class="tab"
            :class="{ selectedTab: param == 'ethereum' }"
            @click="selectTab('ethereum')"
          >
            Ethereum
          </div>
        </button>

        <button class="w-1/5 md:w-auto">
          <div
            class="tab"
            :class="{ selectedTab: param == 'dacxi' }"
            @click="selectTab('dacxi')"
          >
            Dacxi
          </div>
        </button>

        <button class="w-1/5 md:w-auto">
          <div
            class="tab"
            :class="{ selectedTab: param == 'terra-luna-2' }"
            @click="selectTab('terra-luna-2')"
          >
            Terra
          </div>
        </button>

        <button class="w-1/5 md:w-auto">
          <div
            class="tab rounded-tr-lg md:rounded-none"
            :class="{ selectedTab: param == 'cosmos' }"
            @click="selectTab('cosmos')"
          >
            Cosmos
          </div>
        </button>
      </div>
      <div class="inputTab flex justify-center gap-1 md:justify-start">
        <span
          ><input
            type="text"
            class="text-gray-400 mr-2 pl-2 rounded-md w-40"
            placeholder="search coin by id"
            ref="input"
          />
          <button class="baseButton" @click="searchCoin($refs.input.value)">
            search
          </button>
        </span>
      </div>

      <div></div>
    </div>
    <transition name="coin" mode="out-in">
      <div v-if="!isLoading" class="mx-4 lg:mx-40 2xl:mx-80 coin">
        <div :key="param">
          <div class="mb-4">
            <div class="flex gap-2 items-center">
              <span><img :src="coinData.image.small" alt="" /></span>
              <span
                ><p class="text-3xl">
                  {{ coinData.name }} ({{ coinData.symbol }})
                </p></span
              >
            </div>
          </div>
          <div>
            <div
              class="flex justify-between gap-2 items-center px-1 border-x-2"
            >
              <span class="flex items-end gap-2">
                <p class="text-lg">Current Price</p>
              </span>
              <span class="flex items-end gap-2">
                <p class="text-sm p-1">Rank #{{ coinData.market_cap_rank }}</p>
              </span>
            </div>
            <div class="flex gap-2 items-center pl-1 border-l-2">
              <span class="flex items-end gap-2"
                ><p class="text-2xl">{{ getCurrency(currPrice) }}</p>
                <p
                  :class="{
                    'text-red-500': parseFloat(coinVariation) < 0,
                    'text-green-500': parseFloat(coinVariation) >= 0,
                  }"
                >
                  {{ plusSign }}
                  {{ var24 }}%
                </p>
                <p>(24h)</p>
              </span>
            </div>
            <div class="my-8"></div>
            <div class="flex gap-2 items-center px-1 border-l-2">
              <span class="flex items-end gap-2">
                <p class="text-lg">Historical Price</p>
              </span>
            </div>
            <div class="flex gap-2 items-center px-1 border-l-2">
              <form @submit.prevent="getHistoricalPrice">
                <span class="flex items-end gap-2">
                  <input
                    class="text-gray-400 px-2 rounded-lg"
                    type="date"
                    ref="dateInput"
                  />
                  <button class="baseButton">search</button>
                </span>
              </form>
            </div>
            <div class="flex gap-2 items-center pl-1 border-l-2 h-8">
              <span class="flex items-end gap-2">
                <transition name="hPrice" mode="out-in">
                  <p :key="historicalPrice" class="text-2xl">
                    {{ historicalPrice }}
                  </p>
                </transition>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-4 lg:mx-40 2xl:mx-80 coin text-center" v-else-if="error">
        <h1 class="text-red-500">Sorry, we could not find the specified coin</h1>
        <h1 class="text-red-500"><a href="https://api.coingecko.com/api/v3/coins/list" target="_blank">Click here for a full list of all ID's available in the API</a></h1>
      </div>
      <div class="flex justify-center" v-else>
        <img
          class="w-1/12 mt-10"
          src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
          alt=""
        />
      </div>
    </transition>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  data() {
    return {
      isLoading: true,
      historicalPrice: null,
      currPrice: 0,
      var24: 0,
      tweened: 0,
      error: false,
    };
  },
  watch: {
    coinValue(n) {
      gsap.to(this, { duration: 0.5, currPrice: Number(n) || 0 });
    },
    coinVariation(n) {
      gsap.to(this, { duration: 0.5, var24: Number(n) || 0 });
    },
  },
  computed: {
    param() {
      return this.$route.params.coin;
    },
    coinData() {
      return this.$store.getters.getAllData;
    },
    coinValue() {
      return this.$store.getters.getPriceData;
    },
    coinPrice() {
      const x = this.$store.getters.getPriceData.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
        style: "currency",
        currency: "USD",
      });

      return x;
    },
    coinVariation() {
      return this.$store.getters.getVarData;
    },
    plusSign() {
      if (this.coinVariation > 0) {
        return "+";
      }
    },
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        const res = await this.$http.get(
          `https://api.coingecko.com/api/v3/coins/${this.param}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        );
        this.$store.dispatch("searchAllData", res.data);
        this.isLoading = false;
      } catch (e) {
        this.error=true;
      }
    },
    async fetchPriceVar() {
      try {
        const res = await this.$http.get(
          `https://api.coingecko.com/api/v3/coins/${this.param}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        );

        this.$store.dispatch("updatePriceVarData", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async getHistoricalPrice() {
      try {
        const date = this.$refs.dateInput.value;
        const dateStr = `${date.slice(8)}-${date.slice(5, 7)}-${date.slice(
          0,
          4
        )}`;
        const res = await this.$http
          .get(`https://api.coingecko.com/api/v3/coins/${this.param}/history?date=${dateStr}&localization=false
`);
        this.historicalPrice =
          res.data.market_data.current_price.usd.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
            style: "currency",
            currency: "USD",
          });
      } catch (e) {
        this.historicalPrice =
          "Sorry, data not available for the referred date";
        this.$refs.dateInput.value = "";
      }
    },
    selectTab(tab) {
      this.$router.push(`/dashboard/${tab}`);
    },
    searchCoin(input) {
      this.$refs.input.value = "";
      this.$router.push(`/dashboard/${input}`);
    },
    getCurrency(value) {
      return value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
        style: "currency",
        currency: "USD",
      });
    },
  },
  created() {
    this.$watch(
      () => this.param,
      (newParam) => {
        this.fetchData();
        this.historicalPrice = "";
        // this.$refs.dateInput.value = "";ju

        this.error = false;
      }
    );
  },
  mounted() {
    this.fetchData();
    setInterval(this.fetchPrice, 5000);
  },
};
</script>

<style scoped>
.coin {
  background-color: #2f52a0;
  padding: 1rem;
  color: white;
  border-radius: 0px 0px 10px 10px;
}
.coinTabs {
  background-color: #a071ff;
  color: white;
}
.tab {
  padding: 0.5rem 1rem;
}
.inputTab {
  padding: 0.5rem 1rem;
}

.tab:hover {
  background-color: #8a62db;
}
.selectedTab {
  background-color: #8a62db;
}
.baseButton {
  border: 1px solid white;
  padding: 0rem 0.75rem;
  border-radius: 10px;
  transition: 0.25s;
}
.baseButton:hover {
  background-color: white;
  color: #a071ff;
}
.hPrice-enter-from,
.hPrice-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.hPrice-enter-active,
.hPrice-leave-active {
  transition: all 0.2s;
}
.coin-enter-from,
.coin-leave-to {
  opacity: 0;
}

.coin-enter-active,
.coin-leave-active {
  transition: all 0.15s;
}
</style>
