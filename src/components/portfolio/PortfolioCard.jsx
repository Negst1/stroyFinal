import React, { useState } from "react";
import "./PortfolioCard.css";

const PortfolioCard = ({ project, onDelete, onEdit }) => {
  // Хук useState должен быть вызван всегда, не в условии
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Если проект не передан, компонент не рендерится
  if (!project) {
    return null;
  }

  const handleDeleteClick = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleConfirmDelete = () => {
    onDelete(project.id); // Удаляем проект, передавая его ID
    setIsModalOpen(false); // Закрываем модальное окно
  };

  return (
    <div className="portfolioCard-section">
      <div className="portfolioCard-content">
        <div className="portfolioCard-photoArea">
          {project.photo ? (
            <img src={project.photo} alt={project.name} className="portfolio-photo" />
          ) : (
            "Фото отсутствует"
          )}
        </div>
        <div className="portfolioCard-title">{project.name || "Название отсутствует"}</div>
        <div className="portfolioCard-description">
          {project.description || "Описание отсутствует"}
        </div>
        <div className="portfolioCard-btnsArea">
          <button className="service-btn__edit" onClick={() => onEdit(project)}>
            
          </button>

          <button className="service-btn__delete" onClick={handleDeleteClick}>
           
          </button>
        </div>
      </div>

      {/* Модальное окно с подтверждением удаления */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <p>Вы уверены, что хотите удалить этот проект?</p>
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

export default PortfolioCard;
