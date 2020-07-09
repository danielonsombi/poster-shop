/** We can configure our vue app by adding properties to our configuration
 * object that we pass to the view constructor.  
 * We start off by first telling view the part of the part of the page it owns
 * by using the EL property, i.e we tell it to mount on the element app.
 *
 * We then get vue to mount some text to our template. We do this by creating a
 * data object in our vue config then adding properties to it.
 *
 * Just like angular we can add web functionalities to our template using
 * directives(special properties we add to out html files). Sample directives
 * include v-for, v-if v-model etc.
 *
 * If we use the console to push another item to the groceries array, vue will
 * automatically render to update the change in our data
 *
 * Create a new instance as var app that can be called on the constructor for
 * one to add new data.
 *
 * We then look at components. They extend basic html elements. In order to
 * create your own reusable custom elements we use components.
 *
 * For the custom elements to render  
 *  1. We create the components using the component method of the vue API.
 *  2. Then define a template for the component, e.g using JS String as below.
 *  3. It is then called from our template and the property to be read on the
 *     component is  passed into the template.
 *  4. When calling this component, the title property must be received in our
 *     new component as a property using the props property as below. After
 *     which it will; then be rendered to the DOM.
 *
 * Therefore, Components can be though of many Vue instances with each having
 * its own internal configuration.
 *
 * To the grocery-item component we can add a data property that will allow the
 * user to indicate iof they bought the item in the grocery list as below.  
 * By default, the bought will be set to false but on clicking the item it will
 * toggle the bought property to true or false dependding on the current value.
 *
 * We do this by adding two additional directives to the component template i.e
 *
 *  1. v-on:click eventListening directive which we will use to toggle  
 *  2. v-bind:class to bind a class to this element conditional on bought being
 *      true. 
 * 3. Then have a css that strikes through the bought item and dims the text
 *
 *
*/

/*** Using the grocery-item component below, when creating a template, we use
 *     the javascript  string shown below in ``. The drawback of doing this way
 *     is that it is very awkward when it comes to writting logic in component
 *     templates.   
 *
 *   A better way to define them is by using the single file components. This
 *   allows you put a component in a single file with a .vue extension. which
 *   will still work in the same way.
 *
 * */

 /**  ECOSYSTEM TOOLS ******* These are the optional plugins and libraries for
  * view, which are maintained by the vue core team. They are optional but for
  * some of them they must be in almost all vue projects.  
  *     1. Vue CLI - This is a tool maintained by the core team that helps you
  *     spin up a robust vue development environment in minutes. One of the most
  *     impotarnt aspect of vue cli project is that they include a
  *     pre-configured web pack setup meaning you have a development flow setup
  *     for you out of the box. Allowing you use features like .vue files,
  *     modern JS, type script, sass without havinf to provide any custom
  *     configurations.
  *
  * Single page application architecture allow a single web page to act like a
  * traditional multi page website Web site without the inefficiency of
  * reloading and rebuilding the page every time the user navigates. This works
  * by the view router unloading the current component and then loading in the
  * newly selected component. 
  *
  *     2. Vue DevTools  and Vuex - This helps keep track of the changes and navigations on your project. 
  *     Thus using the vue Devtools we can navigate/revert to the previous state of our data through the 
  *     time travel debugging
  *
 */

 /*** Vue.js Frameworks and plugins. ******************
  *
  * They are not directly maintained by the core team. There are 3 most widely
  * used frameworks.
  *
  * If you want to develop a high performing vue application, then it must be a
  * single page application, to have service side rendering and code splitting
  * and easy to deploy.
  *
  *  1. NUXTjs is one of such high end performing frameworks with all the above
  *     as out of the box features and many other cutting edge features. for
  *     instance it is used on the vuejsdevelopers website 
  *
  * 2. Vuetify - Provides material design in a collection of vue components with
  *    models alerts and nav bars etc. It makes it easier to include UI
  *    components like cards, tabs and form thus dsaving you from having to
  *    develop them from scratch.
  *
  *  3. Unlike React, VUE doenot have any inhouse mobile framework. It only
  *     focuses on its cutting edge web software but to use it as a native
  *     mobile software solution, you can do so using the NativeScript-vue
  *     framework  
  *     -> NativeScript is an API that allows you to write js code to build UI
  *     components for native IOS and Android.  
  *     ->NativeScript-vue is framework on top of NativeScript that allows you
  *     to use vue syntax components with native vue.  
  *
  * The best place to find vue plugins is on the https://github.com/vuejs/awesome-vue.
  *
  *
 */


 /*********************Framework comparison ***************************
  *
  * ** a). REACT: Vue is very similar to react, they are both component based
  * when creating the user interface.  
  *
  * 1. The biggest difference is that React components are created using JSX - a
  *    special extension to JS that allows you write html like syntax in JS
  *    functions. The biggest advantage of JSX is you can get all features of JS
  *    in templates. including Array.Map(), forEch() etc.    
  *    -> Vue can also provide integration with JSX by writting single file
  *    components that include the templates, script file and css.  
  *    -> It may not have the flexibility of JSX, howerver, it is prefered by
  *    many cause it looks and feels like regular web development. Any developer
  *    can look at a vue component and understand what it is and what iot does.
  *
  * ** b) ANGULAR: Angular is considered a monolithic framework whereas vue is
  * considered a lightweight library.
  *
  *  -> Angular takes a centralized approach when it comes to web design. They
  *  expect users to adopt their chosen solutions like typescript and RXJS.
  *  They've also made certain design patterns into the rules of the framework
  *  like Dependency Injection (DI) and Reactive programming paradigm.  
  *  -> Vue on the other hand is a multi centralized flexible approach. Allows
  *  programmers to make majority design decisions by themselves and choose the
  *  path they already know and like.  
  * -> Angular also provides many angular specific modules allowing you to build
  *  apps almost entirely with angular e.g there are core modules that purely
  *  handle http requests, forms and  more.  
  * -> Vue only provides specific modules where it is necessary to integrate
  *  with there reactivity systems like vue router and vuex. The rest like
  *  forms, http clients are provided by either community made plugins or third
  *  party node view plugins. 
  *
  * ** c) JQuery: It is not a framework like the above but is a utility library.
  * Some of the instances where we used jquery can now be handled by vue. Since
  * vue was designed to be good at creating ui components/ building dynamic UIs
  * for the web, it was built to be very good at this one purpose.  
  * -> JQuery on the hand is good because it is designed to be more like a swiss
  * army knife. It does alot including DOM Manipulations, Ajax utilities,
  * promise helpers, animation etc. Thus cannot compete with Vue when it comes
  * to creation of user interfaces.
  *
  *
 */

 /******* */


Vue.component("grocery-item", {
    template: `<li v-on:click="bought = !bought" v-bind:class="{ bought: bought }"> {{ title }} </li>`,
    props: ["title"],
    data: function() {
        return {
            bought: false
        }
    }
});

var app = new Vue ({
    el:'#app',
    data: {
        groceries:["Milk", 'Eggs', 'Toast'],
        message: "You are cool men."
    }
})