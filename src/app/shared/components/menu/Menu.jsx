import React from 'react';
import './menu.css';

const Menu = ({ vista, setVista }) => {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <ul>
                   
                    <li className={vista === 'home' ? 'active' : ''} onClick={() => setVista && setVista('home')}>
                        <div className="nav-item-content">
                            <i className="bi bi-grid-fill"></i>
                            <span>Home</span>
                        </div>
                    </li>
                    <li className={vista === 'alumnos' ? 'active' : ''} onClick={() => setVista && setVista('alumnos')}>
                        <div className="nav-item-content">
                            <i className="bi bi-mortarboard-fill"></i>
                            <span>Registro Alumnos</span>
                        </div>
                    </li>
                    <li className={vista === 'docentes' ? 'active' : ''} onClick={() => setVista && setVista('docentes')}>
                        <div className="nav-item-content">
                            <i className="bi bi-person-workspace"></i>
                            <span>Registro Docentes</span>
                        </div>
                    </li>
                    <li className={vista === 'materias' ? 'active' : ''} onClick={() => setVista && setVista('materias')}>
                        <div className="nav-item-content">
                            <i className="bi bi-book"></i>
                            <span>Registro Materias</span>
                        </div>
                    </li>

                    <li className={vista === 'lista-alumnos' ? 'active' : ''} onClick={() => setVista && setVista('lista-alumnos')}>
                        <div className="nav-item-content">
                            <i className="bi bi-table"></i>
                            <span>Tabla Alumnos</span>
                        </div>
                    </li>
                    <li className={vista === 'lista-docentes' ? 'active' : ''} onClick={() => setVista && setVista('lista-docentes')}>
                        <div className="nav-item-content">
                            <i className="bi bi-table"></i>
                            <span>Tabla Docentes</span>
                        </div>
                    </li>
                    <li className={vista === 'lista-materias' ? 'active' : ''} onClick={() => setVista && setVista('lista-materias')}>
                        <div className="nav-item-content">
                            <i className="bi bi-table"></i>
                            <span>Tabla Materias</span>
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
