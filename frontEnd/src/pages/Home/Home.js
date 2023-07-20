import { useEffect, useState } from "react"
import "./Home.css"
import videoBg from "./video.mp4"
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
      <video  autoPlay muted loop src={"https://player.vimeo.com/external/410111061.sd.mp4?s=519996bfe2e6393e3adac2a616aed3545e9da13b&profile_id=164&oauth2_token_id=57447761"} />
        <div className="cover d-flex justify-content-center  align-items-center">
            {welcome}
        </div>
    </div>
    </>
  )
}

export default Home
