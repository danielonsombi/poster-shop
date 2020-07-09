var LOAD_NUM = 4;
var watcher;

//setTimeout(function() {
new Vue({
    //Indicates the element in your page where you want to mount your vue
    //instance. In our case it is the div with id = 'app'. This is because it is
    //its child elements that we want to modify or update. One of the basic
    //thing that JS can do is to render JS data to the DOM. The rendering of the
    //JS code to the page is refered to as interpolation.  
    //Directives are attributes you can add to html tags that have specific/
    //provides certain functionalities. A value added to a directive is
    //processed as a JS expression.

    /** 
     *  1. We have directives like v-bind that binds an html attribute or
     *     property to  JS EXPRESSION. Unlike v-if used as <p v-if = 'seen'> Now
     *     you See</p> the v-bind (<a v-bind:href="url">..</a>), has a colon
     *     after it, followed by another token called the argument which
     *     provides extra info to the directive. Instead of vbind, the
     *     expression will show the property or attribute to which the
     *     expression will be bound to. 
     *
     *  2. Every E-commerce has products and we therefore need to add it to our
     *     data object and for our case it will be an array and we will use ajax
     *     to load in the result from the server. But for this case we can use
     *     soime dummy data.
     *
     *  3. We will then create another data property called cart. In the Dom we
     *     then have the AddToCart method accept a product as an argument by
     *     passing the currently iterated object to the addcart method.
     *     Therefore we need the method with an argument in its function.
     *
     *
     *  4. VUe Reactivity - Consider a case where there is a data property =
     *     message assigned an empty string then the string interpolated to the
     *     DOM then at the bottom of the code a new value is assigned to the
     *     message data property. When the script runs, when the last line runs
     *     vue will observe for any changes on your data and if any, it render
     *     the changes to the DOM. 
     *
     *   5. To increament the quantity we have to create a new object for the
     *      cart items rather than pushing the products into the existing cart.
     *      We will need to do this because we will have unique properties on
     *      both the cart items and the product items.
     *
     *   6. Using the qty property we will increament the qty instead of adding
     *      an item. We do this by using the for loop to iterate through our
     *      cart items for an item similar to the clicked item then increament
     *      its qty. The iteration is done on the script side and not in the
     *      DOM.
     *
     *
     *   7. We will then ensure the output prices are correctly formatted with
     *      two digits after the decimal point and with a dollar sign as the
     *      prefix. We use filters for this.
     *
     *   8. We not only want to increament the items from the products section
     *      by clicking the product but also from the cart itself we need such a
     *      feature. By adding two btns to our DOM.
     *
     *   9. For enhanced UX, First we will empty the list of search results by
     *      setting the product to an empty array as soon as a new search is
     *      submitted.
     *
     * */ 


    el: "#app",
    data: { 
        total: 0,
        products: [
            // {title: "Product 1", id: 1, price: 9.99},
            // {title: "Product 2",  id: 2, price: 9.99},
            // {title: "Product 3", id: 3, price: 9.99}
        ],

        cart: [

        ],

        search: "cat",

        lastSearch: "",

        loading: false,

        results: []
    },

    //Any properties included in the methods object, we will use them as objects
    //in our data. We need to put the this key word because vue binds a context
    //object to all its functions. It is successful by use of this key word. All
    //the data properties and methods that we define in the config i.e new
    //vue({ }) are set as root properties of this context 
    
    //Any properties or variable you refer to in the template though are assumed
    //to be part of the context object and therefore no need to use the
    //this.addToCart. The add to cart will update the total value and also push
    //the product into the cart array.
    methods: {
        addToCart: function(product) {
            this.total += product.price;

            //this.cart.push(product)

            //We wont be pushing the product to cart directly as explained in 5
            //above. So create an object as below:

            //Check for existance of the product in cart as in 6 above.
            var found = false;
            
            for (var i = 0; i < this.cart.length; i++) {                
                if (this.cart[i].id === product.id) {
                    this.cart[i].qty++;
                    found = true;
                }
            }
            if (!found) {
                this.cart.push({
                    id: product.id,
                    title:product.title,
                    price:product.price,
                    qty:1
                });
            }
        },

        inc: function(item) {
            item.qty++;
            item.total += item.price;
        },

        dec: function(item) {
            item.qty--;
            item.total -= item.price;
            //In the decreament we have to watch for the zero to prevent the
            //user from decreamenting beyond the zero product.
            if (item.qty <= 0) {
                var i = this.cart.indexOf(item);
                this.cart.splice(i, 1);
            }
        },

        onSubmit:function() {
            //Empty the products.
            this.products = [];
            this.results = [];
            this.loading = true;


            //We then use vue resource to search for our data. Using the "$"
            //before a property, is common practice for denoting a plugin.
            var path = "/search?q=".concat(this.search);
            //We then have a callback function that is called when the promise
            //ressolves. The response argument passed into the callback function
            //contains the response from the API.
            this.$http.get(path)
            .then(function(response) {
                //We simulate the delay for if the result was from an external
                //server. We set the delay to 3 Milliseconds and also have to
                //bind the this value to the callback so that it can access the
                //vue context objects within the function upon callback.
                //setTimeout(function() {
                    
                //Store the complete results in the results data property then 
                //Display part of the returned results
                    this.results = response.body;
                    //this.products = response.body.slice(0, LOAD_NUM); Goes to
                    //the loader then call the appendResult method instead.
                    this.lastSearch = this.search;  
                    this.appendResults();
                    this.loading = false;                  
                //}.bind(this), 3000);
            });
        },

        appendResults: function() {
            if (this.products.length < this.results.length) {
                //If we assign the new items to the products then it will do a
                //replace we therefore need to create a new variable that will
                //be appending to the current products. The slice will start
                //from pur current prosucts length i.e if no product in list
                //then  0 to 4 + 0, if 4 items then start at 4 to 4 + 4 etc.
                var toAppend = this.results.slice(
                    this.products.length,
                    LOAD_NUM + this.products.length
                );
                this.products = this.products.concat(toAppend);
            }
        } 
    },

    filters: {
        currency: function(price) {
            //We are to add a prefix $ and have to decimal places. Concat will
            //convert the number to a string the concatenate it to the dollar
            //sign.
            return "$".concat(price.toFixed(2));
        }
    },

    created: function() {
        this.onSubmit();
    },

    updated: function() {
        var sensor = document.querySelector('#product-list-bottom')
        //var watcher = scrollMonitor.create(sensor);//Defined in global for
        //beforeUpdate to function
        watcher = scrollMonitor.create(sensor);

        //Now that the watcher is in the vue config we can replace the callback
        //function with the appendResults() method.
        watcher.enterViewport(this.appendResults); 
    },

    //If defined as below, this will through an error since watcher is being
    //called in a scope where it has not been defined yet. so the watcher
    //variable should be intialized the in the global execution context.  
    //Note that the before update is usually called before the updated hook in
    //the cycle and when it is first called watcher will be undefined. So only
    //destroy if watcher exists then set it to null once destroyed.
    beforeUpdate:function() {
        if (watcher) {
            watcher.destroy();
            watcher = null;
        }
    }
});

