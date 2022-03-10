<template>
    <div class="ejercicioCard">
        <img src="" class="ejercicio-img">
        <div class="ejercicio-container">
            <div class="ejercicio-title">Titulo <span class="calorias">(Calorias)</span></div>
            <ul>
                <li class="text">Dificultad</li>
                <li class="text">Material</li>
                <li class="text">Tiempo</li>
            </ul>
            <img src="" class="zonaEjercicio-img">
        </div>
    </div>
</template>
<style>
    .ejercicio-img {
        margin: auto;
        margin-left: 0px;
        margin-right: 0px;
        width: 10rem;
        height: 10rem;
    }
    .ejercicioCard {
        border-radius: 10px;
        padding: 1rem 0 1rem 1rem;
        width: 40rem;
        height: 13rem;
        position: relative; 
        background-color: gray;
        display: flex;
        flex-direction: row;
    }
    .ejercicio-container{
        margin-left:1vw;
    }
    .calorias {
        font-size: 1.875rem;
    }
    .ejercicio-title {
        font-size: 2.5rem;
    }
    .text {
        font-size: 1.25rem;
    }
    .zonaEjercicio-img {
        position: absolute;
        bottom: 1%;
        right: 1%;
        width: 9rem;
        height: 9rem;
        background-color: red;
    }
</style>