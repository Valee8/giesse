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
    <nav :class="{ 'nav-home': $route.name === 'home', 'nav': $route.name !== 'home' }">
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

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .links {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 50px;

            a {
                font-size: 0.6rem;
            }

            svg {
                font-size: 0.8rem;
                padding-right: 10px;
                vertical-align: middle;
            }
        }
    }
}

.nav-home {
    padding: 15px 0;

    .links {
        a {
            background-color: #000;
            color: #fff;
            padding: 10px 20px;
            border-radius: 100px;
            color: #fff;
        }
    }
}

.nav {
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, .4);
    padding: 20px 0;

    .links {
        a {
            color: #000;
        }
    }

    .logo {
        width: 155px;
        height: 32px;
    }
}
</style>