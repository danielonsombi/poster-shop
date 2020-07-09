//To Output this file to the DOM, then we need a build tool like web pack which
to first compile it into regular javascript since the browsers cannot read the
.vue files directly. We have therefore to configure the web pack which canbe
done with zero configuration using the view CLI.

<template>
    <li v-on:click="bought = !bought"  v-bind:class="{ bought: bought}">
        {{title}}
    </li>
</template>

<script>
export default {
    props:["title"],
    data: () => ({
        bought: false
    })
};
</script>

<style>
    li {
        cursor:pointer;
    }

    .bought {
        text-decoration: line-through;
        opacity: 0.3;
    }
</style>