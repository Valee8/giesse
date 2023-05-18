<script>
export default {
    name: 'AppFooter',
}
</script>

<template>
    <footer>
        <div class="small_container">
            <div class="left-footer">
                <img src="/img/logo-giesse.png" alt="Logo Giesse" class="logo">

                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut quos illo at est eum? Dolorem quas nihil
                    amet,
                    harum possimus atque dolore debitis omnis, enim qui vel nesciunt aliquam recusandae.
                </p>
            </div>

            <div class="center-footer">
                <h3>
                    Giesse Zanzariere di <div>Sandro Locci</div>
                </h3>
                <div class="border"></div>

                <ul>
                    <li>
                        P. IVA: <span>01376020929</span>
                    </li>
                    <li class="pt">
                        <div>Via Damiano Chiesa 69</div>
                        09016 Iglesias (Sud Sardegna)
                    </li>
                    <li class="pt">
                        Telefono: <span>0781 33387</span>
                    </li>
                    <li>
                        Cellulare: <span>&plus;39 3939139300</span>
                    </li>
                    <li>
                        E-mail: <span>giessezanzariere&commat;tiscali.it</span>
                    </li>
                </ul>
            </div>

            <div class="right-footer">
                <h3>
                    Le Nostre Zanzariere
                </h3>
                <div class="border"></div>
            </div>
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
    padding: 30px 0;
    font-size: 0.7rem;
    line-height: 15px;

    .small_container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .center-footer {

            ul {
                .pt {
                    padding-top: 10px;
                }

                span {
                    font-weight: bold;
                }
            }
        }

        div[class*="footer"] {
            width: 25%;
        }

        .border {
            background-color: #fcf674;
            width: 40px;
            height: 4px;
        }

        h3 {
            color: #fcf674;
            font-size: 1rem;
            padding-bottom: 5px;
            line-height: 20px;
        }

        p,
        ul {
            padding-top: 20px;
        }
    }
}
</style>