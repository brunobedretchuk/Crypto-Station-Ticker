import { createRouter, createWebHashHistory } from "vue-router";
// imports necessary components
import Home from "./../components/views/TheHome.vue";
import Dashboard from "./../components/views/TheDashboard.vue";
import CoinModal from "./../components/partials/CoinModal.vue";


const routes = [
  {
    name: "Home",
    path: "/",
    component: Home
    // route guarding - not used in current project
    // beforeEnter: (_, _2, next) => {

    // },
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    redirect: "/dashboard/bitcoin",
    component: Dashboard,
     // route guarding - not used in current project
    // beforeEnter: (_, _2, next) => {

    // },
    children: [
      { name: "Coin", path: ":coin", component: CoinModal},
     
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
