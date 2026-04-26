import React from 'react';
import './menu.css';

const Menu = () => {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <ul>
                    <li className="active">
                        <div className="nav-item-content">
                            <i className="bi bi-grid-fill"></i>
                            <span>Home</span>
                        </div>
                    </li>
                    <li>
                        <div className="nav-item-content">
                            <i className="bi bi-mortarboard-fill"></i>
                            <span>Registro Alumnos</span>
                        </div>
                    </li>
                    <li>
                        <div className="nav-item-content">
                            <i className="bi bi-person-workspace"></i>
                            <span>Registro Docentes</span>
                        </div>
                    </li>
                    <li>
                        <div className="nav-item-content">
                            <i className="bi bi-book"></i>
                            <span>Registro Materias</span>
                        </div>
                    </li>
                    <li>
                        <div className="nav-item-content">
                            <i className="bi bi-bar-chart-fill"></i>
                            <span>Estadisticas</span>
                        </div>
                    </li>

                    <li>
                        <div className="nav-item-content">
                            <i className="bi bi-gear"></i>
                            <span>Configuración</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Menu;
