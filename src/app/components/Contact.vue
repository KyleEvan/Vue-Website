<template>
  <div class="container">
    <div class="content">

      <h1>Contact</h1>

      <div class="form-container">
        <form method="post" id="reused_form" v-on:submit.prevent="submit($event)">
            <label for="name">Your Name:</label>
            <input id="name" type="text" name="Name" maxlength="50" required>

            <label for="email">Email Address:</label>
            <input id="email" type="email" name="Email" maxlength="50" required>

            <label for="message">Message:</label>
            <textarea id="message" name="Message" rows="10" maxlength="6000" required></textarea>

            <button class="button-primary" type="submit">{{ buttonText }}</button>
        </form>

        <div id="message" v-if="message">
          <template v-if="success">
            <h3>Submitted the form successfully!</h3>
            <p>
              We will get back to you soon.
            </p>
          </template>
          <template v-else>
            <h3>Error</h3>
            <p>
              Sorry there was an error sending your form.
            </p>
          </template>
        </div>

      </div>
      
    </div>
  </div>
</template>

<script>
  // import handlerPHP from 'php-loader!../../forms/handler.php';
  // import fileContent from "../../forms/handler.php";
  export default {
    name: 'contact',
    data () {
      return {
        message: false,
        success: false,
        buttonText: 'Post'
      }
    },
    methods:{
      submit: function(e) {
        console.log("Form has been submitted");
        let form = e.target;
        // console.log(this.toJSONString(form));
        form = this.toJSONString(form);

        this.buttonText = "Sending...";

        fetch("../../php/handler.php", {
           method: 'POST',
           body: form,
           mode: 'no-cors'
        })
        .then( res => console.log(res) )
        .catch( error => console.log(error.message) );

      },
      toJSONString: function( form ) {
        var obj = {};
        var elements = form.querySelectorAll( "input, select, textarea" );
        for( var i = 0; i < elements.length; ++i ) {
          var element = elements[i];
          var name = element.name;
          var value = element.value;
          if( name ) {
            obj[ name ] = value;
          }
        }
        return JSON.stringify( obj );
      },
      after_form_submitted: function(){

      }
    }
  }
</script>
<!--
const Contact = {
      data(){
        return {
          message: false,
          success: false,
          buttonText: 'Post'
        }
      },
      template: `
        <div id="main" class="contact">

          <h1>Contact</h1>

          <div class="form-container">
            <form method="post" id="reused_form" v-on:submit.prevent="submit($event)">
                <label for="name">Your Name:</label>
                <input id="name" type="text" name="Name" maxlength="50" required>

                <label for="email">Email Address:</label>
                <input id="email" type="email" name="Email" maxlength="50" required>

                <label for="message">Message:</label>
                <textarea id="message" name="Message" rows="10" maxlength="6000" required></textarea>

                <button class="button-primary" type="submit">{{ buttonText }}</button>
            </form>

            <div id="message" v-if="message">
              <template v-if="success">
                <h3>Submitted the form successfully!</h3>
                <p>
                  We will get back to you soon.
                </p>
              </template>
              <template v-else>
                <h3>Error</h3>
                <p>
                  Sorry there was an error sending your form.
                </p>
              </template>
            </div>

          </div>
        </div>`
      ,
      methods:{
        submit: function(e) {
          console.log("Form has been submitted");
          let form = e.target;
          // console.log(this.toJSONString(form));
          form = this.toJSONString(form);

          this.buttonText = "Sending...";

          // fetch('handler.php', {
          //    method: 'POST',
          //    body: form,
          //    mode: 'no-cors'
          // })
          // .then( res => console.log(res) )
          // .catch( error => console.log(error.message) );

        },
        toJSONString: function( form ) {
      		var obj = {};
      		var elements = form.querySelectorAll( "input, select, textarea" );
      		for( var i = 0; i < elements.length; ++i ) {
      			var element = elements[i];
      			var name = element.name;
      			var value = element.value;
      			if( name ) {
      				obj[ name ] = value;
      			}
      		}
      		return JSON.stringify( obj );
      	},
        after_form_submitted: function(){

        }
      }
    }; -->
