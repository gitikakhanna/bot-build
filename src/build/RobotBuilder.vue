<template>
    <div class="content">
        <button class="" @click="changesample()">Prop change</button>
        <button class="add-cart" @click="addToCart()">Add to Cart</button>
        <div class="top-row">
            <!-- <div class="top part" :style="[headBorderStyle]"> -->
                <!-- Eg: conditional class binding instead of inline style binding -->
                <!-- :class="{'sale-border':selectedRobot.head.onSale}" -->

                <!-- same can be done using computed properties -->
                <!-- :class="[saleBorderClass]" -->
                <!-- <div class="robot-name">{{selectedRobot.head.title}}
                    <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
                </div>
                <img :src="selectedRobot.head.src" title="head" /> -->
            <PartSelector :parts="availableParts.heads" position="top" @partSelected="part => selectedRobot.head=part" :sample="sampleval"/>
        </div>
        <div class="middle-row">
            <PartSelector :parts="availableParts.arms" position="left" @partSelected="part => selectedRobot.leftArm=part"/>
            <PartSelector :parts="availableParts.torsos" position="center" @partSelected="part => selectedRobot.torso=part"/>
            <PartSelector :parts="availableParts.arms" position="right"  @partSelected="part => selectedRobot.rightArm=part" />
        </div>
        <div class="bottom-row">
            <PartSelector :parts="availableParts.bases" position="bottom" @partSelected="part => selectedRobot.base=part"/>
        </div>
        <div>
            <h1>Cart</h1>
            <table>
                <thead>
                    <tr>
                        <th>Robot</th>
                        <th class="cost">Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(robot, index) in cart" v-bind:key="index">
                        <td>{{robot.head.title}}</td>
                        <td class="cost">{{robot.cost}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import availableParts from '../data/parts';
import createdHookMixin from './created-hook-mixin'
import PartSelector from './PartSelector.vue'

export default {
    name: 'RobotBuilder',
    beforeRouteLeave(to, from, next){
        if(this.addedToCart){
            next(true);
        }else{
            const response = confirm("You have not added robot to card. Are you sure, you want to leave?");
            next(response);
        }
    },
    components:{
        PartSelector
    },
    data(){
        return{
            availableParts,
            addedToCart: false,
            cart: [],
            selectedRobot:{
                head: {},
                leftArm: {},
                rightArm: {},
                torso: {},
                base: {}
            },
            sampleval: "false"
        };
    },
    mixins:[createdHookMixin],
    methods:{
        addToCart(){
            const robot = this.selectedRobot;
            const cost = robot.head.cost + robot.leftArm.cost + robot.torso.cost + robot.rightArm.cost + robot.base.cost;
            this.cart.push(Object.assign({}, robot, {cost}))
            this.addedToCart = true;
        },
        changesample(){
            console.log("executed");
            if(this.sampleval == "true"){
                this.sampleval = "false";
            }
            else{
                this.sampleval = "true";
            }
            
            console.log(this.sampleval);
        }
    },
    computed: {
        headBorderStyle(){
            return{
                border: this.selectedRobot.head.onSale ? '3px solid red':'3px solid #aaa'
            };
        },
        moreStyles(){

        }
        // saleBorderClass(){
        //     return this.selectedRobot.head.onSale?'sale-border':'';
        // }
    }
};
</script>

<style lang="scss">
    .part{
        position: relative;
        width: 165px;
        height: 165px;
        border: 3px solid #aaa;
    }
    .part{
        img{
                width: 165px;
                cursor: pointer;
            }
    } 
    .top-row{
        display: flex;
        justify-content: space-around;
    }
    .middle-row{
        display: flex;
        justify-content: center;
    }
    .bottom-row{
        display: flex;
        justify-content: space-around;
        border-top: none;
    }
    .head{
        border-bottom: none;
    }
    .left{
        border-right: none;
    }
    .right{
        border-left: none;
    }
    .left img{
        transform: rotate(-90deg);
    }
    .right img{
        transform: rotate(90deg);
    }
    .bottom{
        border-top: none;
    }
    .prev-selector {
        position: absolute;
        z-index:1;
        top: -3px;
        left: -28px;
        width: 25px;
        height: 171px;
    }
    .next-selector {
        position: absolute;
        z-index:1;
        top: -3px;
        right: -28px;
        width: 25px;
        height: 171px;
    }
    .center .prev-selector, .center .next-selector {
        opacity:0.8;
    }
    .left .prev-selector {
        top: -28px;
        left: -3px;
        width: 144px;
        height: 25px;
    }
    .left .next-selector {
        top: auto;
        bottom: -28px;
        left: -3px;    
        width: 144px;
        height: 25px;
    }
    .right .prev-selector {
        top: -28px;
        left: 24px;  
        width: 144px;
        height: 25px;
    }
    .right .next-selector {
        top: auto;
        bottom: -28px;
        left: 24px;    
        width: 144px;
        height: 25px;
    }
    .right .next-selector {
        right: -3px;
    }
    .robot-name{
        position: absolute;
        top: -25px;
        text-align: center;
        width: 100%;
    }
    .sale{
        color:red;
    }
    .content{
        position: relative;
    }
    .add-cart{
        position: absolute;
        right: 30px;
        width: 220px;
        padding: 3px;
        font-size: 16px;
    }
    td, th{
        text-align: left;
        padding: 5px;
        padding-right: 20px;
    }
    .cost{
        text-align: right;
    }
    .true{
        display: none;
    }
    .false{
        display: block;
    }
</style>