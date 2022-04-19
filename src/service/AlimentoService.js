import axios from 'axios';
require("dotenv").config();
export default class AlimentoService {

    getAlimentos(lazyParams, buscador){
        
        return axios.get('/alimentos', {
            params:{
                pagina: lazyParams.pagina,
                ordenar: lazyParams.sort,
                buscador: buscador,
                alergeno: lazyParams.filters
            }
        })
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getAlimento(id) {
		return axios.get(`/alimentos/${id}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getCreados(username,lazyParams, buscador) {
		return axios.get(`/alimentos/creados/${username}`, {
            params:{
                pagina: lazyParams.pagina,
                ordenar: lazyParams.sort,
                buscador: buscador,
                alergeno: lazyParams.filters
            }
        })
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getRecientes(userId,lazyParams, buscador){
        return axios.get(`/alimentos/recientes/${userId}`, {
            params:{
                pagina: lazyParams.pagina,
                ordenar: lazyParams.sort,
                buscador: buscador,
                alergeno: lazyParams.filters
            }
        })
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getFavoritos(username,lazyParams, buscador, alimentoIds){
        return axios.get(`/alimentos/favoritos/${username}`, {
            params:{
                pagina: lazyParams.pagina,
                ordenar: lazyParams.sort,
                buscador: buscador,
                alergeno: lazyParams.filters,
                alimentoIds: alimentoIds
            }
        })
        .then((response) => 
				response.data)
                .catch((e)=>{
                    console.log('error' + e);
                });
    }

    getComida(tipo,fecha,username){
        console.log(tipo,fecha,username)
        return axios.get(`/comidas/comida/${fecha}/${username}/${tipo}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getCarrusel(tipo,fecha,username){
        return axios.request(`/comidas/carrusel/${fecha}/${username}/${tipo}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getUserKcak(username){
        return axios.get(`/users/${username}`)
        .then((response) => 
				response.data)
                .catch((e)=>{
                    console.log('error' + e);
                });
    }

    actualizarAlimento(alimento){
        return axios.put('/alimentos/' + alimento._id, alimento);
    }

    guardarAlimento(alimento){
        return axios.post('/alimentos', alimento).then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    deleteFromCarrusel(consumicionId, tipo, diaId){
        return axios.delete(`/comidas/carrusel/${consumicionId}/${diaId}/${tipo}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    anyadirACarrusel(alimentoId,cantidad, diaId,tipo,calculadora){
        return axios.post(`/comidas/add/${alimentoId}/${cantidad}/${diaId}/${tipo}/${calculadora}`,)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    crearDia(){
        return axios.post(`/dia`, {usuario: "6244d94635c17b47d527f178", pesoActual: 60, pasosObjetivo: 10000,
         consumicionesDesayuno: ["624742a89bdea6b9c0ff554d"],
         consumicionesAlmuerzo: [], consumicionesCena: [], kcalRec:640, proteinasRec:100,carbRec:100,grasasRec:100})
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getDia(userId,tipo){
        return axios.get(`/comidas/${tipo}/`+"2022-04-01T19:01:28.616+00:00"+"/"+userId)
        .then((response) => 
			response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    limpiarCarrusel(userId,diaId,tipo){
        return axios.delete(`/comidas/limpiarCarrusel/${userId}/${diaId}/${tipo}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    calculadora(alimentos, macronutrientes,toast){
        const url=process.env.VUE_APP_CALCULADORA
        var json = {
            "alimentos":alimentos,
            "macronutrientes":macronutrientes
            }

        return axios.post(url, json, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        })
        .then((response) => response.data)
        .catch(()=>{
            toast.add({severity:'warn', summary: 'Calculadora', detail: 'Seleccione un mímino de 3 alimentos a calcular', life: 3000});
        });
    }

}