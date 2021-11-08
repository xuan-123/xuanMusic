<template>
    <div class="tabaritem">
        <div class="top"><slot name="top"></slot></div>
        <div class="bottom"><slot name="bottom"></slot></div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.tabaritem{
    font-size: .75rem;
    flex: 1;
    /* line-height: 3.0625rem; */
    padding-top: .625rem;
    height: 3.0625rem;
    text-align: center;
    flex-direction: row;
}
</style>