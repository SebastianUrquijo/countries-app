const { Router } = require('express');
const {Country, Activity} = require('../db.js')
const axios = require('axios');
const {Op} = require('sequelize')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries',async function(req,res,next){
    const{name}=req.query
    try {
        if(name){
            let countriesSearch = await Country.findAll({
                include: [{model: Activity}],
                where: {[Op.or]: [{ name: { [Op.iLike]: `%${name}%` } },]},
             }); 
             return res.json(countriesSearch)
        }else{next()}
    } catch (error) {
        next(error)
    }
})

router.get('/countries',async function (req,res,next){
    try {
        let countriesDb = await Country.findAll({
            include: [{model:Activity}]
        })
        if(countriesDb.length === 0){
            const searchApi = await axios.get('https://restcountries.com/v3/all')
            const resultApi = await searchApi.data.map(({
                cca3:id,
                name:{common:name},
                flags:flag,
                continents:continent,
                capital,
                subregion,
                area,
                population})=>{
                    return {
                    id,
                    name,
                    flag: flag?flag[0]:"Bandera",
                    continent:continent?continent[0]:"No tiene un Continente",
                    capital:capital?capital[0]:"No hay una Capital",
                    subregion,
                    area,
                    population
                };
            })
            const data = await Country.bulkCreate(resultApi);
            if(data)return res.status(200).send(data);
        }else{res.json(countriesDb)}
    }
 catch (error) {
        next(error)
    }
})

router.get('/countries/:countryId', async function (req,res,next){
    const {countryId} = req.params
    try {
        let singleCountry = await Country.findByPk(countryId,{
            include:[{model: Activity}]  
        })
        return res.json(singleCountry)
    } catch (error) {
        next(error)
    }
})

router.post('/activity', async function (req,res,next){
    const {name,difficulty,duration,season,countriesId} = req.body
    if(!name || !difficulty || !duration || !season || !countriesId){res.status(404).send("No se han agregado los datos necesarios")}
    try {
        const str = name.slice(0,3);
        const code = Math.round(name.slice(0,3).split("").map((cv)=>cv.charCodeAt()).reduce((a,b)=>a+b)*(name.length/2))
        
        const newActivity = await Activity.create({
            id: str + code,
            name,
            difficulty,
            duration,
            season,
        })
        
        for (let i = 0; i < countriesId.length; i++) {
            const result = await Country.findByPk(countriesId[i]);
            await result.addActivity(newActivity)
        }
        await newActivity.addCountry(countriesId) 
        
        res.status(200).send("Actividad agregada satisfactoriamente")
    } catch (error) {
        next(error)
    }
})



module.exports = router;
