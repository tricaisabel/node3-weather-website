import request from 'request'

const weather=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=e4a293df7042445eb1fd3b72ddb23757&query=${latitude},${longitude}&units=f`
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to weather services.",undefined)
        }
        else if(body.error){
            callback('Unable to find location.'+latitude+","+longitude,undefined)
        }
        else{
            callback(undefined,{
                description:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                windSpeed:body.current.wind_speed

            })
        }
    })
}

export default weather