<script>
export default {
    name: 'Preventivo',
    data() {
        return {
            currentStep: 1,
            selectedOption: "",
            name: "",
            surname: "",
            agency_name: ""
        };
    },
    computed: {
        isInputValid() {
            if (this.selectedOption === 'opzione1') {
                return this.name.trim() !== '';
            } else if (this.selectedOption === 'opzione2') {
                return this.agency_name.trim() !== '';
            } else {
                return false;
            }
        }
    },
    methods: {
        nextStep() {
            if (this.currentStep === 1 && this.isInputValid) {
                this.currentStep++;
            }
        },
    }
};
</script>

<template>
    <section>
        <div class="container">
            <div class="top">
                <h1>
                    Fai il Preventivo
                </h1>


                <div class="steps">
                    <div>1</div>
                    <hr>
                    <div>2</div>
                    <hr>
                    <div>3</div>
                </div>
            </div>

            <form action="">
                <div v-if="currentStep === 1">
                    <!-- Selezione del tipo -->
                    <label>
                        <input type="radio" value="opzione1" v-model="selectedOption">
                        Privato
                    </label>
                    <label>
                        <input type="radio" value="opzione2" v-model="selectedOption">
                        Azienda
                    </label>

                    <!-- Campo di input condizionale -->
                    <div v-if="selectedOption === 'opzione1'">
                        <input type="text" v-model="name" placeholder="Nome">
                        <br>
                        <!-- <input type="text" v-model="surname" placeholder="Cognome"> -->
                    </div>
                    <div v-else-if="selectedOption === 'opzione2'">
                        <input type="text" v-model="agency_name" placeholder="Nome Azienda">
                    </div>

                    <!-- Pulsante per passare al successivo step -->
                    <button @click="nextStep" :disabled="!isInputValid">Avanti</button>
                </div>
            </form>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../src/styles/general.scss' as *;
@use '../src/styles/partials/mixins' as *;
@use '../src/styles/partials/variables' as *;

.container {
    text-align: center;
    background-color: #686868;
    color: #fff;
    padding: 20px 0;

    form {
        padding: 20px 0;
    }

    .top {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 50px;

        .steps {
            display: flex;
            justify-content: space-between;
            align-items: center;
            //gap: 20px;
            font-size: 1.8rem;

            hr {
                width: 60px;
                border: 2px solid #fff;
            }

            div {
                border: 2px solid #fff;
                border-radius: 50px;
                width: 40px;
                height: 40px;
            }
        }
    }
}
</style>