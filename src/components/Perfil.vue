<template>
    <div class="grid justify-content-center align-items-center">
        <div class="col-12">
            <div class="p-fluid formgrid grid text-center">
                <div class="field col-12 lg:col-4"></div>
                <div class="field col-12 lg:col-4">
                    <h1>Perfil</h1>
                </div>
                <div class="field col-12 lg:col-2">
                    <router-link to="/cambio_contrasena">
                        <Button label="Cambiar contraseña" icon="pi pi-pencil" class="p-button-success"/>
                    </router-link>
                </div>
                <div class="field col-12 lg:col-2">
                    <router-link to="/editar_perfil">
                        <Button label="Editar perfil" icon="pi pi-user-edit" class="p-button-success"/>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <div class= "p-fluid formgrid grid text-center">
                    <div class="field col-12 md:col-4">
                        <h5 for="nombre">Nombre:</h5>
                        <span>{{user.nombre}}</span>
                    </div>
                    <div class="field col-12 md:col-4">
                        <h5 for="nombre">Apellido/s:</h5>
                        <span>{{user.apellidos}}</span>
                    </div>
                    <div class="field col-12 md:col-4">
                        <h5 for="nombre">Edad:</h5>
                        <span>{{user.edad}}</span>
                    </div>
                    <div class="field col-12 md:col-6">
                        <h5 for="nombre">Peso Actual:</h5>
                        <span>{{user.peso_actual}}</span>
                    </div>
                    <div class="field col-12 md:col-6">
                        <h5 for="nombre">Objetivo:</h5>
                        <span>{{user.objetivo}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 text-center mb-6">
            <h1>Plan actual</h1>
            <div v-if="suscripcion">
                <img :src="planActual" alt="Plan de suscripción de 1 mes" width="150" />
                <h3>Finaliza el: {{this.suscripcion.fechaFin}}</h3>
            </div>
            <div v-else>
                <h2>Actualmente no está suscrito a ningún plan</h2>
            </div>
        </div>
        <div class="col-12 lg:col-3 text-center">
            <h3>1 mes (3,99€/mes)</h3>
            <img :src="unMes" alt="Plan de suscripción de 1 mes" width="150"/>
            <a href="https://buy.stripe.com/test_14kaFW8Qm9s50CIcMM">
                <Button label="Suscríbase" class="col-12 text-xl" style="background-color:#1DA750; color:white;"/>
            </a>
        </div>
        <div class="col-12 lg:col-3 text-center">
            <h3>3 meses (3,79€/mes)</h3>
            <img :src="tresMeses" alt="Plan de suscripción de 3 meses" width="150" style="max-height:150px;"/>
            <a href="https://buy.stripe.com/test_bIY29qd6C9s53OU6op">
                <Button label="Suscríbase" class="col-12 text-xl" style="background-color:#1DA750; color:white;"/>
            </a>
        </div>
        <div class="col-12 lg:col-3 text-center">
            <h3>6 meses (3,49€/mes)</h3>
            <img :src="seisMeses" alt="Plan de suscripción de 6 meses" width="150" style="max-height:150px;"/>
            <a href="https://buy.stripe.com/test_8wMeWc5Ea0VzetydQS">
                <Button label="Suscríbase" class="col-12 text-xl" style="background-color:#1DA750; color:white;"/>
            </a>
        </div>
        <div class="col-12 lg:col-3 text-center">
            <h3>12 meses (3,19€/mes)</h3>
            <img :src="doceMeses" alt="Plan de suscripción de 12 meses" width="150" style="max-height:150px;"/>
            <a href="https://buy.stripe.com/test_8wMdS88QmgUx0CI8wz">
                <Button label="Suscríbase" class="col-12 text-xl" style="background-color:#1DA750; color:white;"/>
            </a>
        </div>
    </div>
</template>

<script>
import unMes from '../../public/images/planes/plan_de_pago_1_mes.png';
import tresMeses from '../../public/images/planes/plan_de_pago_3_meses.png';
import seisMeses from '../../public/images/planes/plan_de_pago_6_meses.png';
import doceMeses from '../../public/images/planes/plan_de_pago_12_meses.png';
import userService from '../service/UserService';

export default {
	data() {
        return {
            user: {nombre: ""},
            unMes: unMes,
            tresMeses: tresMeses,
            seisMeses: seisMeses,
            doceMeses: doceMeses,
            suscripcion: null,
            planActual: null,
            precioUnMes: 3.99,
            precioTresMeses: 3.79,
            precioSeisMeses: 3.49,
            precioDoceMeses: 3.19,
        }
    },
    userService: null,
    created(){
        this.userService = new userService();
        this.obtenerUser();
    },
    mounted(){
        this.obtenerSuscripcion();
    },
    methods:{
        obtenerSuscripcion(){
            this.userService.getSuscripcion(this.$store.state.userId)
            .then(data => {
                this.suscripcion = data;
                if (this.suscripcion){
                    if (this.suscripcion.precio === this.precioUnMes){
                        this.planActual = unMes;
                    }else if (this.suscripcion.precio === this.precioTresMeses){
                        this.planActual = tresMeses;
                    }else if (this.suscripcion.precio === this.precioSeisMeses){
                        this.planActual = seisMeses;
                    }else if (this.suscripcion.precio === this.precioDoceMeses){
                        this.planActual = doceMeses;
                    }
                }
            });
        },
        obtenerUser(){

            function calcularEdad(fechaNacimiento) {
            var hoy = new Date();
            var cumpleanos = new Date(fechaNacimiento);
            var edad = hoy.getFullYear() - cumpleanos.getFullYear();
            var m = hoy.getMonth() - cumpleanos.getMonth();
        
            if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                edad--;
            }
        
            return edad;
        }
            this.userService.getUser(this.$store.state.username).then(data => {
                this.user = data;
                this.user.edad = calcularEdad(this.user.fechaNacimiento)
                console.log(this.user)
            });
        }
    },
}
</script>