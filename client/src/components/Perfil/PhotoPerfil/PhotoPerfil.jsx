import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import iconedit from '../../../assets/Img/iconedit.png';
import "../PhotoPerfil/PhotoPerfil.css";
import { Button } from "../../UI";
import axios from "axios"; // Importar Axios

function PhotoPerfil() {
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: !isEditing,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (previewImage) {
      try {
        const formData = new FormData();
        formData.append("profileImage", previewImage); // Asegúrate de que el nombre coincida con lo que espera tu backend

        const response = await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Agrega otras cabeceras necesarias, como tokens de autenticación
          },
        });

        console.log(response.data); // Maneja la respuesta del backend como necesites

        Swal.fire("Éxito", "Tu foto de perfil ha sido actualizada", "success");
        setIsEditing(false);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        Swal.fire("Error", "Ha ocurrido un error al subir la imagen", "error");
      }
    }
  };


  return (
    <>
      <div className="content-main">
        <div className="photo-container">
          <div
            className={`Drop-Photo ${previewImage ? "has-preview" : ""}`}
            style={{
              backgroundImage: previewImage ? `url(${previewImage})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            {...getRootProps()}
          >
            <input className="Photo-Perfil" type="file" {...getInputProps()} />
            {isDragActive ? (
              <p>Arrastra la imagen...</p>
            ) : !isEditing && previewImage ? (
              <p className="texto"></p>
            ) : (
              <p className="texto">Agregar Imagen...</p>
            )}
          </div>
          {!isEditing && (
            <button className="edit-button" onClick={handleEditClick}>
              <img className="image-icone" src={iconedit} alt="Editar" />
            </button>
          )}
        </div>
        {isEditing && (
          <form onSubmit={handleSubmit}>
            <Button>guardar</Button>
          </form>
        )}
      </div>
    </>
  );
}

export default PhotoPerfil;
