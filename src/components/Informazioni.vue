<script>

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/';

export default {
    name: 'Informazioni',
    data() {
        return {
            enableButton: false,
            emptyInput: true,
            newInfo: {
                name_surname: "",
                email: "",
                message: ""
            }
        }
    },
    computed: {
    },
    methods: {
        sendEmail() {

            if (this.newInfo.name_surname.trim() !== "" && this.newInfo.email.includes("@") && this.newInfo.message.trim() !== "") {

                //this.emptyInput = true;

                axios.post(API_URL + 'information/store', this.newInfo)
                    .then(res => {
                        const data = res.data;
                        const success = data.success;

                        if (success) {
                            console.log("OK");
                        }

                    })
                    .catch(error => console.log(this.newInfo));
            }
        },
        filterNumbers() {
            this.newInfo.name_surname = this.newInfo.name_surname.replace(/[0-9]/g, '');
        },
        handleSubmit(event) {
            event.preventDefault();
        },
    }
}
</script>

<template>
    <div class="info">
        <div class="container">
            <div class="left">
                <form @submit="handleSubmit">
                    <input type="text" class="first-input" v-model="newInfo.name_surname" placeholder="Nome e Cognome *"
                        @input="filterNumbers" required>
                    <input type="email" v-model="newInfo.email" placeholder="Indirizzo e-mail *" required>
                    <br>
                    <textarea name="message" v-model="newInfo.message" rows="8" placeholder="Messaggio *"
                        required></textarea>
                    <div class="obligatory">* Campi obbligatori</div>
                    <div class="submit">
                        <input type="submit" value="Invia" @click="sendEmail">
                        <div class="email">
                            <i class="fa-regular fa-envelope"></i>
                        </div>
                    </div>
                </form>

            </div>

            <div class="right">
                <h1>
                    <div class="border"></div>
                    Chiedi informazioni per un preventivo
                    <div>Contattaci</div>
                </h1>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.info {
    background-color: #1c1c1c;
    text-align: center;
    color: #fff;
    padding: 50px 0;
    //height: 400px;
    //display: none;

    .obligatory {
        font-size: 0.6rem;
        font-weight: bold;
        padding-top: 10px;
        text-align: left;
    }

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        //height: 100%;

        .left {

            input:not(.submit),
            textarea {
                background: #fff;
                padding: 6px 12px 20px 12px;
                border: 0;
                font-size: 0.9rem;
                font-family: 'Montserrat', sans-serif;
                outline: none;
                color: #000;
            }

            input:not(.submit) {
                width: 254px;

            }

            .first-input {
                margin-right: 40px;
            }

            textarea {
                margin-top: 40px;
                width: 100%;
            }

            ::placeholder {
                /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: #b9b9b9;
                font-weight: 600;
                opacity: 1;
                /* Firefox */
            }

            :-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: #b9b9b9;
            }

            ::-ms-input-placeholder {
                /* Microsoft Edge */
                color: #b9b9b9;
            }

            .submit {
                display: flex;
                align-items: center;
                margin: 30px auto 0 auto;
                width: 105px;

                input {
                    width: 100%;
                    font-family: 'Montserrat', sans-serif;
                    background-color: #000;
                    border: 1px solid #fff;
                    border-radius: 50px;
                    color: #fff;
                    font-size: 1.3rem;
                    font-weight: 500;
                    padding: 5px 30px 5px 0;
                    cursor: pointer;
                }

                .email {
                    margin-left: -34px;
                    cursor: pointer;

                    svg {
                        vertical-align: middle;
                        font-size: 1.2rem;
                    }
                }
            }
        }

        .right {

            h1 {
                text-align: left;
                width: 282px;
                height: 200px;
                font-size: 1.8rem;
                font-weight: normal;
                margin-left: auto;

                .border {
                    background-color: $yellow-color;
                    width: 70px;
                    height: 10px;
                    margin-bottom: 10px;
                }

                div {
                    font-weight: bold;
                    color: $yellow-color;
                    font-size: 2.7rem;
                    padding-top: 5px;
                }
            }
        }

        .left,
        .right {
            width: 45%;
            //height: 100%;
        }
    }
}
</style>