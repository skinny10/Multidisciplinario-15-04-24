import "./Amigos.css"

function Amigos ({image, name, correo}) {
    return (
        <>
        <div className="container-amigo">
            <div className="amigos-content">
                 <img src={image} alt="perfil" />
            </div>

            <div>
                <h1>{name}</h1>
                <p>{correo}</p>
            </div>
        </div>
        </>
    )
}

export default Amigos;