//},3000); //Terminated timeOut.



/*** 
 *  Since scrollmonitor is not a vue plugin we create a global JS
 *  function/method create() which creates a listener on an element in the page.
 *  and assign it to variable watcher. The create method takes in an argument
 *  which is a DOM element that you want to watch.
 *
 *  Once this is done, the watcher will be watching our element sensor and as
 *  soon as it enters or leaves the viewport it will tell us.
 *
 *  We then use an API of watcher called the enterViewport() which takes a
 *  callback function as an argument, the function is called anytime the element
 *  is in the viewport. In the very first instance, before the products are
 *  loaded the sensor will be in the view port and thus if we log its result it
 *  will be displayed as the first message in our console.;
 *
 *  We will then make our watcher callback so that it adds results to our list
 *  of products. Thus the scrollmonitor must be in communication with vue. We
 *  will do this by creating a new method called appendResults which will copy
 *  more items from the results to the products array.
 *
 *  The question here is how to make the watcher to trigger the AppendResults
 *  method, when it is not within the vue configuration object since we cannot
 *  use the this.appendResults() function here since it is not receiving the vue
 *  context object..
 *
 *  All we need to do is to move the watcher setup code into a life cycle hook
 *  where we have access to the vue context object. We will use two life cycle
 *  hooks the beforeUpdate and updated.
 *
 *  The beforeUpdate is called each and everytime vue is about to make an update
 *  whereas updated is right after vue update. The idea is that we are going to
 *  set the scrollmonitor listener in the updated and destroy it beforeupdate
 *  hook. This is because our sensor element is part of the view template. This
 *  means that when vue modifies the page, we might actually modify our sensor
 *  elements somehow so if we setup a listener on that element, it may get
 *  broken somehow if vue does its operations in the DOM and the best way to
 *  avoid the problems is to use both hooks and continually setup and destroy a
 *  listener so that we ensure vue doesn't mess it up during updates. 
 *
 *
 * 
 * 
 * 
var sensor = document.querySelector('#product-list-bottom')
var watcher = scrollMonitor.create(sensor);

watcher.enterViewport(function() {
    console.log('Sensor has entered the Viewport');
}); 
 *
 *
*/

















