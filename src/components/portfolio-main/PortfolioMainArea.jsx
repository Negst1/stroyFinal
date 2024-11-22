import { Link } from "react-router-dom";
import "./PortfolioMainArea.css";
import PortfolioCard from "../portfolio/PortfolioCard";
import { useNavigate } from "react-router-dom";

const PortfolioMainArea = ({ projects, deleteProject, setEditingProject }) => {
    const navigate = useNavigate();
    return (
      <div className="portfolioMainArea-section">
        <div className="portfolioMainArea-content">
          <div className="portfolioMainArea-btn-wrap__add">
            <Link to="/create-project">
              <button className="portfolioMainArea-btn__add"></button>
            </Link>
          </div>
          <div className="projects-content">
          {projects.length === 0 ? (
            <div>Проекты отсутствуют! :(</div>
          ) : (
            projects.map((project) => (
              <PortfolioCard
                className="project-item"
                key={project.id}
                project={project}
                onDelete={() => deleteProject(project.id)}
                onEdit={() => {
                  setEditingProject(project); // Устанавливаем проект
                  navigate("/create-project"); //
                }}
              />
            ))
          )}
        </div>
        </div>
      </div>
    );
  };
  
 
export default PortfolioMainArea;