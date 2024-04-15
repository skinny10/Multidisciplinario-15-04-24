import { Card, Message, Button, Input, Label } from "../../UI";
import { useAuth } from "../../../context/authContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../schemas/auth";
import logo from '../../../assets/Img/Logo.png';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; 


function FormRegister (){
   
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const { signup, errors: registerErrors, isAuthenticated  } = useAuth();
  const navigate = useNavigate ();


const onSubmit = (data) => {
  signup(data);
  Swal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: 'Te has registrado exitosamente!',
  }).then(() => {
    Swal.fire({
      title: "Agrega una foto de perfil!, ve al apartado de perfil.",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  });
};

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  
    return(
        <>
        <div className="h-[calc(100vh-100px)] flex items-center justify-center text-white">
        <Card >
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}

         <div className="flex items-center justify-center">
              <img className="h-16 rounded-lg" src={logo} alt="Your Company"/>
         </div>

        <h1 className="text-3xl font-bold text-white  ">Register</h1>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Username</Label>
          <Input
           className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-8 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            type="text"
            name="username"
            placeholder="Username"
            {...register("username")}
            autoFocus
          />
          {errors.username?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}

          <Label htmlFor="email">Email</Label>
          <Input
           className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-8 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            name="email"
            placeholder="email@gmail.com"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <Label htmlFor="password">Password</Label>
          <Input
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-8 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            type="password"
            name="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-8 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
          <div className="text-white text-right m-1">
         <Button  >Register</Button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-50">
                Ya tienes una cuenta?{' '}
                <Link to='/' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Iniciar Sesion!!
                </Link>
          </p>
          
        </form>
       
      </Card>
        </div>
      
        </>
    )
}

export default FormRegister;