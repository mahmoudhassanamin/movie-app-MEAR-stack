import { useEffect, useState } from "react"
import "./Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
let intervalRef1,intervalRef2;
function Home() {
    let currentLetter = 1;
    let sliderCounter=0;
    const [welcome,setWelcome]=useState("");
    const navigate = useNavigate()

    let homeWelcomeWord="Join our vibrant community of like-minded individuals and engage in discussions, share your experiences, and learn from others. We believe in the power of knowledge sharing and collaboration, and we're excited to have you on board.";
    let sliderMovies = [
        {
            id: 872585,
            original_title: "Oppenheimer",
            overview: "The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.",
           
            poster_path: "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
            
        },
        {
            id: 298618,
            original_title: "The Flash",
            overview: "When his attempt to save his family inadvertently alters the future, Barry Allen becomes trapped in a reality in which General Zod has returned and there are no Super Heroes to turn to. In order to save the world that he is in and return to the future that he knows, Barry's only hope is to race for his life. But will making the ultimate sacrifice be enough to reset the universe?",
          
            poster_path: "/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
            
        },
        {
            id: 667538,
            original_title: "Transformers: Rise of the Beasts",
            overview: "When a new threat capable of destroying the entire planet emerges, Optimus Prime and the Autobots must team up with a powerful faction known as the Maximals. With the fate of humanity hanging in the balance, humans Noah and Elena will do whatever it takes to help the Transformers as they engage in the ultimate battle to save Earth.",
           
            poster_path:  "/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg",
           
        },
        {
            id: 447365,
            original_title: "Guardians of the Galaxy Vol. 3",
            overview: "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.",
            poster_path:  "/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
           
        },
        { 
            id: 459003,
            original_title: "Мавка: Лісова пісня",
            overview: "Mavka — a Soul of the Forest and its Warden — faces an impossible choice between love and her duty as guardian to the Heart of the Forest, when she falls in love with a human — the talented young musician Lukas.",
            poster_path: "/14GEZCzCGhV7FMFaWi4Ec22Kcai.jpg",
        },
    ]
    let [currentMovie,setCurrentMovie]=useState({})

    const sliderInterval=()=>{
        intervalRef2=setInterval(()=>{
            if(sliderCounter === sliderMovies.length){
                sliderCounter=0
            }
            setCurrentMovie(sliderMovies[sliderCounter++])
            
            
        },1500)
    }
    const welcomeParagraphInterval=()=>{
        intervalRef1=setInterval(()=>{
            
            if(currentLetter > homeWelcomeWord.length){
                clearInterval(intervalRef1)
            }else{
                setWelcome(homeWelcomeWord.slice(0,currentLetter))
                currentLetter++
            }
        },50)
    }

    useEffect(()=>{
        welcomeParagraphInterval()
        sliderInterval()
        
    },[])

    useEffect(()=>{
        return ()=>{
            clearInterval(intervalRef1)
            clearInterval(intervalRef2)
            
        }
    },[])
    const getMovieById = (id) => {
        navigate(`/movies/${id}`)
    }
  return (
    <>
    <div className=" position-relative ">
      <video  autoPlay muted loop src={"https://cdn.pixabay.com/vimeo/689949818/sunset-111204.mp4?width=960&hash=1671fb736830d8990da2b453fd48b949ce826da5"} />
        <div className="cover">
            <h1 className=" welcome">welcome to movies community</h1>
            <p className=" w-50">{welcome} </p>
        </div>
    </div>
    <div className="sliderContainer">
            <div className="sliderController rounded-3 " onMouseEnter={()=>clearInterval(intervalRef2)}  onMouseLeave={sliderInterval}>
                <img className="sliderImg rounded-3" onClick={()=>getMovieById(currentMovie.id)} src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}/>
            </div>
           <div className=" text-dark fw-bold">
            <h2 >Overview</h2>
            {currentMovie.overview}
           </div>
    </div>
     
    </>

  )
}

export default Home
