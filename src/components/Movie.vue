<template>
  <div class="common-layout">
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="search.q" class="input-with-select">
        <el-select v-model="search.lang" slot="prepend" placeholder="语言" style="width: 100px">
          <el-option label="中文" value="Cn"></el-option>
          <el-option label="英文" value="En"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="queryMovie()"></el-button>
      </el-input>
    </div>
    <el-divider></el-divider>
    <el-card v-for="(item,index) in movieDataItem" :key="index" class="box-card" shadow="always">
      <el-container>
        <el-aside width="200px"><img :src="item.data[0].poster" class="el-aside"></el-aside>
        <el-container>
          <el-header class="el-header">
            《{{ item.data[0].name }}》
          </el-header>
          <el-main>
            <div>
              豆瓣ID：{{ item.doubanId }}
            </div>
            <div>
              国家/地区：{{ item.data[0].country }}
            </div>
            <div>
              语言：{{ item.data[0].language }}
            </div>
            <div>
              类型：{{ item.data[0].genre }}
            </div>
            <div>
              简介：{{ item.data[0].description }}
            </div>


          </el-main>
          <el-footer class="el-footer">

              <el-rate
                  v-model.number="item.doubanRating"
                  disabled
                  show-score
                  :max=max
                  disabled-void-color="#EFF2F7"
                  size="large"
                  void-color="#C6D1DE"
                  text-color="#ff9900"
                  score-template="{value} points"
              >
              </el-rate>

          </el-footer>
        </el-container>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import movieData from "../../static/movieData.json"

export default {
  data() {
    return {
      movieDataItem: [],
      max: 10,
      search: {
        q: '',
        lang: 'Cn',
      },

    }
  },

  created() {
    this.movieDataItem = movieData
  },
  methods: {
    queryMovie(){
      this.getAxios('/api/v1/movie/search',this.search)
        .then((data) => {
          this.movieDataItem = data
        console.log('44444444444444')
      }).catch((error => {
        console.log('55555555555555')
      }))
    }
  }
};


</script>




<style scoped>

.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-rate{
  height: 60px;
}
.box-card {
  width: 100%;
  height: 330px;
  margin-bottom: 20px;
  background-color: #606266;
}

.input-with-select {
  background-color: #fff;
}

.el-header, .el-footer {
  background-color: #ffffff;
  text-align: center;
  max-width: 100%;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  max-width: 100%;
  display: block;
}

.el-main {
  background-color: #ffffff;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
