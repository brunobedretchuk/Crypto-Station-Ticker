<template>
     <button class="w-1/5 text-xs sm:w-auto sm:text-lg">
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
export default {
    props: ['name' , 'param' , 'tabID']
}
</script>

<style scoped>
.tab {
      padding: 0.5rem 1rem;
    }
.tab:hover {
  background-color: #8a62db;
}
.selectedTab {
  background-color: #8a62db;
}
</style>