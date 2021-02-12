<template>
  <div id="nav">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/signup">Sign up</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header",

  data: () => ({}),
};
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  padding: 30px;
  background: #a1b5c5;
  ul {
    display: flex;
    list-style: none;
    padding: 0 5em;
    width: auto;
    li {
      margin-right: 3em;
    }
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #424de0;
    }
  }
}
</style>
