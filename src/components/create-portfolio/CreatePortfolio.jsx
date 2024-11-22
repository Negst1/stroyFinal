import "./CreatePortfolio.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePortfolio = ({ savePortfolio, editingProject, setEditingProject }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name || "");
      setDescription(editingProject.description || "");
      setPhoto(editingProject.photo || null);
      setPrice(editingProject.price || 0);
    } else {
      resetForm();
    }
  }, [editingProject]);

  const resetForm = () => {
    setName("");
    setPhoto(null);
    setDescription("");
    setPrice(0);
    setErrors([]);
  };

  const validateName = (value) => {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    if (!value) return "Поле наименование не может быть пустым.";
    if (value.length > 250) return "Максимальная длина наименования — 250 символов.";
    if (!nameRegex.test(value)) return "Наименование может содержать только буквы и пробелы.";
    return "";
  };

  const validatePhoto = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file && file.size > maxSize) return "Размер файла не должен превышать 10 МБ.";
    return "";
  };

  const validatePrice = (value) => {
    if (value === "") return "Поле стоимость не может быть пустым.";
    if (!/^\d+$/.test(value)) return "Введите корректное число для стоимости.";
    return "";
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const photoError = validatePhoto(file);
    if (photoError) {
      setErrors((prev) => [...prev, photoError]);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Устанавливаем Data URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const priceError = validatePrice(value);
    if (priceError) {
      setErrors((prev) => [...prev, priceError]);
    } else {
      setPrice(value);
    }
  };

  const validateForm = () => {
    const formErrors = [];

    const nameError = validateName(name);
    if (nameError) formErrors.push(nameError);

    const priceError = validatePrice(price);
    if (priceError) formErrors.push(priceError);

    const photoError = validatePhoto(photo);
    if (photoError) formErrors.push(photoError);

    if (formErrors.length > 0) {
      setErrors(formErrors);
      setShowErrorPopup(true);
      return false;
    }

    return true;
  };

  const handleClickSave = () => {
    if (validateForm()) {
      const newPortfolio = {
        id: editingProject?.id || null,
        name,
        photo,
        description,
        price
      };

      savePortfolio(newPortfolio);

      resetForm();
      setEditingProject(null);
      navigate("/portfolio");
    }
  };

  const handleClickCancel = () => {
    setEditingProject(null);
    resetForm();
    navigate("/portfolio");
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  return (
    <div className="createPortfolio-section">
      <div className="createPortfolio-content">
        <div className="createPortfolio-title title">
          {editingProject ? "Редактировать проект" : "Создать проект"}
        </div>

        <div className="createPortfolio-wrap">
          <label className="createPortfolio-label">Наименование проекта*</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-input"
            placeholder="Введите наименование проекта"
          />
        </div>

        <div className="createPortfolio-wrap">
          <label className="createPortfolio-label">Фото проекта</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="photo-input"
          />
          {photo && <img src={photo} alt="Превью" className="photo-preview" />}
        </div>

        <div className="createPortfolio-wrap">
          <label className="createPortfolio-label">Описание проекта</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
            placeholder="Введите описание проекта"
          />
        </div>

        <div className="createPortfolio-wrap">
          <label className="createPortfolio-label">Стоимость проекта</label>
          <div className="price-wrap">
            <input
              type="number"
              value={price}
              onChange={handlePriceChange}
              className="typeAndSumm-input"
              placeholder="Сумма ($/час)"
            />
          </div>
        </div>

      </div>

      <div className="createService-btnsArea">
        <div className="btn-cancel__border">
          <button
            className="createService-btn cancel"
            onClick={handleClickCancel}
          >
            Отмена
          </button>
        </div>
        <div className="btn-save__border">
          <button className="createService-btn save" onClick={handleClickSave}>
            Сохранить
          </button>
        </div>
      </div>

      {showErrorPopup && (
        <div className="error-popup">
          <div className="error-popup-content">
            <h3>Ошибка</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button onClick={closeErrorPopup} className="btn-close-popup">Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePortfolio;
