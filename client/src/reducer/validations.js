export default function validations (input){
    let errors = {}
    
   if(!input.name){
       errors.name = "Es necesario un nombre para la actividad"
   }else if(!/^[A-Za-z\u00f1\u00d1\s]+$/g.test(input.name.trim())){
       errors.name = "El nombre no puede incluir caracteres especiales"
   }
   else if(input.name.length < 3 || input.name.length > 30){
       errors.name = "El nombre debe tener entre 3 y 30 caracteres"
   }

   if(!input.difficulty){
        errors.difficulty = "Es necesario asignar una dificultad"
   }else if(typeof parseInt(input.difficulty) !== "number"){
       errors.name = "El valor debe ser un número "
   }else if(parseInt(input.difficulty) < 1 || parseInt(input.difficulty) > 5){
       errors.difficulty = "Solo puede ser un valor entre 1 y 5"
   }

   if(!input.duration){
       errors.duration = "Debes especificar la duración de la actividad"
   }

   if(input.season.length === 0){
       errors.season = "Debes seleccionar al menos una de las temporadas"
   }
   
   if(input.countriesId.length === 0){
       errors.countriesId = "Debes seleccionar al menos un país"
   }

   return errors
}