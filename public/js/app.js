const weatherForm=document.querySelector("form")
const search=document.querySelector("input")

const result=document.getElementById("result")
const coords=document.getElementById("coords")
const description=document.getElementById("description")
const temperature=document.getElementById("temperature")
const wind=document.getElementById("wind")

weatherForm.addEventListener("submit",(event)=>{
    event.preventDefault()

    const location=search.value

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then(({error,location,latitude,longitude,forecast}={})=>{
            if(error){
                coords.innerText=temperature.innerText=wind.innerText=description.innerText=""
                return result.innerText=error

            }
            result.innerText=`Location name: ${location}`
            coords.innerText=`Coordinates: lat -  ${latitude}, long - ${longitude}`
            description.innerText=`Description: ${forecast.description}`

            const celsius=Math.trunc((forecast.temperature-32)*5/9)
            temperature.innerText=`Temperature: ${forecast.temperature} F / ${celsius} C`
            wind.innerText=`Wind: ${forecast.windSpeed} km/h`
            
        })
    })
})