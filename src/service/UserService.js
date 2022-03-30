import axios from 'axios';

export default class AlimentoService {

    getUser(username){
        return axios.get(`/users/${username}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    guardar(user){
        return axios.post(`auth/register/`,user)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    actualizarNutrientes(user){
        var corrector_actividad = 0

        if(user.nivel_actividad == "Poca o ninguna"){
            corrector_actividad = 1.2
        }else if(user.nivel_actividad == "Ejercicio Ligero"){
            corrector_actividad = 1.375
        }else if(user.nivel_actividad == "Ejercicio moderado"){
            corrector_actividad = 1.550
        }else if(user.nivel_actividad == "Ejercicio fuerte"){
            corrector_actividad = 1.725
        }else if(user.nivel_actividad == "Ejercicio muy fuerte"){
            corrector_actividad = 1.90
        }


        if (user.sexo = "Masculino"){
            var tmb = 66 + (13.7 * user.peso_actual) + (5 * user.altura) - (6.75 * calcularEdad(user.fecha))
        }else{
            var tmb = 665 + (9.6 * user.peso_actual) + (1.8 * user.altura) - (4.7 * calcularEdad(user.fecha))
        }

        tmb *= corrector_actividad

        user.kcal_recomendadas = tmb
        
        if(user.dieta_pref == "Estándar"){
            user.carbohidratos_recomendados = user.kcal_recomendadas * 0.5
            user.proteinas_recomendadas = user.kcal_recomendadas * 0.2
            user.grasas_recomendadas = user.kcal_recomendadas * 0.3
        }else if(user.dieta_pref == "Baja en carbohidratos"){
            user.carbohidratos_recomendados = user.kcal_recomendadas * 0.3
            user.proteinas_recomendadas = user.kcal_recomendadas * 0.25
            user.grasas_recomendadas = user.kcal_recomendadas * 0.45
        }else if(user.dieta_pref == "Alta en proteínas"){
            user.carbohidratos_recomendados = user.kcal_recomendadas * 0.35
            user.proteinas_recomendadas = user.kcal_recomendadas * 0.40
            user.grasas_recomendadas = user.kcal_recomendadas * 0.25
        }else if(user.dieta_pref == "Baja en grasas"){
            user.carbohidratos_recomendados = user.kcal_recomendadas * 0.55
            user.proteinas_recomendadas = user.kcal_recomendadas * 0.2
            user.grasas_recomendadas = user.kcal_recomendadas * 0.25
        }

        return user

        function calcularEdad(fecha) {
            var hoy = new Date();
            var cumpleanos = new Date(fecha);
            var edad = hoy.getFullYear() - cumpleanos.getFullYear();
            var m = hoy.getMonth() - cumpleanos.getMonth();
        
            if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                edad--;
            }
        
            return edad;
        }
    }

    
}