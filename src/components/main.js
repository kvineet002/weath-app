import React, { useEffect } from "react";
import logo from "../logo.svg";
import "../App.css";
import element1 from "../element1.svg";
import element2 from "../element2.svg";
import drops from "../drops.svg"
import searchicon from "../search.svg"
import { useState } from "react";
import Nice from "../nice.svg"
import Nice2 from "../nice2.svg"
import video from "../video (2160p).mp4"
export default function Main() {
  const api_key="f14087b0d3f745c6ba2225616231009";
  const [temp,settemp]=useState(0);
  const [temp2,settemp2]=useState(0);
  const [humidity,sethumid]=useState(0);
  const [name,setname]=useState("New York");
  const [state,setstate]=useState("England");
  const [condition,setcond]=useState("Mist");
  const [day,setday]=useState(0);
  const [Uv,setuv]=useState(0);
  const [preci,setpreci]=useState(0);
  const [Pressure,setpressure]=useState(0);
  const [Wind,setwind]=useState(0);
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const d = new Date();
  const [sec,setsec]=useState(d.getSeconds());
  const [place,setplace]=useState('');
  
const month=d.toLocaleString('en-US', { month: 'short' });
let today = weekday[d.getDay()];
React.useEffect(()=>{
  setInterval(() => {
    setsec(prev=>prev<59?prev+1:0);
  }, 1000);

},[])
  async function search(){
 var url=`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${place}&apqi=no`;
  let responce =await fetch(url);
  let data=await responce.json();
  if(data){settemp(Math.floor(data.current.temp_c));
  sethumid(data.current.humidity);
  setname(data.location.name);
  setday(data.current.is_day);
  setcond(data.current.condition.text);
  setstate(data.location.region);
  setuv(data.current.uv);
  setwind(data.current.wind_kph);
  setpreci(data.current.precip_mm);
  setpressure(data.current.pressure_mb);}


}
    return (
      
      <div className=" mainn flex align-middle justify-center items-center  h-screen w-screen">
       
        <div className="main1 relative  flex align-middle justify-center items-center ">
          
          <div className="main">
            <div className=" relative location text-2xl text-white font-extrabold">
              <h1 className="mt-8 ml-7 absolute location text-2xl text-white font-extrabold">{name}</h1>
              
              <p className="  ml-7 absolute location2 text-md text-gray-200 font-light">{state}</p>
              
              <h1 className=" date  ml-7 absolute location  text-white font-thin">{today} {d.getDate()} {month}</h1>
            </div>
            <div className="relative">
            
              <img
                className="element1 absolute mt-0 flex-shrink-0"
                src={element1}
              />  <h1 className="absolute status">{condition}</h1>
              <h1 id="tempretur" className="absolute temp">{temp}°</h1>
              <h1 className="absolute max">Max:{temp+4}</h1>
              <h1 className="absolute min">Min:{temp-4}</h1>
              
            </div>
            <div className="relative">
              
              <img src={element2} className="element2 absolute" />
              <img src={drops} className="element3 absolute" />
              <h1 className="absolute humidity">HUMIDITY</h1>
              <h1 className="absolute percent">{humidity}%</h1>
            </div>
{day? <img className="absolute icon1 transition ease-in-out" src="https://cdn2.iconfinder.com/data/icons/weather-133/24/Cloud_Sun-1024.png " width="200px" ></img>:<img className="absolute icon2 transition ease-in-out" src="https://cdn3.iconfinder.com/data/icons/weather-pack-3/512/cloudy_night-512.png" width="200px" ></img>
}            
<div className="flex justify-center  impdiv">
<div className=" uv text-center">
  <h1 className="location">{Uv}</h1>
  <p className="">uv</p>
  <hr className="line"/>
  
</div>
<div className=" uv text-center">
  <h1 className="location">{Wind}km/hr</h1>
  <p className="">wind speed</p>
  <hr className="line"/>
  
</div>
<div className=" uv  text-center">
  <h1 className="location">{Pressure}hpa</h1>
  <p className="">pressure</p>
  <hr className="line"/>
  
</div>
<div className="  uv text-center">
  <h1 className="location">{preci}mm</h1>
  <p className="">precipitation</p>
  <hr className="line"/>
  
       
</div>

</div>
          </div>
        <div className="absolute ">
          
            <input onChange={(e)=>setplace(e.target.value)} className="absolute  search " placeholder="Search Location"></input>
          
          <button className="absolute button transition ease-linear hover:scale-1 " onClick={search}><img className="-ml-3 onClick={search}" src={searchicon}/></button>
          </div>
           <h1 className="absolute time">{(d.getHours () + 24) % 12 || 12} : {d.getMinutes()} : <span className="seconds">{sec}</span></h1>
          </div>
          <div>
            <img  className="absolute nice1" src={Nice}/>
          </div>
          <div>
            <img  className="absolute nice2" src={Nice2}/>
          </div>
      </div>
    );
  }
  