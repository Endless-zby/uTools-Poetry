<template>
  <Poetry></Poetry>
</template>
<script>
import Movie from "./components/Movie";
import Poetry from "./components/Poetry";
export default {
  name: 'App',
  components: {Poetry}
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
