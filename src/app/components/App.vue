<template>
  <div id="app">

    <top-nav></top-nav>

    <!-- Top navigation -->

    <!-- Main website content -->
    <router-view></router-view>


    <!-- Background shapes scene -->
    <scene></scene>
  </div>
</template>

<script>
  // Components
  import TopNav from './TopNav.vue';
  import Scene from './Scene.vue';

  export default {
    name: 'app',
    components: {
      "top-nav": TopNav,
      "scene": Scene
    }
  }
</script>
