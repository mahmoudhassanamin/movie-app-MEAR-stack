import { useEffect, useState } from "react"
import "./Home.css"

import { useLocation } from "react-router-dom"
function Home() {
    let currentLetter = 1;
    let intervalRef;
    const [welcome,setWelcome]=useState("");
    let homeWelcomeWord="Welcome";
    useEffect(()=>{
        intervalRef=setInterval(()=>{
            if(currentLetter > homeWelcomeWord.length){
                currentLetter = 0
                setWelcome("")
            }else{
                setWelcome(homeWelcomeWord.slice(0,currentLetter))
                currentLetter++
            }
        },700)
    },[])

    useEffect(()=>{
        return ()=>clearInterval(intervalRef)
    },[])
  return (
    <>
    <div className="vidoe">
      <video  autoPlay muted loop src={"https://cdn.pixabay.com/vimeo/689949818/sunset-111204.mp4?width=960&hash=1671fb736830d8990da2b453fd48b949ce826da5"} />
        <div className="cover d-flex justify-content-center  align-items-center">
            {welcome}
        </div>
    </div>
    </>
  )
}

export default Home
