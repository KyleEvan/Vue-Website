<template>

  <work-template :project="project" :events="events" :class="`${className}`">

    <!-- Title: -->
    <template slot="title">
      {{title}}
    </template>


    <!-- Aside main content -->
    <!-- <template slot="asideContent">
      <section>
        

      </section>

    </template> -->

    <!-- carousel slides -->
    <template slot="slides">
      <div class="carousel-cell" v-for="(image, index) in project_images" :key="index">
        <img :src="image" alt="" />
      </div>
    </template>


    <template slot="main-content">
      <p>
        A web browser game made with HMTL5 Canvas. It's an arcade style top down horde survival game. I wrote it with Javascript as a final project for my Rich Media &amp; Web App Dev class. I learned many lessons trying to code this as it became very hard to manage by the end. Seperation of concerns, state management, rudimentary ai in games, game loops, closures, the importance of pure and impure functions, and most importantly consideration of the information architecture and organization that facilitates maintenance and the addition of future features.
      </p>
      <section class="split">
        <div>
          <h2>Gameplay</h2>
          <p>
            The player has to survive the horde of monsters as long as possible, there's no end game, the player will die. A horde counter goes up while a horde timer counts down. At each counter interval a new wave of monsters spawn from the perimeter of the arena and attack the player in various ways. The player must move around the arena avoiding and killing the monsters to survive as long as possible. There are 5 types of monsters: grunts, rushers, archers, sorcerers, and tanks. All have different attributes providing an array of attacks to challenge the player. When theplayer dies, there is a high score listing, however it uses local storage so those will only be cached in the browser.
          </p>
        </div>
        <div class="gif">
          <img :src="gameplay_gif" alt="" />
        </div>
      </section>


      <!-- links -->
      <!-- <section> -->
        <!-- <h2>Links</h2> -->
        <ul class="links-list">
          <li>
            <h2>Proof of Concept</h2>
            <p>
              An earlier version of the game created a proof of concept to demonstrate core mechanics and gameplay. It has all of the main controls and some combat features that didn't make it to the final game. This is a barebones demo with no assets so you can really see how it functions under the hood.
            </p>
            <a target="_blank" :href="links.github1" class="link-btn">GitHub</a>
          </li>
          <li>
            <h2>GitHub Project</h2>
            <p>
              For more information on the controls, gameplay, and features visit the project page on GitHub.
            </p>
            <a target="_blank" :href="links.github2" class="link-btn">Combo Smash</a>
          </li>
          <li class="show-desktop">
            <h2>Play the Game</h2>
            <p>
              (WARNING: This game does not work on mobile or tablet. Requires pointer device and keyboard)
            </p>
            <a target="_blank" :href="links.demo2" class="link-btn">Play ComboSmash</a>
          </li>
        </ul>
      <!-- </section> -->

    </template>

  </work-template>


</template>

<script>
  import workTemplate from './work-template.vue';

  export default {
    props: ['project', 'images', 'events'],
    data () {
      return {
        title: 'Combo Smash',
        className: 'combo-smash',
        links: {
          github1: 'https://github.com/KyleEvan/ComboSmash-v1',
          github2: 'https://github.com/KyleEvan/ComboSmash-v2',
          demo2: 'https://kyleevan.github.io/ComboSmash-v2/',
        }

      }
    },
    components:{
      'work-template': workTemplate,
    },
    computed:{
      project_images: function(){
        let images = this.$props.images.sized;
        return [
          images.comboSmash_preview,
          images.comboSmash_horde,
          images.comboSmash_highScores,
        ];
      },
      gameplay_gif: function(){
        return this.$props.images.all.comboSmash_gameplay[this.$props.images.currentBreakpoint];
      }
    },
    created(){

    },
    updated(){

    },
    mounted(){

    },
    updated(){

    }
  }
</script>



<style lang="scss">
  @import '../../../style/global.scss';
  .combo-smash{

  }

</style>
