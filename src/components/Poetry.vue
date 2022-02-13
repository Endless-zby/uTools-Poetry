<template>
  <div class="container">


    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="always" class="card">
          {{ poetry.content }}
        </el-card>
      </el-col>
    </el-row>
    <el-tag v-for="tag in poetry.matchTags" :key="tag" closable>
      {{tag}}
    </el-tag>
    <div class="div-center">
      <el-button type="success" @click="this.getOnePoetry" round>换一个</el-button>
    </div>


  </div>
</template>
<script>


export default {
  data() {
    return {
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
      }
    }
  },
  created() {
    this.getOnePoetry()
  },
  methods: {
    getOnePoetry() {
      this.getAxios('/one.json', null)
        .then((data) => {
          this.poetry = data.data
          console.log(data.data.matchTags)
          console.log(data.data)
        }).catch((error) => {
        this.$notify.info({
          title: '提示',
          message: '刷慢点'
        });
        console.log('55555555555555')
      })
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
