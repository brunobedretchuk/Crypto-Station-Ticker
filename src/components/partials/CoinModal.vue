<template>
  <main class="main">
    
    <!-- Top Section of the main Window -->
    <div class="coinTabs rounded-t-lg flex flex-col justify-between mt-20 mx-4 lg:mx-40 2xl:mx-80 md:flex-row">
      <div class="flex justify-between md:justify-start">
       <!-- Tabs to Select main Coins -->
       <tab-button @click="selectTab('bitcoin')" name="Bitcoin" :param="param" tabID="bitcoin"></tab-button>
       <tab-button @click="selectTab('ethereum')" name="Ethereum" :param="param" tabID="ethereum"></tab-button>
       <tab-button @click="selectTab('dacxi')" name="Dacxi" :param="param" tabID="dacxi"></tab-button>
       <tab-button @click="selectTab('terra-luna-2')" name="Luna" :param="param" tabID="terra-luna-2"></tab-button>
       <tab-button @click="selectTab('cosmos')" name="Cosmos" :param="param" tabID="cosmos"></tab-button>
      </div>
 
      <!-- Search tab -->
      <div class="inputTab flex justify-center gap-1 md:justify-start">
        <span>
            <form @submit.prevent="searchCoin($refs.input.value)">
                <input id="input1" type="text" class="text-gray-400 mr-2 pl-2 rounded-md w-40"
            placeholder="search coin by id" ref="input"/>
          <button class="baseButton">search</button>
            </form>
        </span>
      </div>   
    </div>

<!-- Bottom Section of the main window -->
    <transition name="coin" mode="out-in">
      <!-- Section that will be displayed if there are no errors and loading is finished -->
      <div v-if="!isLoading" class="mx-4 lg:mx-40 2xl:mx-80 coin">
        <div :key="param">
          <div class="mb-4">
            <div class="flex gap-2 items-center">
              <span><img :src="coinData.image.small" alt="" /></span>
              <span><p class="text-3xl">{{ coinData.name }} ({{ coinData.symbol }})</p></span>
            </div>
          </div>
          <div>
            <div class="flex justify-between gap-2 items-center px-1 border-x-2">
              <span class="flex items-end gap-2">
                <p class="text-lg">Current Price</p>
              </span>
              <span class="flex items-end gap-2">
                <p class="text-sm p-1">Rank #{{ coinData.market_cap_rank }}</p>
              </span>
            </div>
            <div class="flex gap-2 items-center pl-1 border-l-2">
              <span class="flex items-end gap-2">
                  <p class="text-2xl">{{ getCurrency(currPrice) }}</p>
                <p :class="{
                    'text-red-500': parseFloat(coinVariation) < 0,
                    'text-green-500': parseFloat(coinVariation) >= 0,
                  }">{{ plusSign }} {{ var24 }}%</p><p>(24h)</p>
              </span>
            </div>
            <div class="my-8"></div>
            <div class="flex gap-2 items-center px-1 border-l-2">
              <span class="flex items-center gap-2">
                <p class="text-lg">Historical Price</p>
                <p class="text-sm">(UTC)</p>
              </span>
            </div>
            <div class="flex gap-2 items-center px-1 border-l-2">
              <form @submit.prevent="getHistoricalPrice">
                <span class="flex items-end gap-2">
                  <input
                    class="text-gray-400 px-2 rounded-lg"
                    type="date"
                    ref="dateInput"
                    id="input2"
                  />
                  <input
                    class="text-gray-400 px-2 rounded-lg"
                    type="time"
                    ref="timeInput"
                    id="input3"
                    v-model="timeInput"
                  />
                  <button class="baseButton" id="histButton">search</button>
                </span>
              </form>
            </div>
            <div class="flex gap-2 items-center pl-1 border-l-2 h-8">
              <span class="flex items-end gap-2">
                <transition name="hPrice" mode="out-in">
                  <p :key="historicalPrice" class="text-2xl">{{ historicalPrice }}</p>
                </transition>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Section that will be displayed in case an error occurs -->
      <error-section v-else-if="error"></error-section>
      
      <!-- Section that will be displayed during Loading -->
      <loading-section v-else></loading-section>
    
    </transition>
  </main>
</template>

<script>
// Animation package
import gsap from "gsap";
// Components
import TabButton from '../ui/TabButton.vue'
import LoadingSection from '../ui/LoadingSection.vue'
import ErrorSection from '../ui/ErrorSection.vue'

