<template>
    <li class="item">
        <slot/>
    </li>
</template>

<script>
export default {
    name: 'a-nav-item'
}
</script>

<style scoped>
.item {
    float: left;
    height: 100%;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    background-color: rgba(0,0,0,0);
    transition: background-color .5s;
}

.item * {
    line-height: 40px;
}

.item:hover {
    background-color: rgba(0,0,0,0.05);
}
</style>