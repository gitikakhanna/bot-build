<template>
    <div>
        <h2>Torsos</h2>
        The torso is the central part of your robot that holds everything.
        <div v-for="(torso, idx) in torsos" :key="idx">
            <h4>{{torso.title}}</h4>
            <div>{{torso.description}}</div>
        </div>
    </div>
</template>

<script>
    import parts from './../data/parts';
    export default {
        name: 'RobotTorsos',
        data(){
            return {
                torsos: parts.torsos,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>