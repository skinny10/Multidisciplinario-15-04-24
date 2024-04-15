
import HeaderRegister from "./HeaderRegister/HeaderRegister";
import FormRegister from "./FormRegister/FormRegister";
import "../../assets/Fondo.css"

function RegisterComponents(){
    return(
        <>
        <div className="content-form">
            <HeaderRegister/>
            <FormRegister/>
        </div>
        </>
    )
}

export default RegisterComponents;