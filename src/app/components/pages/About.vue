<template>
  <div><!-- Main Container -->
    <div class="container">
      <div class="content">
        <h1>About</h1>
        <div class="inner_content">
          <p>
            Rochester, New York based aspiring creative developer, studied New Media &amp; Interactive Development earning a bachelors of science undergraduate degree at RIT. I enjoy the challenge of developing solutions for the web, turning designs into full fledged interactions. I'm curious about how cool websites work, the future of the web experience, and experimental front end technologies like web vr. 
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
    margin: 0 8%;
    h1{
      font-family: 'InterUI', sans-serif;
      font-weight: 700;
      font-size: 3.75vw;
      line-height: 1;
    }
    div{
      // width: 60%;
      margin: 0 15% 0 20%;
      // text-align: center;
      // margin: 0 auto;
      // user-select: none;
    }
  }
}
</style>
