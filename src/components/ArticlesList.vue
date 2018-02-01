<template>
  <div class="articles">
    <div v-for="(article,i) of articles"
         :key="i" 
         class="item">
      <div class="card">
        <div class="article">
          <div class="image"
            :style="imgStyle"
            v-html="article.content" 
            v-markdown="'image'"></div>
          <div class="article-info">
            <div><router-link 
              :to="{name:'article',params:{id:article._id}}"
              class="title">{{article.title}}</router-link>
            </div>
            <div class="content" v-html="article.content" v-markdown="'card'"></div>
            <div><router-link 
              :to="{name:'article',params:{id:article._id}}"
              class="readmore">阅读更多</router-link>
            </div>
          </div>
        </div>
       <ul class="info">
          <li class="date"><i class="fa fa-clock-o"></i>{{article.date}}</li>
          <li class="like"><i class="fa fa-heart-o"></i>{{article.like}}</li>
          <li class="view"><i class="fa fa-eye"></i>{{article.view}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "md测试",
      content: "",
      state: "",
      articles: []
    };
  },
  methods: {
    save: function() {
      let self = this;
      const article = {
        title: this.title,
        content: this.content,
        date: new Date(),
        like: 0,
        view: 0
      };
      this.$http
        .post("/api/saveArticle", {
          article: article
        })
        .then(res => {
          self.state = res.data;
        });
    },
    get: function() {
      let self = this;
      this.$http.get("/api/articleList").then(res => {
        self.articles = res.data;
      });
    }
  },
  mounted() {
    this.get();
  }
};
</script>
<style lang="scss" scoped>
.item {
  display: inline;
}

.card {
  //transition: 0.2s all ease;
  display: inline-block;
  padding: 10px 20px;
  margin: 10px 20px;
  background: white;
  box-shadow: 0px 5px 10px lightgray;
  width: 40%;
}

.article {
  display: flex;
  justify-content: space-between;
}

.article-info {
  width: 70%;
}

.title {
  font-size: 1.5em;
  color: #2c3e50;
  transition: 0.2s color ease;
}

.title:hover {
  color: rgb(115, 206, 30);
}

.image {
  height: 100px;
  overflow: hidden;
}

.content {
  /*缩进*/
  text-indent: 22px;
  /*显示三行内容，多余的用...替代*/
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  color: #2c3e50;
}

.readmore {
  display: none;
}

@media screen and (max-width: 768px) {
  .card {
    width: 85%;
  }

  .image {
    width: 150px;
    height: 100px;
    overflow: hidden;
  }

  .readmore {
    margin-top: 30px;
    display: inline-block;
    background: #2c3e50;
    color: #40b1f2;
    padding: 10px 15px;
    border: 1px solid #2c3e50;
    transition: 0.3s all ease;
  }

  .readmore:hover {
    border: 1px solid #40b1f2;
    background: white;
    color: #40b1f2;
  }

  .content {
    display: none;
  }
}

.info {
  border-top: 1px solid lightgray;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  padding-top: 10px;
}

li {
  margin-right: 5px;
}

.date {
  color: rgb(94, 177, 224);
}

.like {
  color: #ea6f5a;
}

.view {
  color: gray;
}
</style>
