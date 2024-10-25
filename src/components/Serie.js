import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';

export default class Serie extends Component {
    state = {
        serie: null,
        personajes: [],
        mostrarPersonajes: false,
    };

    loadSerie = () => {
        const { id } = this.props;
        const url = `${Global.url}/api/Series/${id}`;
        
        axios.get(url)
            .then(response => {
                this.setState({ serie: response.data });
            })
            .catch(error => {
                console.error("Error al cargar la serie:", error);
            });
    };

    loadPersonajes = () => {
        const { id } = this.props;
        const url = `${Global.url}/api/Series/PersonajesSerie/${id}`;
        
        axios.get(url)
            .then(response => {
                this.setState({ personajes: response.data, mostrarPersonajes: true });
            })
            .catch(error => {
                console.error("Error al cargar los personajes:", error);
            });
    };

    componentDidMount() {
        this.loadSerie();
    }

    mostrarPersonajes = () => {
        this.loadPersonajes();
        this.setState({ mostrarPersonajes: true });
    };

    volver = () => {
        this.setState({ mostrarPersonajes: false });
    };

    render() {
        const { serie, personajes, mostrarPersonajes } = this.state;

        return (
            <div className="container mt-4">
                {!mostrarPersonajes ? (
                    serie && (
                        <div id="serieCard" className="card text-center">
                            <img id="imagenSerie" src={serie.imagen} alt="Imagen de la serie" className="card-img-top" style={{ maxWidth: '300px', margin: 'auto' }} />
                            <div className="card-body">
                                <h3 id="nombreSerie" className="card-title">{serie.nombre}</h3>
                                <p><strong>Puntuación:</strong> <span id="puntuacionSerie">{serie.puntuacion}</span></p>
                                <button onClick={this.mostrarPersonajes} className="btn btn-primary">
                                    Mostrar Personajes
                                </button>
                            </div>
                        </div>
                    )
                ) : (
                    <div id="personajesTabla">
                        <button onClick={this.volver} className="btn btn-secondary mb-3">Volver</button>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nombre del Personaje</th>
                                    <th>Imagen</th>
                                </tr>
                            </thead>
                            <tbody id="listaPersonajes">
                                {personajes.map((personaje, index) => (
                                    <tr key={index}>
                                        <td>{personaje.nombre}</td>
                                        <td>
                                            <img src={personaje.imagen} style={{ width: '100px' }} alt={`Imagen de ${personaje.nombre}`} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}