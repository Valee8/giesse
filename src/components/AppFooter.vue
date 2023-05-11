<script>
export default {
    name: 'AppFooter',
}
</script>

<template>
    <footer>
        <div class="small_container">
            <h1>
                Footer
            </h1>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

footer {
    background-color: #424242;
    color: #fff;
}
</style>