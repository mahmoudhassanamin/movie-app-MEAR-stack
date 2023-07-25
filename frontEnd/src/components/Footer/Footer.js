import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function Footer() {
  
  return (
    <>
    <footer className="text-center text-white footer">
 
     <div className="container p-4">
   
    <section className="mb-4">
    {/* className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}} */}
  <p style={{display:"inline"}} >
    © 2020 Copyright :
    <a className="text-white m-3" href="https://www.linkedin.com/in/mahmoud-hassan123/" target="_blank">Mahmoud hassan</a>
  </p>
      <p style={{display:"inline"}}>Contact Me : </p>
      <a className="btn btn-outline-light btn-floating m-1" href="mailto:mahmoudhassanamin123@gmail.com" target="_blank" role="button"><FontAwesomeIcon icon="fa-brands fa-google" /></a>


      <a className="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/mahmoud-hassan123/" target="_blank" role="button"><FontAwesomeIcon icon="fa-brands fa-linkedin-in" /></a>

     
      <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/mahmoudhassanamin" target="_blank" role="button"><FontAwesomeIcon icon="fa-brands fa-github" /></a>
    </section>


    
  
  </div>
 

  
  
</footer>
</>
  )
}

export default Footer
