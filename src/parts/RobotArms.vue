<template>
    <div>
        <h2>Arms</h2>
        The arms are how your robot will interact with the world.
        Comes in a variety of shape and function.
        <div v-for="(arm, idx) in arms" :key="idx">
            <h4>{{arm.title}}</h4>
            <div>{{arm.description}}</div>
        </div>
    </div>
</template>

<script>
    import parts from './../data/parts';
    export default {
        name: 'RobotArms',
        data(){
            return {
                arms: parts.arms,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>