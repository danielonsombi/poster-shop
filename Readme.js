/*** To run the project use the npm run serve which will run the project on port
 *                       3000 ****  
 *                       To start off the project we can either use the web pack
 *                       to bundle our vue library to the javascript build file
 *                       then include it in the project or like in this case
 *                       install a production ready build in vue since we won't
 *                       be using web pack.
 *
 *                     We therefore need to install the vue module as: ->  npm i
 *                     -S vue@abstract.5.17 - you can use any other version. ->
 *                     This will be installed to the node_modules.  
 *                     -> We then create a script file on the index.html. The
 *                     script file should come just before the custom Script
 *                     file since it will depend on the vue library having
 *                     already loaded before.  
 *                     -> Loaded as: <script type="text/javascript"
 *                     src="node_modules/vue/dist/vue.js"></script>
*/

/************** Devtool **************  
 * Can Install the devtool and once done if you click the component tab, we can
 * view our root vue instance which when clicked, displays the state of our data
 * to its right. What is handy abt the vue devtools, is that it shows the
 * current state of our data and not the initial value.
 *
*/


/****   Filters ********************* Filters are yet another important feature
 * of vue. They are functions that transform vue data for use in the DOM. Are
 * used in text or mustache interpolation or v-bind expressions. Say we have a
 * data property in our vue instance called => message and is a string and we
 * want to interpolate it to a page.  
 *
 * And we also want to transform the first letter to be capitalized. We create a
 * filter called capitalized. This is done by putting a pipe after the
 * expression you want transformed then put a filter after it.
 *
 * To define a filter you can add filter property to the vue config object, then
 * each filter will be a function that takes in the value and returns a
 * transformed value. works the same way for the mustache interpolations and
 * v-bind expressions as : {{ message | capitalize }} and <div v-bind:id="rowId
 * | formatId"></div>
 *
 *
*/



/******** Adding Search Button ****************
 *
 * We then add a search button to allow us to do a search through our products.
 * We do this by first creating a form in our DOM. Since we are not intending to
 * submit any records we will use yet another directive which is used after the
 * submit event which is called prevent. This will prevent the form from
 * submitting when we click on it.
 *
 * We then need an input of type text and this is where our user will key in the
 * search item. We will then need to access the value of this input in JS so as
 * we can send it in the AJAX call to the API. To do this we add a new data
 * property called search initialized as an empty string.
 *
 * We then link it (the search data property) to our input.
 * v-bind:value="Search" will not work since the binding is one way. You can
 * only bind JS to the input and not the other way round(not input to JS.)
 *
 * We could use the keyup by having an eventListener and EventHandler function
 * but there is an easier way to do this. For vue provides a directive
 * specifically for binding inputs which is v-model.
 *
*/


/******* Overview of vue-resource *****************
 *
 * We then add a third party library called vue-resource and it is a client used
 * to make http request and is very useful in doing ajax in our vue app.
 *
 * We could use axios but for smaller projects we can use this library since it
 * integrates very nicely with Vue.
 *
 * First we have to add it to our project via a cdn => <script
 * src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script> On adding the
 * cdn above, the resource becomes an instance property of the vue object. Once
 * set, then from inside any vue method we can access the vue resource using
 * this.$http.<Method being used>('/URL').then(response => {
 *
 })
 * vue-resource also supports promises by using the then() method into which a
 * callback function is passed with a response as the argument. We can then
 * access the body of the response among many other prioperties. The vue
 * resource include the promise polyfil meaning it will work out of the box even
 * in old browsers.
 *
 * The nodejs server we are using also includes an API that will serve the
 * poster objects in a JSON payload that we will use in our project. It can be
 * accessed by the get method using the url /search.
 *
 * To get a response we have to set the search data by updating the url as
 * localhost:3000/search?q=cat for instance.
 *
 *
*/


/********** Searching for the item keyed into the search bar. **
 *
 * First we install the vue resource using npm i -S vue0resource@1.5.1 
 *
 * Then using Ajax calls, we can retrive some poster objects. On searching we
 * get a json response which includes a body with the cat objects. We will
 * delete the objects we had then from the onsSubmit method we will load the
 * objects that are returned from our search.
 *
*/

/************ Update the number of results found upon searching ******** We can
 * add the message "Found {{ products.length }} results for search term <em>{{
 * search }}</em> " to our DOM. This is to be rendered on submit. We therefore
 * need not to interpolate the current search. Instead, we will interpolate the
 * last search which is updated on the submits call back function..
 *
 *
*/

