<template>
    <div class="part" :class="position">
        <router-link :to="{
            name: 'Parts',
            params: {
                id: this.selectedPart.id,
                partType: this.selectedPart.type
            }
        }">
            <img :src="selectedPart.src" title="arm" :class="sample" />
        </router-link>
        <button class="prev-selector" @click="selectPreviousPart()"></button>
        <button class="next-selector" @click="selectNextPart()"></button>
        <span class="sale" v-show="selectedPart.onSale">Sale!</span>
        {{sample}}
    </div>
</template>

<script>
    function getPreviousValidIndex(index, length){
        const deprecatedIndex = index-1;
        return deprecatedIndex<0?length-1:deprecatedIndex;
    }

    function getNextValidIndex(index, length){
        const incrementedIndex = index+1;
        return incrementedIndex>length-1?0:incrementedIndex;
    }
    export default {
        data(){
            return{
                selectedPartIndex: 0
            };
        },
        created(){
            this.emitSelectedPart();
        },
        props:{
            parts:{
                type: Array,
                required: true
            },
            position: {
                type: String,
                required: true,
                validator: function(value){
                    return['left', 'right', 'top', 'bottom', 'center'].includes(value);
                }
            },
            sample:{
                type: String
            }
        },
        methods:{
            selectPreviousPart(){
                this.selectedPartIndex = getPreviousValidIndex(this.selectedPartIndex, this.parts.length);
                this.emitSelectedPart();
            },
            selectNextPart(){
                this.selectedPartIndex = getNextValidIndex(this.selectedPartIndex, this.parts.length);
                this.emitSelectedPart();
            },
            emitSelectedPart(){
                this.$emit('partSelected', this.selectedPart);
            }
        },
        computed:{
            selectedPart(){
                return this.parts[this.selectedPartIndex];
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>