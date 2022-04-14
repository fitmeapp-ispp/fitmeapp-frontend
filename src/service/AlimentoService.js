import axios from 'axios';
require("dotenv").config();
const fetch= require("node-fetch")
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

    anyadirACarrusel(alimentoId,cantidad, diaId,tipo){
        return axios.post(`/comidas/add/${alimentoId}/${cantidad}/${diaId}/${tipo}`,)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    nuevaConsumicion(alimentoId, username){
        return axios.post(`/alimentos/newConsumption/${alimentoId}/${username}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    crearConsumicion(){
        return axios.post(`/consumicion`, {usuario: "6244d94635c17b47d527f178", alimento: "623240e3997148f56622accd", cantidad: 100})
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

    calculadora(alimentos, macronutrientes){
        const url=process.env.VUE_APP_CALCULADORA
        console.log(url)
        alimentos = [{
            "_id":  "6234eacdb4c8f6d4500f3500",
            "creado_por": "jose",
            "verificado": false,
            "marca": "Aldi",
            "codigo_barra": "2004060002415",
            "url": "http://world-en.openfoodfacts.org/product/2004060002415/salsa-de-manzana-con-canela-special-de-aldi",
            "nombre": "Prueba",
            "alergenos": "",
            "imagen": "https://images.openfoodfacts.org/images/products/200/406/000/2415/front_es.13.400.jpg",
            "imagen_peq": "https://images.openfoodfacts.org/images/products/200/406/000/2415/front_es.13.200.jpg",
            "kcal_100g": 105,
            "grasa_100g": 0.9,
            "grasas-std_100g": 0.9,
            "colesterol_100g": 0,
            "carbohidratos_100g": 24,
            "azucares_100g": 21.7,
            "fibra_100g": 0,
            "proteinas_100g": 0.2,
            "sal_100g": 0.07,
            "sodio_100g": 0.028,
            "potasio_100g": 0
          },{
            "_id": "624ca38d5da891fdf1ed0176",
            "nombre": "Guajillo",
            "creado_por": "jose",
            "marca": "Pastor",
            "kcal_100g": 140,
            "grasa_100g": 21,
            "grasas-std_100g": 0,
            "carbohidratos_100g": 4,
            "azucares_100g": 1,
            "proteinas_100g": 34,
            "sal_100g": 4,
            "sodio_100g": 5,
            "fibra_100g": 1,
            "colesterol_100g": 5,
            "potasio_100g": 2,
            "alergenos": "mostaza",
            "verificado": false,
            "etiquetas": [],
            "__v": 0
          },{
            "_id": "624cb08a75edc43480ba6e48",
            "nombre": "Yogurt",
            "creado_por": "jose",
            "marca": "Hacendado",
            "kcal_100g": 50,
            "grasa_100g": 25  ,
            "grasas-std_100g": 0,
            "carbohidratos_100g": 70,
            "azucares_100g": 10,
            "proteinas_100g": 14,
            "sal_100g": 5,
            "sodio_100g": 3,
            "fibra_100g": 3,
            "colesterol_100g": 1,
            "potasio_100g": 4,
            "alergenos": "leche",
            "verificado": false,
            "etiquetas": [],
            "__v": 0
          }]
        macronutrientes = {
            "kcal_100g": 783.4,
            "grasa_100g": 235.02,
            "carbohidratos_100g": 587.52,
            "proteinas_100g": 156.68
        }
        var json= JSON.stringify({
            "alimentos":alimentos,
            "macronutrientes":macronutrientes
            })
        fetch(url,{
            method:"post",
            body: json,
            headers: {'Content-Type': 'application/json'}
        }).then(response =>{
            console.log(response)
        })
    }

}