export default {
  components: {
      TabButton, LoadingSection, ErrorSection
  },
  data() {
    return {
      isLoading: true,
      historicalPrice: null,
      currPrice: 0,
      var24: 0,
      error: false,
      timeInput: '01:00'
    };
  },
  watch: {
    // watches current price and returns values dynamically to currPrice in data(), so it can be animated
    coinValue(n) {
      gsap.to(this, { duration: 0.5, currPrice: Number(n) || 0 });
    },
    // watches 24h Variation and returns values dynamically to var24 in data(), so it can be animated
    coinVariation(n) {
      gsap.to(this, { duration: 0.5, var24: Number(n) || 0 });
    },
  },
  computed: {
    // computed property that reacts to changes in parameters inside the URl
    param() {
      return this.$route.params.coin;
    },
    // computed property that reacts to the coin that was loaded via fetchData
    coinData() {
      return this.$store.getters.getAllData;
    },
    // computed property that reacts to the coin's price (number) that was loaded via fetchData and fetchPriceVar
    coinValue() {
      return this.$store.getters.getPriceData;
    },
     // computed property that reacts to the coin's price (currency) that was loaded via fetchData and fetchPriceVar
    coinPrice() {
      const x = this.$store.getters.getPriceData.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
        style: "currency",
        currency: "USD",
      });

      return x;
    },
     // computed property that reacts to the coin's last 24h variation in price that was loaded via fetchData and fetchPriceVar
    coinVariation() {
      return this.$store.getters.getVarData;
    },
    // computed property that will dynamically insert a '+' before the 24h variation display, in case it's value is positive
    plusSign() {
      if (this.coinVariation > 0) {
        return "+";
      }
    },
  },
  methods: {
    // makes a get request to the API, using the URL parameters as a reference to which coin will be searched
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
    // makes a get request to the API, using the URL parameters as a reference. Will serve to update coin Price and 24h variation values only, every 5 seconds
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
    // makes a get request to the API for the current coin being displayed, using the date and time inputs. by default, time is set to 01:00
    // the function operates by getting the difference between the current date and the inputted date. This is required by the API to make the request
    // the API retrieves an array with a great number of moments (an array with two elements: time in MS and the price at that moment, ie: [1654048976643 , 31931.70])
    // the closest variable gets the closest moment  to the one inputted, foundPrice then stores the correspondent price, thus retrieving the historical price requested
    async getHistoricalPrice() {
      try {
        const dateInput = this.$refs.dateInput.value;
        const timeInput = this.timeInput;

        let date1 = new Date(dateInput)
        let dateNow = new Date(Date.now())
        let diffInDays = this.dateDiffInDays(date1 , dateNow)
        let moment = Date.parse(`${dateInput} ${timeInput} UTC`)

        const res = await this.$http.get(`https://api.coingecko.com/api/v3/coins/${this.param}/market_chart?vs_currency=usd&days=${diffInDays}'`);

        let pricesArr = res.data.prices;


        let closest = pricesArr.reduce(function(prev, curr) {
        return (Math.abs(curr[0] - moment) < Math.abs(prev[0] - moment) ? curr : prev);
        });

        let foundPrice = this.filterPriceArray(closest , pricesArr);
        console.log(moment , closest , foundPrice)

        
        this.historicalPrice = foundPrice.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 4, style: "currency", currency: "USD"});
      } catch (e) {
        this.historicalPrice = "Sorry, data not available for the referred date";
        // this.$refs.dateInput.value = "";
      }
    },
    selectTab(tab) {
      this.$router.push(`/dashboard/${tab}`);
    },
    searchCoin(input) {
      this.$refs.input.value = "";
      this.$router.push(`/dashboard/${input.toLowerCase()}`);
    },
    getCurrency(value) {
      return value.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 4, style: "currency", currency: "USD"});
    },
    dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
},
    filterPriceArray(closest , pricesArr){
      let [chosenArr] = pricesArr.filter(el => el === closest)
      return chosenArr[1]
    }
  },

  created() {
    // watches whenever the value of params changes, so the application fetches new
    // data and resets the page's content
    this.$watch(
      () => this.param, (newParam) => {
          this.fetchData();
          this.historicalPrice = "";
          this.error = false;
      }
    );
  },
  mounted() {
    //fetch data when page first loads
    this.fetchData();
    //every 5 seconds, application makes a request to the API for an update on
    //price and/or 24h variation
    setInterval(this.fetchPriceVar, 5000);
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
.inputTab {
    padding: 0.5rem 1rem;
}

.tab {
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
/* animation for when a new coin loads */
.coin-enter-from,
.coin-leave-to {
    opacity: 0;
}
.coin-enter-active,
.coin-leave-active {
    transition: all 0.15s;
}
/* animation for when user searches for historical price data */
.hPrice-enter-from,
.hPrice-leave-to {
    opacity: 0;
    transform: translateX(100px);
}
.hPrice-enter-active,
.hPrice-leave-active {
    transition: all 0.2s;
}
</style>
