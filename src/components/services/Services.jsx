import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";
import ServicePreview from "../service-preview/ServicePreview";

const Services = ({ services, deleteService, setEditingService }) => {
  return (
    <main className="services-section">
      <div className="services-content">
        <div className="services-title">Услуги и условия оплаты</div>
        <div className="services-btn-wrap__add">
          <Link to="/create-services">
            <button className="services-btn__add"></button>
          </Link>
        </div>
        {/* Рендеринг всех услуг */}
        {services.map((service) => (
          <ServicePreview
            key={service.id}
            service={service}
            onDelete={deleteService}
            onEdit={setEditingService}
          />
        ))}
      </div>
    </main>
  );
};

export default Services;
