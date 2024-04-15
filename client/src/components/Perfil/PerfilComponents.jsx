import AboutMe from "./AboutMe/AboutMe";
import PhotoPerfil from "./PhotoPerfil/PhotoPerfil";
import Header from "../UI/Header";
import CreatePublication from "../UI/CreatePublication/CreatePublication";
import "../Perfil/Perfil.css"

function PerfilComponents(){
    return(
        <>
      <Header />
      <section className="content-main-perfil">
      <article className="PhotoPerfil">
      <PhotoPerfil />
      <AboutMe />
      </article>
      <aside className="Publication">
      <CreatePublication />
      </aside >
      </section>
        </>
    )
}

export default PerfilComponents;