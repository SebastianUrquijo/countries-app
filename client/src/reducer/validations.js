export default function validations (input,activities){
    let errors = {}
   if(input.name){
    if(input.name.trim()=== ""){
       errors.name = "A name is required for the activity"
   }
   else if(!/^[A-Za-z\u00f1\u00d1\s]+$/g.test(input.name.trim())){
       errors.name = "Name cannot include special characters"
   }
   else if(input.name.length < 3 || input.name.length > 30){
       errors.name = "Name must be between 3 and 30 characters"
   }
   var check = activities && activities.map(activity => activity.name.toLowerCase() === input.name.toLowerCase());
   if(check === true){ errors.name = "Name already exists"} 
    }

   if(!input.difficulty){
        errors.difficulty = "It is necessary to assign a difficulty"
   }
   else if(typeof parseInt(input.difficulty) !== "number"){
       errors.name = "Value must be a number"
   }
   else if(parseInt(input.difficulty) < 1 || parseInt(input.difficulty) > 5){
       errors.difficulty = "Can only be a value between 1 and 5"
   }

   if(!input.duration){
       errors.duration = "You must specify the duration of the activity"
   }

   if(input.season.length === 0){
       errors.season = "You must select at least one season"
   }
   
   if(input.countriesId.length === 0){
       errors.countriesId = "You must select at least one country"
   }

   return errors
}