/*********** Adding the Loading Message ********************
 *
 * If loading the data from external servers, the response may not be returned
 * as instance as is in our local server. We will therefore need to include it
 * in our application. To simulate the delay, we will include a setTimeout in
 * our call back.
 *
 * This indicates there is a UX problem when the user presses the search button
 * and this can be resolved by including a loading indicator.
 *
 * 
*/

/***************** Vue Instance - *****************************
 *
 * On creation of a new instance, reactivity and data observation sets up, then
 * templates are compiled then the templates are mounted to the DOM. 
 *
 * This steps happen asyncronously though there are times you can not access the
 * template cause vue is not yet mounted to the DOM.
 *
 * Vue has to trigger code in difference parts of its life cycle to set up life
 * cycle hooks. They are represented by the red boxes of the vue life cycle
 * diagrams. They include mounted, created, Destroyed etc. We need them because
 * if we wanted to manually update a data properties value, if you did it on
 * init, it won't work because reactivity has not yet been setup and such kind
 * of code will have to be created in the created hook.
 *
 * Also if you wanted to create an event listener, if you do it in the created
 * hook, that won't work cause vue hasnot yet compiled the templates. Therefore
 * you've got to do it in the mounted hook.
 *
 * To create a life cycle hook you first decide which one it is then create it
 * as a property of the vue configuration property and then assign a function to
 * it and then vue will call it at the appropriate time.
 *
 * e.g: new Vue({data: {a: 1
 * }
 *
 * created: function() {console.log('a is: ' + this.a)
 * }
 * })
 *
 * The code above will log the "a is 1" but if it was to be under the
 * beforeCreated hook, it will return "a is undefined" since the data properties
 * have not been added to the object context at that point in time.
 *
 *
*/

/****************** Default Search Items *************
 *
 * When accessing the net it doesn't show that there are no items, instead it
 * shows the top sales or some default product upon accessing the site. We will
 * therefore have default search item on our web. We will set the default search
 * value to cat. Setting it to cat only displays it in our search bar but does
 * not display since this far the search only works when the Search button is
 * clicked. We need to execute the search programmatically by utilizing one of
 * vue life cycle hooks. By calling the onsubmit function on the hook.
 *
 *
*/


/*****************   Translations **************************
 *
 * Allows us to add animations whenever elements are added to or removed from
 * the DOM. e.g toggle. It needs both css and vue. CSS classes define the effect
 * like fading in or out or changing color. Vue is used to know when the element
 * is being removed or added to the DOM. Thus we can add or remove some specific
 * classes during transition using vue.
 *
 * For fade - By default, the elements have an opacity of 1 and to make a fade
 * animation, you have to set the opacity of an element to zero before the
 * element is added to the DOM and set it to one as the element is entering the
 * DOM. You can then use CSS's transition to perfom the fade in.
 *
 * .fade-enter-active, .fade-leave-active {transition: opacity .5s;
 * }
 *
 * To fade out you set the opacity to 1 before it leaves the DOM and to zero as
 * it is leaving the DOM as : .fade-enter, .fade-leave-to {opacity: 0;
 * }
 *
 * For transition, wrap the designated element within the transition element as:
 *
 * <div id="demo">
 * <button v-on:click="show = !show">
 *      Toggle
 * </button>
 * <transition name="fade">
 *      <p v-if="show">hello</p>
 * </transition>
 *
 * Not that the name of the transition is set to fade which is the prefix of our
 * class names in the css code. The fade-enter is added to the transition named
 * fade right before the element enters. The fade-leave-to is added right ter
 * the element is removed. Check the DOCs for more info on this. 
 *
 * Note that we can only add transition to elements that are going to be
 * dynamically coming in and out of the DOM. Thus can only work with elements
 * with a v-if or perhaps v-for.
 *
 * Note:  Transitioning a group of elements. When Adding a transition to a group
 * of items, say like the cart items, it is approached differently as opposed to
 * when adding it to a single element using the transition element.
 *
 * A different element need to be used: which is the transion-group. It works
 * similar to the Transition, but as opposed to the earlier, the transition
 * group actually renders to the DOM. By default it renders as a span and hence
 * there is need for addition of the tag ul, thus implying there is no need for
 * the ul tags while using the transaction-group. 
 *
 * We will then move the No items element to the top of the transion group and
 * item, to prevent if from jumping too much when the children are transitioning
 * in and out of the page. 
 *
 *
*/


