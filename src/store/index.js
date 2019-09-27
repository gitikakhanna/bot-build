import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        cart:[],

    }, // this object will store all the data
    mutations:{
        addRobotToCart(state, robot){
            state.cart.push(robot);
        }
    } // changes to data happens in mutations | the 1st parameter is state
});