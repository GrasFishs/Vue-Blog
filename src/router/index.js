import Vue from "vue";
import Router from "vue-router";
import ArticlesList from "../components/ArticlesList.vue";
import ArticleDetail from "../components/ArticleDetail.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "ArticlesList",
      component: ArticlesList
    },
    {
      path: "/article/:id",
      name: "article",
      component: ArticleDetail
    }
  ]
});
