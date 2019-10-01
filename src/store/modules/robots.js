import axios from 'axios';
export default{
    state:{
        cart:[],
        parts: null,

    }, // this object will store all the data
    mutations:{
        addRobotToCart(state, robot){
            state.cart.push(robot);
        },
        updateParts(state, parts){
            state.parts = parts;
        }
    }, // changes to data happens in mutations | the 1st parameter is state
    getters: {
        cartSaleItems(state){
            return state.cart.filter(item => item.head.onSale);
        }
    },
    actions: {
        getParts({commit}){
            axios.get("/api/parts")
            .then(result => commit('updateParts', result.data))
            .catch(console.error); // once data is retrieved from axios we ll commit that
        },
        addRobotToCart({commit, state}, robot){
            const cart = [...state.cart, robot];
            return axios.post("/api/cart", cart).then(() => commit('addRobotToCart', robot));
        } // for saving data
    } // to make asynchronous call to apis - params can be state, getters, commit, dispatch
}