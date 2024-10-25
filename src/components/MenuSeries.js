// src/components/MenuSeries.js
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Global from './Global';

export default class MenuSeries extends Component {
    state = {
        series: []
    };

    loadSeries = () => {
        const url = `${Global.url}/api/Series`;
        axios.get(url)
            .then(response => {
                this.setState({ 
                    series: response.data 
                }); 
            })
            .catch(error => {
                console.error("Error al cargar las series:", error);
            });
    };

    componentDidMount() {
        this.loadSeries();
    }

    navegarSerie = (idSerie) => {
        if (idSerie) {
            window.location.href = `/serie/${idSerie}`;
        }
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Home</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/nuevo">Nuevo personaje</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/modificar">Modificar personajes</NavLink>
                        </li>
                        <li className="nav-item">
                            <select id="seriesSelect" className="form-control" onChange={(e) => this.navegarSerie(e.target.value)}>
                                <option value="">Series</option>
                                {this.state.series.map(serie => (
                                    <option key={serie.idSerie} value={serie.idSerie}>
                                        {serie.nombre}
                                    </option>
                                ))}
                            </select>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
