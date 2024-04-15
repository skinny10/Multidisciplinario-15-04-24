import { Card, Message, Button, Input, Label } from "../../UI";
import logo from '../../../assets/Img/Logo.png';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../schemas/auth";
import Swal from 'sweetalert2';


function FormLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated, isAdmin, authContext } = useAuth();
  const navigate = useNavigate(); // Obtiene el hook useNavigate

  // ... (el resto del código)

  const onSubmit = async (data) => {
    try {
      const res = await signin(data, navigate); // Pasa el hook useNavigate a la función signin
      if (res.status === 200) {
        if (isAdmin(data.email, data.password)) {
          navigate('/Admin');
        } else {
          navigate('/home');
        }
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Has iniciado sesión correctamente.',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'El correo electrónico o la contraseña son incorrectos.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '¡Correo o Contraseña no válidos!',
        });
      }
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);


  return (
    <>
      <div className="h-[calc(100vh-100px)] flex items-center justify-center text-white">
        <Card>
          {loginErrors.map((error, i) => (
            <Message message={error} key={i} />
          ))}
          <div className="flex items-center justify-center">
            <img className="h-16 rounded-lg" src={logo} alt="Your Company" />
          </div>
          <h1 className="text-2xl font-bold text-white ">Login</h1>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="email">Correo Electronico</Label>
            <Input
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-8 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              label="Write your email"
              type="email"
              name="email"
              placeholder="youremail@domain.tld"
              {...register("email", { required: true })}
            />
            <p>{errors.email?.message}</p>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-8 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              type="password"
              name="password"
              placeholder="Write your password"
              {...register("password", { required: true, minLength: 6 })}
            />
            <p>{errors.password?.message}</p>

            <Button type="submit">Login</Button>

            <p className="mt-10 text-center text-sm text-gray-50">
              Aun no tienes una cuenta?{' '}
              <Link to='/Register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Registrate ahora!!
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </>
  )
}

export default FormLogin;