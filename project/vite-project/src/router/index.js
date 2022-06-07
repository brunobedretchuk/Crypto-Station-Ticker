import { createRouter, createWebHashHistory } from "vue-router";

import Home from "./../components/views/TheHome.vue";
import Dashboard from "./../components/views/TheDashboard.vue";
import CoinModal from "./../components/partials/CoinModal.vue";


const routes = [
  {
    name: "Home",
    path: "/",
    component: Home
    // beforeEnter: (_, _2, next) => {
    //   const auth = localStorage.getItem("autenticado");
    //   if (auth === "true") {
    //     next("/dashboard");
    //   } else {
    //     next("/login");
    //   }
    // },
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    redirect: "/dashboard/bitcoin",
    component: Dashboard,
    // beforeEnter: (_, _2, next) => {
    //   const auth = localStorage.getItem("autenticado");
    //   if (auth === "true") {
    //     next();
    //   } else {
    //     next("/login");
    //   }
    // },
    children: [
      { name: "Coin", path: ":coin", component: CoinModal},
     
    ],
  },
  // {
  //   name: "Dashboard",
  //   path: "/dashboard",
  //   redirect: "/dashboard/inventory",
  //   component: Sidebar,
  //   beforeEnter: (_, _2, next) => {
  //     const auth = localStorage.getItem("autenticado");
  //     if (auth === "true") {
  //       next();
  //     } else {
  //       next("/login");
  //     }
  //   },
  //   children: [
  //     { name: "Inventory", path: "inventory", component: Inventory },
  //     { name: "ItemReg", path: "registeritem", component: ItemRegistration },
  //     { name: "Actions", path: "actions", component: ListBorrows },
  //     {
  //       name: "ColaboratorReg",
  //       path: "registercolab",
  //       component: ColabRegistration,
  //     },
  //     { name: "Colaborators", path: "colaborators", component: UsersList },
  //   ],
  // },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
