import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateService.css";

const CreateService = ({ saveService, editingService, setEditingService }) => {
  const [name, setName] = useState("");
  const [paymentType, setPaymentType] = useState("agreement");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [errors, setErrors] = useState([]); // Храним ошибки
  const [showErrorPopup, setShowErrorPopup] = useState(false); // Для отображения всплывающего окна с ошибками

  const navigate = useNavigate();

  useEffect(() => {
    if (editingService) {
      setName(editingService.name);
      setPaymentType(editingService.paymentType || "agreement");
      setPrice(editingService.price || "");
      setIsActive(editingService.isActive);
    }
  }, [editingService]);

  // Валидация наименование услуги
  const validateName = (value) => {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/; // Разрешаем только буквы и пробелы
    if (!value) {
      return "Наименование услуги обязательно";
    } else if (value.length > 250) {
      return "Максимальная длина наименования — 250 символов";
    } else if (!nameRegex.test(value)) {
      return "Наименование может содержать только буквы и пробелы";
    }
    return "";
  };

  // Валидация формы
  const validateForm = () => {
    const newErrors = [];
    const nameError = validateName(name);
    if (nameError) newErrors.push(nameError);

    if ((paymentType === "hourly" || paymentType === "volume") && !price) {
      newErrors.push("Укажите сумму оплаты");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      setShowErrorPopup(true); // Показываем всплывающее окно с ошибками, если форма не прошла валидацию
      return;
    }

    const newService = {
      id: editingService?.id || null,
      name,
      paymentType,
      price: paymentType === "agreement" ? null : price,
      isActive,
    };

    saveService(newService);
    setEditingService(null);
    navigate("/services");
  };

  const handleCancel = () => {
    setEditingService(null);
    navigate("/services");
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false); // Закрыть окно с ошибками
  };

  return (
    <section className="createServices-section">
      <div className="createServices-content">
        <div className="createServices-title">
          {editingService ? "Редактирование услуги" : "Создание услуги"}
        </div>

        <div className="createServices-wrap">
          <div className="nameService-content">
            <div className="nameService-wrap">
              <label className="nameService-label">Наименование услуги*</label>
              <div className="labelAndError-wrap">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`nameService-input ${errors.includes("Наименование услуги обязательно") || errors.includes("Наименование может содержать только буквы и пробелы") ? "error" : ""}`}
                  placeholder="Введите наименование услуги"
                />
                {errors.includes("Наименование услуги обязательно") && <span className="error-text">Наименование услуги обязательно</span>}
                {errors.includes("Наименование может содержать только буквы и пробелы") && <span className="error-text">Наименование может содержать только буквы и пробелы</span>}
                {errors.includes("Максимальная длина наименования — 250 символов") && <span className="error-text">Максимальная длина наименования — 250 символов</span>}
              </div>
            </div>
          </div>

          {/* Тип и сумма оплаты */}
          <div className="typeAndSumm-content">
            <label className="typeAndSumm-title">Тип и сумма оплаты*</label>
            <div className="labelsError-wrap">
              <div className="typeAndSumm-labels">
                <label className="typeAndSumm-label">
                  <div className="typeAndSumm-checkbox__border">
                    <input
                      type="radio"
                      checked={paymentType === "agreement"}
                      onChange={() => {
                        setPaymentType("agreement");
                        setPrice("");
                      }}
                    />
                  </div>
                  По договоренности
                </label>
                <label className="typeAndSumm-label">
                  <div className="typeAndSumm-checkbox__border">
                    <input
                      type="radio"
                      checked={paymentType === "hourly"}
                      onChange={() => setPaymentType("hourly")}
                    />
                  </div>
                  Почасовая оплата
                  {paymentType === "hourly" && (
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={`typeAndSumm-input ${errors.includes("Укажите сумму оплаты") ? "error" : ""}`}
                      placeholder="Сумма ($/час)"
                    />
                  )}
                </label>
                <label className="typeAndSumm-label">
                  <div className="typeAndSumm-checkbox__border">
                    <input
                      type="radio"
                      checked={paymentType === "volume"}
                      onChange={() => setPaymentType("volume")}
                    />
                  </div>
                  Оплата по объему работ
                  {paymentType === "volume" && (
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={`typeAndSumm-input ${errors.includes("Укажите сумму оплаты") ? "error" : ""}`}
                      placeholder="Сумма ($)"
                    />
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="beActive-content">
            <label className="beActive-title">
              Активность
              <div className="switch">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <span className="slider"></span>
              </div>
            </label>
          </div>

          <div className="createService-btnsArea">
            <div className="btn-cancel__border">
              <button
                className="createService-btn cancel"
                onClick={handleCancel}
              >
                Отмена
              </button>
            </div>
            <div className="btn-save__border">
              <button className="createService-btn save" onClick={handleSave}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Всплывающее окно с ошибками */}
      {showErrorPopup && (
        <div className="error-popup">
          <div className="error-popup-content">
            <h3>Ошибки:</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button onClick={closeErrorPopup} className="btn-close-popup">Закрыть</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateService;
