<template>
    <li class="item">
        <slot/>
    </li>
</template>

<script>
export default {
    name: 'a-aside-item'
}
</script>

<style scoped>
.item {
    list-style-type: none;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: white;
    cursor: pointer;
    background-color: rgba(255,255,255,0);
    transition: background-color .5s;
}

.item:hover {
    background-color: rgba(255,255,255,0.3);
}
</style>