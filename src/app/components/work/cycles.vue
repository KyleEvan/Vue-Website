<template>

  <work-template :project="project" :events="events" :class="`${className}`">


    <!-- Title: -->
    <template slot="title">
      {{title}}
    </template>

    <!-- Aside Main Content -->
    <template slot="asideContent">
      <section>
        <p>
          The first game I ever developed <i>Cycles</i> is a simple 2D desktop web game designed to help users practice and learn basic multiplication skills. It has an 8-bit theme and was inspired by old computer games. I worked on this as a personal project for my Rich Media in Web Applications class. It uses no libraries, has no dependencies and was created with plain Javascript, Canvas API, HTML, and CSS.
        </p>

      </section>
    </template>

    <!-- Carousel slides -->
    <template slot="slides">
      <div class="carousel-cell" v-for="image in project_images">
        <img :src="image" alt="" />
      </div>
    </template>

    <template slot="extra">

      <!-- Gameplay -->
      <section class="split">
        <div>
          <h2>Gameplay</h2>
          <p>
            The player must survive longer than the computer driving a vehicle(cycle) without crashing. Colored lines are drawn in the wake of each cycle and those lines create new barriers for the player and the computer. Cycles accelerate on their own, it only requires the player to change the direction (up, down, left, right) by solving an arithmatic problem. Math operations in the center of the screen are positioned respective to the direction the cycle will be turned.
          </p>
        </div>
        <div class="gif">
          <img :src="gameplay_gif" alt="Cycles gameplay preview"/>
        </div>
      </section>


      <!-- Links -->
      <section>
        <h2>Links</h2>
        <ul class="links-list">
          <li>
            <h3>GitHub Project</h3>
            <p>
              Contains more detailed instructions on how to play the game.
            </p>
            <a target="_blank" :href="links.github" class="link-btn">Cycles</a>
          </li>
          <li class="show-desktop">
            <h3>Play the Game</h3>
            <p>
              (WARNING: This game does not work on mobile or tablet. Requires keyboard)
            </p>
            <a target="_blank" :href="links.game" class="link-btn">Play Cycles</a>
          </li>
        </ul>
      </section>

    </template>



  </work-template>
</template>

<script>
  import workTemplate from './work-template.vue';

  export default {
    props: ['project', 'images', 'events'],
    data () {
      return {
        title: 'Cycles',
        className: 'cycles',
        links: {
          github: 'https://github.com/KyleEvan/Cycles',
          game: 'https://kyleevan.github.io/Cycles/'
        },
      }
    },
    components:{
      'work-template': workTemplate
    },
    computed:{
      project_images: function(){
        let images = this.$props.images.sized;
        return [
          images.cycles_start,
          images.cycles,
          images.cycles_gameover,
        ];
      },
      gameplay_gif: function(){
        return this.$props.images.all.cycles_gameplay[this.$props.images.currentBreakpoint];
      }

    }
  }
</script>



<style lang="scss">

</style>
