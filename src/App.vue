<template>
  <Poetry></Poetry>
</template>
<script>
import Movie from "./components/Movie";
import Poetry from "./components/Poetry";
export default {
  name: 'App',
  components: {Poetry,Movie}
}

utools.onPluginEnter(({code, type, payload}) => {
  console.log('用户进入插件', code, type, payload)

  if (type === 'files') {
    state.path = payload[0].path;
    state.content = readMarkdownFile(state.path)
  } else {
    state.path = ""
    state.content = ""
  }
})
utools.onPluginReady(() => {
  console.log('插件装配完成，已准备好')
})
utools.onPluginOut(() => {
  console.log('用户退出插件')
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
