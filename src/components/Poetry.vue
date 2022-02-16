<template>
  <div class="container">


    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="always" class="card" >
          {{ poetry.content }}
        </el-card>
      </el-col>
    </el-row>

    <el-divider content-position="left">关于该诗句</el-divider>

    <el-collapse v-model="activeName" accordion>
      <el-collapse-item>
        <template slot="title">
          查看完整《{{poetry.origin.title}}》信息<i class="header-icon el-icon-chat-line-square"></i>
        </template>
        <el-descriptions :title="poetry.origin.title">
          <el-descriptions-item label="题">《{{poetry.origin.title}}》</el-descriptions-item>
          <el-descriptions-item label="朝代">{{poetry.origin.dynasty}}</el-descriptions-item>
          <el-descriptions-item label="作者">{{poetry.origin.author}}</el-descriptions-item>
          <el-descriptions-item label="元素">
            <el-tag v-for="tag in poetry.matchTags" :key="tag" type="warning" size="small">{{tag}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="推荐原因"></el-descriptions-item>
        </el-descriptions>

        <p v-for="line in poetry.origin.content" :key="line">{{line}}</p>
        <el-button v-if="poetry.origin.translate" @click="drawer = true" type="primary" style="margin-left: 16px;">
          查看全文翻译
        </el-button>
        <el-drawer
          :title="poetry.origin.title"
          :visible.sync="drawer"
          :with-header="false">
          <span v-for="translate in poetry.origin.translate" :key="translate">{{translate}}</span>
        </el-drawer>
      </el-collapse-item>
    </el-collapse>
    <div class="div-center">
      <el-button type="success" @click="this.getOnePoetry" round>换一个</el-button>
    </div>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: '1',
        drawer: false,
        poetry: {
          id: "5b8b9572e116fb3714e72cb1",
          content: "去岁江南见雪时，月底梅花发。",
          popularity: 1020000,
          origin: {
            title: "卜算子·雪月最相宜",
            dynasty: "宋代",
            author: "张孝祥",
            content: [
              "雪月最相宜，梅雪都清绝。去岁江南见雪时，月底梅花发。",
              "今岁早梅开，依旧年时月。冷艳孤光照眼明，只欠些儿雪。"
            ],
            translate: null
          },
          matchTags: [
            "梅花",
            "晚上"
          ],
          recommendedReason: "",
          cacheAt: "2022-02-13T01:21:59.748518"
        },
      }
    },
    created() {
      // this.getAccessToken()
      // this.getOnePoetry()
    },
    methods: {
      getOnePoetry() {
        this.getAccessToken()

        const result = utools.db.get("accessToken");
        console.log(result)
        this.getAxios('/sentence', null, result.data)
          .then((data) => {
            this.poetry = data.data
          }).catch((error) => {
          this.$notify.info({
            title: '提示',
            message: error.errorInfo
          });
        })
      },

      getAccessToken() {
        if (!utools.db.get("accessToken")) {
          this.getAxios('/info', null, '')
            .then((data) => {
              console.log(data.data)
              const result = utools.db.put({_id: "accessToken", data: data.data.token})
              console.log(result)
              if (result.ok) {
                console.log("token保存成功")
              }
            }).catch((error) => {
            console.log("token获取失败")
          })
        }
      }
    }
  };


</script>

<style>
  .card {
    text-align: center;
    font-size: 21px;
  }

  .div-center {
    text-align: center;
  }

</style>
