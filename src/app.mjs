import { hasSubscribers } from 'diagnostics_channel'
import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'
import hbs from 'hbs'
import geocode from './utils/geocode.mjs'
import weather from './utils/weather.mjs'

//Get current absolute path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app=express()

//Define paths for express config
const viewsPath=path.join(__dirname,'../templates/views')
const publicDirectoryPath=path.join(__dirname,'../public')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Routes
app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Isabel Trica'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Isabel Trica'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpMessage:"Do you need some help? Too bad",
        title:'Help',
        name:'Isabel Trica'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{errorMessage:"Documentation currently unavailable"})
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }
    const address=req.query.address
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        weather(latitude, longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({location,forecast:forecastData,latitude,longitude})
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        errorMessage:"404 - This page does not exist",
        name:'Isabel Trica'
    })
})

app.listen(3000,()=>{
    console.log("Server started on port 3000")
})
