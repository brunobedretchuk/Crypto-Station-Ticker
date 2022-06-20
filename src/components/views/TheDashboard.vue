// this template holds a router-view so inside the '/dashboard' we can access all
// child routes, each one relative to a specific coin
// by the default, accessing '/dashboard' redirects directly to the bitcoin subpage
<template>
 <div>
    <!-- <links-bar></links-bar> -->
  <router-view class="mt-20 mx-4 lg:mx-40 2xl:mx-80"></router-view>
  <coin-rank class="mt-10 mx-4 lg:mx-40 2xl:mx-80"
  coinsInRankStr='10'
  ></coin-rank>
 </div>
</template>

<script>
import LinksBar from '../ui/LinksBar.vue'
import CoinRank from '../partials/CoinRank.vue'
export default {
    components: {
        LinksBar,
        CoinRank
    }
}
</script>

