const { Router } = require('express');
const {Country, Activity} = require('../db.js')
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/countries', async function (req,res,next){
    const {name} = req.query
    if(!name) return next()
    try {
        const country = await Country.findOne({
            where:{
                name: name
            }
        })
        if(!country) 
        {const searchCountry = await axios.get(`https://restcountries.com/v3/name/${name}`)
        const resultCountry = await searchCountry.data.map(({
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
                continent:continent?continent[0]:"Continente",
                capital:capital?capital[0]:"Capital",
                subregion,
                area,
                population
            };
        })
        if(!resultCountry) return res.status(404).send("Country does not exist")
        return res.status(200).send(resultCountry[0])
    } 
    {return res.status(200).send(country)}
    } catch (error) {
        next(error)
    }
})

router.get('/countries', async function (req,res,next){
     try {
    const CountriesDb = await Country.findAll({})    
if(CountriesDb.length === 0){
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
            continent:continent?continent[0]:"Continente",
            capital:capital?capital[0]:"Capital",
            subregion,
            area,
            population
        };
    })
    /* await Country.bulkCreate(resultApi);
    const CountriesDaba = await Country.findAll({}) 
    if(CountriesDaba) return res.status(200).send(resultApi)
    return res.status(404).send("No funca") */
    const data = await Country.bulkCreate(resultApi);
    if(data)return res.status(200).send(resultApi);
    return res.status(404).send("No funca")
}
else {
    return res.json(CountriesDb)
}
    } catch (error) {
        next (error)
    } 
})

router.get('/countries/:countryId', async function (req,res,next){
    const {countryId} = req.params
    try {
        const country = await Country.findByPk(countryId)
        if(!country) 
        {const searchCountry = await axios.get(`https://restcountries.com/v3/alpha/${countryId}`)
        console.log(searchCountry)
        const resultCountry = await searchCountry.data.map(({
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
                continent:continent?continent[0]:"Continente",
                capital:capital?capital[0]:"Capital",
                subregion,
                area,
                population
            };
        })
        if(!resultCountry) return res.status(404).send("Country does not exist")
        return res.status(200).send(resultCountry[0])
    } 
    {return res.status(200).send(country)}
    } catch (error) {
        next(error)
    }
})

/* router.post('/activity', async function (req,res,next){
    const {name,difficulty,duration,season,countries} = req.body

}) */

module.exports = router;
