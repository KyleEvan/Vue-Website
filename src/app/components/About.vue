<template>
  <div><!-- Main Container -->
    <div class="container">
      <div class="content">
        <h1>About</h1>
        <div class="inner_content">
          <p>
            Aspiring creative developer from Rochester, New York studied New Media &amp; Interactive Development at RIT. I enjoy the challenge of developing solutions for the web while turning designs into full fledged interactions. I'm most curious about how cool websites work, development workflows, and experimental front end technologies like web VR.
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'about',

    data(){
      return {
        msg: 'about me and stuff'
      }
    }
  }
</script>

<style lang="scss" scoped>

.container{
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;

  .content{

    h1{
      font-family: 'InterUI', sans-serif;
      font-weight: 700;
      font-size: 5vw;
    }
    .inner_content{
      padding: 4em 0;
    }
    // div{
    //   width: 60%;
    //   text-align: center;
    //   margin: 0 auto;
    //   // user-select: none;
    //
    //
    // }

  }
}

</style>