/*************** How scroll load works **************************
 *
 * Just as the server delays, the delays can also be contributed to by us
 * loading lots of records especially ones with images. It is quite unncessary
 * for us to do it this way cause the user can only see three of the images at
 * the same time.
 *
 * Most of the social media apps like twitter has implemented a feature for
 * scrolling through the threads. Which loads new bunch of results as you scroll
 * down.
 *
 * Scroll Loading means you get page content on demand making the site more
 * responsive and avoid unnecessary loading of content.
 *
 *
 * ** Implementation:  
 * When we do a search we get all the results using Ajax. But we want to render
 * them on demand. So on the callback function of the Ajax call, we assign the
 * result that is in the Ajax.body to the products array. This is where we will
 * make the update to capture the scroll load functionality.
 *
 * One of the tool we will use is the slice method that allows copy a slice of
 * an array. We then have to create a new data property called results and also
 * slice our array to select from result at index 0 to index 3 using the slice
 * method. Having in mind that the last element of the slice method is never
 * included.
 *
 * we can then create a global variable -> LOAD_NUM = 4, outside our vue config
 * object where 4 is the number of items to be loaded while scrolling. We have
 * it as a JS and not a vue property cause we don't want it to be reactive.
 *
 * Most browsers offer an API that allow us to query an element to know whether
 * it is in the viewport or not. We therefore will put an invisible element at
 * the very bottom and use it as a sensor. Once visible we will know that the
 * user has reached the bottom and time to load the next 4 items.
 *
 * To sense that our element has entered the viewport we install a library
 * scrollMonitor which is a simple and fast API to monitor elements as you
 * scroll.
 *
 * ScrollMonitor is not a vue plugin and does not nicely integrate with vue.
 *
 *
*/

/***************** Loading Indicator with v-cloak ************************
 *
 * How a JS Web App Loads:
 *  1. The server delivers the index.html file to the browser. On receiving it
 *     starts passing the file from top to bottom and any html almost loaded
 *     immediately. For the scripts loaded in the page they must be fully
 *     downloaded before they are passed and we will therefore have a delay
 *     between when the page is first rendered and when it is modified by vue.  
 *  2. On the local server we may not see the delay but if deployed to a real
 *     web server, the delay will be noticeable. 
 *
 *  3. To test it we assign our app to the setTimeout(); In the three seconds
 *     before rendering we will see the unpassed markup of our view template
 *     (that is the mostache/curly braces and interpolations.) since the browser
 *     doesn't recognize it.
 *
 *  4. We therefore need to hide the unpassed template  while waiting for vue to
 *     be downloaded. This is done by adding a special directive to the root
 *     element of our app, called v-cloak which does not have any function in
 *     itself but what is useful about it is that vue will remove it the moment
 *     the app has been created.
 *
 *  5. Now before our custom scripts load, the browser will see that attribute
 *     as a custome attribute so we can manipulate this to create a custom CSS
 *     rule that will hide the template before vue runs.
 *
 *  6. By using square brackets, we can specify an attribute as a selector as:
 *     [v-cloak] {  
 *          display: none
 *      }
 *      To it we add the !important property to show that this overrides all the
 *      other css rules that we have set. 
*/




/***************  Move to Project 2. For building a modern component based web
 * app  in a single page application architecture. Here we will cover,
 * components, Slots, vue router, Single file components and custom files and
 * consumers and introduction to web pack for advanced vue development. 
 *
 * For this App we will get the data we will use the OMDb API which is a free
 * resource for movie posters and movie information (www.omdbapi.com). It
 * provides for a search btn in which when a search is done either by title,
 * year etc, it return a response depending on the selected response type.
 *
 *
 * There is an update. With the OMDb API  initially, it could go grab data from
 * the API then use it in our project. But currently it is stored locally in the
 * API offline database. Now instead of going to the OMDB API, we create an end
 * point called offline API that goes and grabs that data locally using the
 * server.js file
 *
 *
 * The impact is, initially we could change the environment file to whatever
 * movies you want but this won't be the case cause the local one is a limited
 * version of the API. Use the provided IDs.
 *
 *
 *
 * */
















