import React, { useState } from "react";
import "./ServicePreview.css";
import { useNavigate } from "react-router-dom";

const ServicePreview = ({ service, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleDeleteClick = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleConfirmDelete = () => {
    onDelete(service.id);
    setIsModalOpen(false);
  };
  console.log(service);
  return (
    
    <div className="servicePreview-section">
      <div className="servicePreview-content">
        <div className="servicePreview-content__wrap">
          <div className="servicePreview-content__left">
            <div className="service-name">{service.name}</div>
            <div className="service-status">
              <div className={`${service.isActive ?"service-status__active" : "service-status__unactive"}`}>
                <div className={`${service.isActive ?"service-status__text-active" : "service-status__text-unactive"}`}>
                  {service.isActive ? "Активно" : "Неактивно"}
                </div>
              </div>
            </div>
          </div>
          <div className="service-price__wrap">
            <div className="service-price">
              {
              service.paymentType === "volume" ? service.price + " $/m3" :
              service.paymentType === "hourly" ? service.price + " $/час" : "По договоренности"
              }
            </div>
          </div>
        </div>
        <div className="service-btn__area">
          <div className="service-btn__wrap">
          <div className="service-status__media-mobile">
            <div className={`${service.isActive ?"service-status__active" : "service-status__unactive"}`}>
              <div className={`${service.isActive ?"service-status__text-active" : "service-status__text-unactive"}`}>
                  {service.isActive ? "Активно" : "Неактивно"}
              </div>
            </div>
          </div>
            <button
              className="service-btn__edit"
              onClick={() => {
                onEdit(service); // Передаем выбранную услугу для редактирования
                navigate(`/edit-service/${service.id}`); // Перенаправление на страницу редактирования
              }}
            >

            </button>
            <button
              className="service-btn__delete"
              onClick={handleDeleteClick}
            >

            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content ">
            <p>Вы уверены, что хотите удалить услугу?</p>
            <div className="modal-img__background">
              <div className="modal-img"></div>

            </div>
            <div className="modal-actions">
              <button className="modal-button cancel" onClick={handleCancel}>
                Нет
              </button>
              
              <button className="modal-button delete" onClick={handleConfirmDelete}>
                Да
              </button>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default ServicePreview;
