import { createRouter, createWebHistory } from "vue-router";
import HousesListingPage from "@/pages/HousesListingPage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import HousesDetailPage from "@/pages/HousesDetailPage.vue";
import HousesCreatePage from "@/pages/HousesCreatePage.vue";
const routes = [
  {
    path: "/houses",
    name: "HousesListingPage",
    children: [
      {
        path: "",
        name: "HousesListingPage",
        component: HousesListingPage,
      },
      {
        path: ":id",
        name: "HousesDetailPage",
        component: HousesDetailPage,
      },
      {
        path: "create",
        name: "HousesCreatePage",
        component: HousesCreatePage,
      },
    ],
  },

  {
    path: "/about",
    name: "AboutPage",
    component: AboutPage,
  },
];
const indexRouter = createRouter({
  history: createWebHistory(),
  routes,
});
export default indexRouter;
