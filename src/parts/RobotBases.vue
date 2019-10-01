<template>
    <div>
        <h2>Bases</h2>
        The base is critical to the mobility of your robot.
        <div v-for="(base, idx) in parts.bases" :key="idx">
            <h4>{{base.title}}</h4>
            <div>{{base.description}}</div>
        </div>
    </div>
</template>

<script>
    import getPartsMixin from './get-parts-mixin';
    export default {
        name: 'RobotBases',
        mixins: [getPartsMixin]
    }
</script>

<style lang="scss" scoped>

</style>