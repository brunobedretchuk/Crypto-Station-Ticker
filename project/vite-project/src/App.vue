<template>
 <div class="container-fluid bg-black">
   <nav-bar> </nav-bar>
   <router-view v-slot='slotProps'>
     <transition name="route" mode="out-in">
            <component :is="slotProps.Component"> </component>
          </transition>
   </router-view>
 </div>
</template>

<script>
import NavBar from './components/ui/NavBar.vue'
export default {
  components: {
    NavBar
  },
  methods: {
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;700&display=swap');
*{
  font-family: 'Manrope', sans-serif;
}

html{
  background-color: black;
}
.route-enter-from{
opacity: 0;
}
.route-enter-active{
transition: all .5s;
}

.route-leave-active{
transition: all .25s;
}
.route-leave-to{
opacity: 0;
}
</style>
