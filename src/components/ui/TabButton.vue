//this component is responsible for each individual tab rendered at the top section of
// the CoinModal component
<template>
     <button class="w-1/4 text-xs sm:w-auto sm:text-lg">
          <div
            class="tab"
            :class="{ selectedTab: param === tabID,
            'rounded-tl-lg': name == 'Bitcoin',
            'rounded-tr-lg': name == 'Cosmos'
            }"
            
          >
            {{name}}
          </div>
        </button>
</template>

<script>
//tabButton receives three props from the parent Component
// 'name' determines the string that will be displayed inside the tab
// 'param' receives the param string from the URL
// 'tabID' receives a string that contains the coin's ID
// when the respective tab is selected, param and tabID should be equal, thus applying
// to the component a dynamic class called '.selectedTab' that will change it's background color

export default {
    props: ['name' , 'param' , 'tabID']
}
</script>

<style scoped>
.tab {
      padding: 0.5rem 1rem;
    }
.tab:hover {
  background-color: #413768;
}
.selectedTab {
  background-color: #413768;
}
</style>