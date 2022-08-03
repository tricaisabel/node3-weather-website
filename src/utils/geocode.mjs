import request from 'request'

const geocode=(address,callback)=>{
    console.log(address)
    const url=`http://api.positionstack.com/v1/forward?access_key=a98dfaf67509afbe09edde081a4fcb45&query=${encodeURIComponent(address)}&limit=1`

    request({url,json:true},(error,{body})=>{
        if(error || body.error){
            callback('Unable to connect to location services',undefined)
        }
        else if(body.data.length===0){
            callback("Unable to find location",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.data[0].latitude,
                longitude:body.data[0].longitude,
                location:body.data[0].label
            })
        }
    })
}

export default geocode