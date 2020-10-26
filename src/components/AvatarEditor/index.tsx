import React from 'react';
import './style.scss';

type Props = {
    avatarSrc: string
    changeAvatar: (src: string) => void
    clearAvatar: () => void
}
export const AvatarEditor = ({ avatarSrc, changeAvatar, clearAvatar }: Props) => {
  const handleAvatarChange = (EO: any) => {
    const file = EO.target.files && EO.target.files[0];
    const hasPictureFormat = /\.(jpe?g|png|gif)$/i.test(file.name);

    if (file && hasPictureFormat) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => changeAvatar(reader.result as string);

      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  }
  return (
    <section className="container py-4 px-3">
      <div className="row">
        <div className="col-7">
          <div className="avatar-container d-flex justify-content-center align-items-center">
          {
            avatarSrc
            ?
            <img
              src={avatarSrc}
              alt="Avatar of a new thing"
              className="img-avatar"
            />
            :
            <p className="text-center pt-2">No photo</p>
          }
          </div>
        
        </div>
        <div className="col-5 d-flex flex-column justify-content-center align-items-center">
          <label className="btn btn-primary">
            Изменить
            <input
              type="file"
              onChange={handleAvatarChange}
              className="Invisible-Checkbox"
            />
          </label>
          <button
            type="button"
            className="btn btn-danger"
            onClick={(EO) => {
                EO.preventDefault();
                clearAvatar();
            }}>
            Удалить
          </button>
          </div>
      </div>
    </section>
  );
};