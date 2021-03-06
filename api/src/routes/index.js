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
             if(!countriesSearch.length){
               return res.status(404).send("Country Not Found")
            }
             return res.json(countriesSearch)
        }else{next()}
    } catch (error) {
        next(error)
    }
})

router.get('/countries',async function (req,res,next){
    try {
        let countriesDb = await Country.findAll({
            include: [{model: Activity}]
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
                    flag: flag?flag[0]:"País sin bandera",
                    continent:continent?continent[0]:"No hace parte de un continente",
                    capital:capital?capital[0]:"El país no tiene una capital",
                    subregion: subregion? subregion : "No hay una subregión",
                    area,
                    population
                };
            })
            const data = await Country.bulkCreate(resultApi);
            if(data)return res.status(200).send(data);
        }else{res.send(countriesDb)}
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
        return res.send(singleCountry)
    } catch (error) {
        next(error)
    }
})

router.post('/activity', async function (req,res,next){
    const {name,difficulty,duration,season,countriesId} = req.body
    if(!name || !difficulty || !duration || !season || !countriesId){res.status(404).send({msg:"Invalid Data"})}
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

            res.status(201).send({msg:"Activity added successfully",name:newActivity.name})
    } catch (error) {
        if(error.response){
            res.status(error.response.status).send({msg: error.response.status})
        }
        else if(error.request){
            next(error.request)
        }else
        next(error)
    }
})

router.get('/activities',async function(req,res){
    try {
        let activitiesSearch = await Activity.findAll(
            {include: [{model:Country}]}
        )
        res.send(activitiesSearch)
    } catch (error) {
        console.log(error)
    }
})

router.get('/activity/:name',async function(req,res){
    const {name}=req.params
    try {
        let activitySearch = await Activity.findOne({
            include: [{model:Country}],
            where: {
                name:name
            }
        })
        res.send(activitySearch)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
