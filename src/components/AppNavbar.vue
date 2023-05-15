<script>
export default {
    name: 'AppNavbar',
    data() {
        return {
            links: [
                {
                    text: "Richiedi Preventivo",
                    href: "/",
                    icon: "fa-regular fa-file-lines"
                },
                {
                    text: "Posizione Sede",
                    href: "/",
                    icon: "fa-solid fa-location-dot"
                },
                {
                    text: "Contatti",
                    href: "/",
                    icon: "fa-solid fa-phone-flip"
                }
            ]
        }
    }
}
</script>

<template>
    <nav>
        <div class="container">
            <router-link to="/">
                <img src="/img/logo-giesse.png" alt="Logo Giesse" class="logo">
            </router-link>

            <ul class="links">
                <li v-for="(link, index) in links" :key="index">
                    <a :href="link.href">
                        <i :class="link.icon"></i> {{ link.text }}
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

nav {
    padding: 15px 0;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .links {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 30px;

            a {
                font-size: 0.7rem;
                background-color: #000;
                color: #fff;
                padding: 10px 20px;
                border-radius: 100px;
            }

            svg {
                font-size: 0.7rem;
                padding-right: 10px;
            }
        }
    }
}
</style>