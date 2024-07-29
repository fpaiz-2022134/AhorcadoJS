//Método el cúal obtiene elementos a través del id. 
function id(str){
    return document.getElementById(str);
}


//Método encargado para obtener el valor random para escoger un elemento del vector.
function obtener_random(num_min, num_max){
    const amplitud_valores = num_max - num_min; // Valor más alto- valor más bajo del random...
    const valor_al_azar = Math.round(Math.random() * amplitud_valores)
    + num_min;

    return valor_al_azar;
}
