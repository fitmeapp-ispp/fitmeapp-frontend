import axios from 'axios';

export default class DiaService{

    getDatosDia(username, fecha){
        return axios.get(`/dia/${username}/${fecha}`, {
            params:{
                username: username
            }
        })
        .then((response) => response.data)
        .catch((e)=>{
            console.log('Error: ' + e);
        });
    }

    getAlimentosDia(username, fecha, tipo){
        return axios.get(`/dia/${username}/${fecha}/${tipo}`, {
            params:{
                username: username
            }
        })
        .then((response) => response.data)
        .catch((e)=>{
            console.log('Error: ' + e);
        });
    }

    getPesosSemana(username, fecha){
        return axios.get(`/dia/${username}/${fecha}/pesos`, {
            params:{
                username: username
            }
        })
        .then((response) => response.data)
        .catch((e)=>{
            console.log('Error: ' + e);
        });
    }
}