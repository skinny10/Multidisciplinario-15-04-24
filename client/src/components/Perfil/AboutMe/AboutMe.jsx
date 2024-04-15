import React, { useState } from 'react';
import Swal from 'sweetalert2';
import iconedit from '../../../assets/Img/iconedit.png';
import '../../Perfil/AboutMe/AboutMe.css';

function AboutMe() {
  const [aboutText, setAboutText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    setAboutText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (aboutText.trim() !== '') {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas guardar los cambios en tu "About Me"?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          setIsEditing(false);
          Swal.fire('Éxito', 'Tu "About Me" ha sido actualizado', 'success');
        }
      });
    } else {
      Swal.fire('Error', 'El campo "About Me" no puede estar vacío', 'error');
    }
  };

  return (
    <article className="about-me-container">
      <h1>Acerca de mí</h1>
      {!isEditing && (
        <div className="saved-text">
          <p>{aboutText}</p>
          <img
            className="edit-icon"
            src={iconedit}
            alt="Editar"
            onClick={handleEditClick}
          />
        </div>
        
      )}
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <textarea
            className="about-text"
            value={aboutText}
            onChange={handleTextChange}
            placeholder="Escribe algo sobre ti..."
          />
          <button type="submit" className="submit-button">
            Guardar
          </button>
        </form>
      )}
    </article>
  );
}

export default AboutMe;