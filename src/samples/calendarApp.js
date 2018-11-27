// Code Sample
exports.calendarApp = [
  {
    html: `
          &lt;!--

          Calendar Application for Excellus and Univera

          by kyle peterson


             Load application dependencies


          In production the dependencies are hosted on the server
          and included in the page using proprietary cms includes.
          I've added them below for reference

          Dependencies:

            &lt;link href=&quot;https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.8.0/fullcalendar.min.css&quot; rel=&quot;stylesheet&quot; /&gt;
            &lt;script src=&quot;https://rawgit.com/moment/moment/2.18.1/min/moment.min.js&quot;&gt;&lt;/script&gt;
            &lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.8.0/fullcalendar.min.js&quot;&gt;&lt;/script&gt;
            &lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.8.0/gcal.min.js&quot;&gt;&lt;/script&gt;

          --&gt;

          &lt;!--

              HTML

          --&gt;

          &lt;!-- Modal --&gt;
          &lt;div aria-labelledby=&quot;Event Details Dialog&quot; class=&quot;modal fade&quot; id=&quot;eventModal&quot; role=&quot;dialog&quot; tabindex=&quot;-1&quot;&gt;
            &lt;div class=&quot;modal-dialog&quot;&gt;&lt;!-- Modal content--&gt;
              &lt;div class=&quot;modal-content&quot;&gt;&lt;button aria-label=&quot;Close Dialog&quot; class=&quot;close&quot; data-dismiss=&quot;modal&quot; tabindex=&quot;0&quot; type=&quot;button&quot;&gt;&times;&lt;/button&gt;
                &lt;div class=&quot;modal-body&quot;&gt;&lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;

          &lt;div id=&quot;app&quot;&gt;
            &lt;div class=&quot;fc fc-unthemed fc-ltr&quot; id=&quot;calendar&quot;&gt;&lt;/div&gt;
            &lt;div id=&quot;events&quot;&gt;
              &lt;h2&gt;Upcoming Events&lt;/h2&gt;
              &lt;div&gt;
                &lt;ul class=&quot;events_list&quot;&gt;&lt;/ul&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          `
  },
  {
    css: `
         /*

            Application Styles

         */

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          #app{
            position: relative;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            flex-flow: column;
            margin: 2rem 0 4rem 0;
          }

          /* Calendar */
          #calendar{
            width: 100%;
          }
          #calendar &gt; div:first-child{
            margin:0;
            border-radius: 4px 4px 0px 0px;
          }
          #calendar.excellus &gt; div:first-child{
            background-color: #007ac3;
            color: #fff;
          }
          #calendar.excellus button.fc-button {
            color: #fff;
          }
          #calendar.univera &gt; div:first-child{
            background-color: #d7df25;
            color: #333;
          }
          #calendar.univera button.fc-button {
            color: #333;
          }
          #calendar &gt; div:first-child &gt; div &gt; h2{
            font-size: 1.75rem;
            font-weight:600;
          }
          #calendar .fc-event{
            cursor: pointer;
          }
          #calendar .fc-event &gt; *,
          .events_list &gt; li &gt; a *{
            pointer-events: none;
          }
          #calendar .fc-toolbar{
            position:relative;
          }
          #calendar .fc-toolbar .fc-center{
            position:absolute;
            top:50%;
            left:50%;
            transform:translateX(-50%) translateY(-50%);
          }
          #calendar .fc-toolbar .fc-left{
            float: left;
          }
          #calendar .fc-toolbar .fc-right{
            float: right;
          }
          #calendar .fc-toolbar .fc-left,
          #calendar .fc-toolbar .fc-right{
            position: relative;
            display: inline-block;
            padding-bottom: calc(3rem + 28px);
            height: 0;
          }
          #calendar .fc-toolbar .fc-left:hover,
          #calendar .fc-toolbar .fc-right:hover{
            background: rgba(255,255,255,.25);
          }
          #calendar button.fc-button {
            background: transparent;
            box-shadow: none;
            text-shadow: none;
            border: 0;
            padding: 0 1rem;
            height: calc(3rem + 28px);
          }
          #calendar .fc-icon.fc-icon-right-single-arrow,
          #calendar .fc-icon.fc-icon-left-single-arrow{
            width: 24px;
            height: 100%;
            line-height: 1;
            top: 0px !important;
          }
          #calendar .fc-icon-right-single-arrow::after,
          #calendar .fc-icon-left-single-arrow::after{
            font-family: Fontawesome;
            position: absolute;
            display:inline-block;
            font-size:24px !important;
            top: 50%;
            text-align: center;
            transform: translateY(-50%);
          }
          #calendar .fc-icon-right-single-arrow::after{
            content:'&#92;f054';
            right:0;
          }
          #calendar .fc-icon-left-single-arrow::after{
            content:'&#92;f053';
            left:0;
          }

         /* Upcoming Events List */
         #events{
           width: 100%;
           border: 1px solid #ddd;
           position: relative;
           margin-top: 5%;
           right: 0;
           height: 100%;
           border-radius: 4px 4px 0px 4px;
           overflow: hidden;
         }
         #events &gt; div{
           overflow-y: scroll;
           overflow-x: hidden;
         }
         #events h2{
           width: 100%;
           margin: 0;
           padding: 1.5rem;
           font-size: 1.75rem;
           border-bottom: 1px solid #eee;
           position: absolute;
           top: 0;
           left: 0;
         }
         #events .events_list{
           list-style:none;
           padding:0;
           margin: 0;
         }
         #events .events_list h3{
           margin: 0;
           font-size: 16px;
           font-weight: 600;
           opacity: .8;
           line-height: 1.4;
         }
         #events .events_list &gt; li{
           animation: .4s ease-in 0s 1 fadeIn;
         }
         #events .events_list &gt; li#no-events{
           padding: 1.5em;
         }
         #events .events_list &gt; li &gt; a{
           border-bottom: 1px solid #eeeeee;
           position: relative;
           display: flex;
           align-items: center;
           padding: 1.5em 1em 1.5em 0;
           cursor: pointer;
           color: #221f1f;
         }
         #events .events_list &gt; li &gt; a:hover,
         #events .events_list &gt; li &gt; a:focus,
         #events .events_list &gt; li &gt; a:active{
           background-color: rgba(207, 226, 248, .5);
           color: #004a77;
           opacity: 1;
           text-decoration: none;
         }
         #events .events_list &gt; li:last-child &gt; a{
           border-bottom:none;
         }
         #events .events_list &gt; li &gt; a &gt; div{
            font-weight: 600;
            width: 30%;
            color: #007ac3;
            opacity: .7;
          }
          #events .events_list &gt; li &gt; a &gt; div span{
            display: block;
            text-align: center;
            font-size: 1.2rem;
            padding: .1rem 0;
          }
          #events .events_list &gt; li &gt; a &gt; div span:last-child{
            font-size: 2.15rem;
            line-height: 1;
          }
          #events .events_list &gt; li &gt; a &gt; ul{
            width: 70%;
            padding:0;
            margin:0;
            list-style:none;
            position: relative;
          }
          #events .events_list &gt; li &gt; a &gt; ul &gt; li{
            padding: .33rem;
          }
          #events .events_list &gt; li &gt; a &gt; ul &gt; li:nth-child(n+2){
            opacity: .7;
          }
          #events .events_list &gt; li &gt; a &gt; ul &gt; li.time::before{
            font-family: Fontawesome;
            content: '&#92;f017';
            display: inline-block;
            margin-right: .5em;
          }

          /* Modal */
          #eventModal.modal.fade .modal-dialog {
            -webkit-transform: translate(0, 10%);
                    transform: translate(0, 10%);
            -webkit-transition: -webkit-transform 0.4s cubic-bezier(.24,.3,.23,1.06);
            transition: -webkit-transform 0.4s cubic-bezier(.24,.3,.23,1.06);
            transition: visibility 0s linear 0.4s, transform 0.4s cubic-bezier(.24,.3,.23,1.06);
            transition: visibility 0s linear 0.4s, transform 0.4s cubic-bezier(.24,.3,.23,1.06), -webkit-transform 0.4s cubic-bezier(.24,.3,.23,1.06);
          }
          #eventModal.modal.in{
            pointer-events: auto;
            visibility: visible;
          }
          #eventModal.modal.in .modal-dialog {
            -webkit-transform: translate(0, 0%);
                    transform: translate(0, 0%);
            transition: visibility 0s linear 0s, transform 0.4s cubic-bezier(.24,.3,.23,1.06);
            transition: visibility 0s linear 0s, transform 0.4s cubic-bezier(.24,.3,.23,1.06), -webkit-transform 0.4s cubic-bezier(.24,.3,.23,1.06);
          }
          #eventModal.modal{
            display: flex !important;
            padding: 0 !important;
            pointer-events:none;
            visibility: hidden;
            justify-content: center;
            align-items:center;
            flex-flow: column;
          }
          #eventModal.modal.in{
            pointer-events: auto;
          }
          #eventModal .modal-dialog{
            margin: 0 auto !important;
            max-width: 100%;
          }
          #eventModal .modal-content{
            border-radius:4px;
            overflow:hidden;
          }
          #eventModal .modal-body{
            padding:0;
          }
          #eventModal .modal-body ul{
            list-style:none;
            padding:0;
          }
          #eventModal button.close{
            cursor: pointer;
            width: 50px;
            height: 50px;
            background: transparent;
            border: 0;
            -webkit-appearance: none;
            position: absolute;
            z-index: 10000;
            display: block;
            left: 0;
            top: 0;
            float: none;
            text-shadow: none;
            font-size: 40px;
            line-height: 0px;
            font-weight: 400;
            color: #000;
            opacity: 0.5;
          }
          #eventModal button.close:hover{
            opacity:1;
          }
          #event_content{
            padding: 4rem 3rem 3rem 3rem;
          }
          #event_content h3{
            margin-top:0;
            font-weight: 600;
            font-size: 1.375rem;
            margin-bottom: 1rem;
          }
          #event_details li{
            padding:.2rem 0;
          }
          #map{
            width:100%;
            height:300px;
          }


          div.fc-popover.fc-more-popover{
            width: 60% !important;
            border-radius: 4px;
            overflow: hidden;
          }
          div.fc-header.fc-widget-header{
            padding: .75em !important;
            display: flex;
            align-items: center;
          }
          span.fc-close.fc-icon-x{
            float: left !important;
            margin-right: 1em;
            display: inline-block;
            font-size: 1em !important;
            min-width: 1em;
            height: 1em;
          }

          @media (max-width: 34em){
            .events_list &gt; li &gt; a{
              flex-flow: column;
              padding: 1.5em !important;
            }
            #events .events_list &gt; li &gt; a &gt; div span:first-child{
              font-size: 1.6em;
            }
            #events .events_list&gt;li&gt;a&gt;div span:last-child{
              font-size: 2.6em;
            }
            #events .events_list&gt;li&gt;a&gt;div{
              padding-bottom: 1.5em;
            }
            #events .events_list&gt;li&gt;a&gt;ul{
              width: 100%;
            }
          }
          @media (min-width: 52em){
            #app{
              flex-flow: row;
            }
            #events{
              width: 40.33%;
              position: absolute;
              margin-top: 0;
            }
            #calendar{
              width: 56.66%;
            }
          }
          `
  },
  {
    js: `
        /*

          Application JavaScript

        */

        &quot;use strict&quot;;

        ;(function(){
          var debug = false;
          var geocoder, googleMap, calendarID, currentTabEl, popover_close, calendarClass;
          // GLOBALS
          var CALENDAR = $('#calendar');
          var MODAL = $('#eventModal');
          var MODAL_BODY = document.querySelector('.modal-body');
          var EVENTS_LIST_CONTAINER = document.getElementById('events').querySelector('div');
          var EVENTS_LIST = document.querySelector('.events_list');
          var EVENT_COLOR = '#000000';
          var EVENT_BACKGROUND = '#ed8b00';
          // Excellus/Univera Keys
          var KEYS = {
            googleKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            Excellus: {
              googleCalendarID: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX@group.calendar.google.com'
            },
            Univera: {
              googleCalendarID: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX@group.calendar.google.com'
            }
          };
          var keycodes = {
            SPACE: 32,
            ENTER: 13,
            ESCAPE: 27,
            TAB: 9
          };

          // IE forEach polyfill
          if (window.NodeList &amp;&amp; !NodeList.prototype.forEach) {
            NodeList.prototype.forEach = function (callback, thisArg) {
                thisArg = thisArg || window;
                for (var i = 0; i &lt; this.length; i++) {
                    callback.call(thisArg, this[i], i, this);
                }
            };
          }

          // Used to append Google script tag with key to head
          function loadScript(key) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            document.getElementsByTagName('head')[0].appendChild(script);
            script.setAttribute('async','');
            script.setAttribute('defer','');
            script.src = 'https://maps.googleapis.com/maps/api/js?key='+key;
          }
          loadScript(KEYS.googleKey);

          var URL = window.location.href;
          var excUrl = (URL.indexOf('excellusbcbs.com') &gt; -1);
          var uniUrl = (URL.indexOf('univerahealthcare.com') &gt; -1);
          if(excUrl){
            calendarID = KEYS.Excellus.googleCalendarID;
            calendarClass = 'excellus';
          } else if (uniUrl){
            calendarID = KEYS.Univera.googleCalendarID;
            calendarClass = 'univera';
          }
          CALENDAR[0].setAttribute('class', calendarClass);


          function configEventsList(){
            var events = document.getElementById('events');
            var eventsTitleHeight = events.querySelector('h2').clientHeight;
            EVENTS_LIST_CONTAINER.style.marginTop = eventsTitleHeight+'px';
            EVENTS_LIST_CONTAINER.style.height = 'calc(100% - '+eventsTitleHeight+'px)';
          }
          configEventsList();

          function noScrollBody(){
            document.body.style.overflow = 'scroll';
            document.documentElement.style.overflow = 'hidden';
          }
          function restoreScrollBody(){
            document.body.style.overflow = &quot;unset&quot;;
            document.documentElement.style.overflow = &quot;scroll&quot;;
          }
          function ifEmpty(cont){
            if (cont == null || cont == ''){
              return true;
            }
            else{
              return false;
            }
          }
          var setIds = function(event, element){
            // Strip href
            element.attr('href', '#');
            element.attr('id', 'event'+event._id);
          }
          function setButtonLabels(){
            var calendarButtons = document.querySelectorAll('.fc-button');
            calendarButtons.forEach(function(button, index){
              var attr;
              index == 0 ? attr = 'prev' : attr = 'next';
              button.setAttribute('aria-label', attr + ' month');
              button.setAttribute('tabindex', '0');
            });
          }
          function addElement(el, html, id){
            var elem = document.createElement(el);
            elem.innerHTML = html;
            if(id) elem.setAttribute('id', id);
            return elem;
          }
          function addMoreFunctionality(moreTags){
            if(moreTags[0]){
              for(var i = 0; i &lt; moreTags.length; i++){
                moreTags[i].setAttribute('tabindex', '0');
                moreTags[i].setAttribute('role', 'button');
                moreTags[i].setAttribute('aria-label', 'show more events popover');
                var callback = function(e){
                  var key = e.key ? e.key : e.keyCode;
                  if (e.type == &quot;click&quot; || key === keycodes.SPACE || key === ' ' || key == keycodes.ENTER || key === 'Enter') {
                    e.preventDefault();
                    currentTabEl = e.target;
                    if(key === keycodes.SPACE || key === ' ' || key == keycodes.ENTER || key === 'Enter') e.target.click();
                  }
                }
                moreTags[i].addEventListener('click', function(e){
                  callback(e);
                });
                moreTags[i].addEventListener('keydown', function(e){
                  callback(e);
                });
              }
            }
          }

          // https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
          function trapFocus(element) {
            var focusableEls = element.querySelectorAll('a[href], .fc-close, button, textarea, input[type=&quot;text&quot;], input[type=&quot;radio&quot;], input[type=&quot;checkbox&quot;], select');
            var firstFocusableEl = focusableEls[0];
            var lastFocusableEl = focusableEls[focusableEls.length - 1];

              element.addEventListener('keydown', function(e) {
              var isTabPressed = (e.key === 'Tab' || e.keyCode === keycodes.TAB);
              if (!isTabPressed) {
                  return;
              }
              if ( e.shiftKey ) /* shift + tab */ {
                  if (document.activeElement === firstFocusableEl) {
                      lastFocusableEl.focus();
                      e.preventDefault();
                  }
              } else /* tab */ {
                  if (document.activeElement === lastFocusableEl) {
                      firstFocusableEl.focus();
                      e.preventDefault();
                  }
              }
             });
          }
          function watchPopover(){
            var observe = function(){
              var view = document.querySelector('.fc-view');
              var config = {
                attributes: false,
                childList: true,
                subtree: true
              };
              observer.observe(view, config);
            }
            var callback = function (mutationsList){
              for(var m = 0; m &lt; mutationsList.length; m++){
                var mutation = mutationsList[m];
                if (mutation.type == 'childList'){
                  if(mutation.addedNodes[0]){
                    var isPopover = mutation.addedNodes[0].classList.contains('fc-popover');
                    if(isPopover){
                      this.disconnect();
                      // popover
                      var popover = mutation.addedNodes[0];
                      popover.setAttribute('tabindex', '-1');
                      popover.setAttribute('role', 'dialog');
                      popover.setAttribute('aria-label', 'showing all events for this day');
                      // close button
                      if(!popover_close) popover_close = popover.querySelector('.fc-close');
                      popover_close.setAttribute('tabindex', '0');
                      popover_close.setAttribute('aria-label', 'close popover');
                      popover_close.addEventListener('keydown', function(e){
                        var key = e.key ? e.key : e.keyCode;
                        if(key === keycodes.SPACE || key === ' ' || key === keycodes.ENTER || key === 'Enter'){
                          e.preventDefault();
                          e.target.click();
                        }
                      });
                      window.addEventListener('keydown', function(e){
                        var key = e.key ? e.key : e.keyCode;
                        if(key === 'Escape' || key == keycodes.ESCAPE){
                          e.preventDefault();
                          popover_close.click();
                        }
                      });
                      trapFocus(popover);
                      popover.focus();
                      observe();
                    }
                  }
                  if(mutation.removedNodes[0]){
                    var isPopover = mutation.removedNodes[0].classList.contains('fc-popover');
                    if(isPopover) currentTabEl.focus();
                    if(popover_close) popover_close = null;
                  }
                }
              }
            }
            // Mutation Observer detects modal body child node changes
            var observer = new MutationObserver(callback);
            observe();
          }
          var getEvents = function(view){
            if(debug) console.log('get events');
            // Clear list content
            EVENTS_LIST.innerHTML = '';
            EVENTS_LIST_CONTAINER.scrollTop = 0;
            setButtonLabels();
            // Get Events for the month
            var events = CALENDAR.fullCalendar('clientEvents');
            // Sort events by date
            events.sort(function(a, b){
              var date1 = a.start, date2 = b.start;
              return date1 - date2;
            });
            // New list content
            var html = document.createDocumentFragment();
            if (events[0] != null) {
              for(var i = 0; i &lt; events.length; i++){
                var event = events[i];
                // Create Event list item
                var newEvent = addElement('li', &quot;&lt;a role='button' id='&quot;+ event._id +&quot;' href='#' tabindex='0' aria-label='open event dialog'&gt;&lt;/a&gt;&quot;);
                var newEventDetails = document.createElement('ul');
                // Date
                if(event.start){
                  var date = addElement('div', '&lt;span&gt;'+event.start.format('MMM')+'&lt;/span&gt;&lt;span&gt;'+event.start.format('D')+'&lt;/span&gt;');
                  newEvent.children[0].appendChild(date);
                }
                // Title of Event
                if(event.title){
                  var title = addElement('li', '&lt;h3&gt;'+event.title+'&lt;/h3&gt;');
                  newEventDetails.appendChild(title);
                }
                // Location
                if(event.location){
                  var location = addElement('li', event.location);
                  newEventDetails.appendChild(location);
                }
                // Time
                if(event.start &amp;&amp; event.end){
                  var time = addElement('li', '&lt;span&gt;'+event.start.format('LT')+'&lt;/span&gt; - &lt;span&gt;'+event.end.format('LT')+'&lt;/span&gt;');
                  var className = 'time';
                  if(time.classList){
                    time.classList.add(className);
                  }
                  else{
                    var arr = time.className.split(&quot; &quot;);
                    if(arr.indexOf(className) == -1){
                      time.className += &quot; &quot; + className;
                    }
                  }
                  newEventDetails.appendChild(time);
                }
                newEvent.children[0].appendChild(newEventDetails);
                html.appendChild(newEvent);

                // Add event listeners
                document.getElementById('event'+event._id).addEventListener('click', function(e){
                  currentTabEl = e.target;
                });
                newEvent.children[0].addEventListener('click', function(e){
                  e.preventDefault();
                  currentTabEl = e.target;
                  var id = '#event'+this.getAttribute('id');
                  $(id).trigger('click');
                });
              }
            }
            else{
              // If no events for the month
              var message = addElement('li', '&lt;strong&gt;No upcoming events this month&lt;/strong&gt;', 'no-events');
              html.appendChild(message);
            }
            // Add accessibility functionality to more tags if they exist
            var moreTags = [].slice.call(document.querySelectorAll('a.fc-more'));
            addMoreFunctionality(moreTags);
            watchPopover();
            EVENTS_LIST.appendChild(html);
          };

          function initMap(map, location){
            var initialized = false;
            geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': String(location) }, function(results, status) {
              if (status == 'OK') {
                var latlng = results[0].geometry.location;
                var mapOptions = {
                  zoom: 12,
                  center: latlng,
                  mapTypeControl: true,
                  mapTypeControlOptions:{
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    position: google.maps.ControlPosition.TOP_RIGHT
                  }
                }
                googleMap = new google.maps.Map(map, mapOptions);
                googleMap.addListener('tilesloaded', function() {
                  if(!initialized){
                    initialized = !initialized;
                  }
                });
                var marker = new google.maps.Marker({
                  position: latlng,
                  map: googleMap
                });
              }
              else{
                console.log('Geocode was not successful for the following reason: ' + status);
              }
            });
          }

          var openModal = function (event, jsEvent, view) {
            noScrollBody();
            jsEvent.preventDefault();
            var modalEvent, html, eventContent, eventDetails, map, title, description, address, date, time;
            html = document.createDocumentFragment();
            modalEvent = {
              title: event.title,
              location: event.location,
              description: event.description,
              date: event.start.format('dddd, MMMM D, YYYY'),
              time: {
                start: event.start.format('LT'),
                end: event.end.format('LT')
              },
            };
            /* Clear modal contents */
            MODAL_BODY.innerHTML = '';
            // Map
            if(modalEvent.location){
              map = addElement('div', '', 'map');
              html.appendChild(map);
            }
            // Modal Event Content Container
            eventContent = addElement('div', '', 'event_content');
            html.appendChild(eventContent);
            // Event Title
            if(modalEvent.title){
              title = addElement('h3', modalEvent.title);
              eventContent.appendChild(title);
            }
            // Description
            if(modalEvent.description){
              description = addElement('p', modalEvent.description);
              eventContent.appendChild(description);
            }
            // UL of extra details
            eventDetails = addElement('ul', '', 'event_details')
            eventContent.appendChild(eventDetails);
            // Location
            if(modalEvent.location){
              address = addElement('li', modalEvent.location);
              eventDetails.appendChild(address);
            }
            // Date
            if(modalEvent.date){
              date = addElement('li', modalEvent.date);
              eventDetails.appendChild(date);
            }
            // Time
            if(modalEvent.time.start &amp;&amp; modalEvent.time.end){
              time = addElement('li', '&lt;span&gt;'+modalEvent.time.start+'&lt;/span&gt; - &lt;span&gt;'+modalEvent.time.end+'&lt;/span&gt;' );
              eventDetails.appendChild(time);
            }
            MODAL_BODY.appendChild(html);
            if(modalEvent.location) initMap(map, modalEvent.location);
            // Open Modal
            MODAL.modal();
          };

          function handleModalFocus(){
            MODAL.on('show.bs.modal', function (e) {
              $(this).focus();
            });
            MODAL.on('hidden.bs.modal', function () {
              restoreScrollBody();
              if(popover_close){
                popover_close.click();
              }
              if(currentTabEl) currentTabEl.focus();
            });
          }

          function initCalendar(){
            if(debug) console.log('calendar initialized');
            if(!ifEmpty(CALENDAR[0].innerHTML)){
              CALENDAR[0].innerHTML = '';
            }
            CALENDAR.fullCalendar({
              googleCalendarApiKey: KEYS.googleKey,
              height: 'auto',
              events:{
                googleCalendarId: calendarID
              },
              header:{
                left:   'prev',
                center: 'title',
                right:  'next'
              },
              eventTextColor: EVENT_COLOR,
              eventBackgroundColor: EVENT_BACKGROUND,
              eventBorderColor: 'transparent',
              eventRender: setIds,
              eventAfterAllRender: getEvents,
              eventClick: openModal,
              eventLimit: 3,
              eventLimitClick: 'popover'
            });
          }

          function init(){
            if(debug) console.log('initialize app');
            handleModalFocus();
            initCalendar();
          }

          $(document).ready(init);
        })();
        `
  }

];
