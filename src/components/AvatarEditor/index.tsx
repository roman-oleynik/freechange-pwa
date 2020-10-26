import React from 'react';
import imageCompression from 'browser-image-compression';
import './style.scss';

type Props = {
    avatarSrc: string
    changeAvatar: (src: string | Blob) => void
    clearAvatar: () => void
}
export const AvatarEditor = ({ avatarSrc, changeAvatar, clearAvatar }: Props) => {
  const handleAvatarChange = (EO: any) => {
    const file = EO.target.files && EO.target.files[0];
    const hasPictureFormat = /\.(jpe?g|png|gif)$/i.test(file.name);

    if (file && hasPictureFormat) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 500,
        useWebWorker: true
      };
      imageCompression(file, options)
        .then((img: Blob) => changeAvatar(img))
        .catch(err => console.log(err));
    } else {
      // Message toast
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