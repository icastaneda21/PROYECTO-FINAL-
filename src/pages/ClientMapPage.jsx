import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './ClientMapPage.css';

// Coordenadas centrales (Bogotá) y lista de empresas
const center = [4.60971, -74.08175];

const companies = [
    {
      id: 1,
      name: "Constructora Soluciones Globales S.A.",
      address: "Calle 45 #27-16, Zona Industrial, Bogotá, Colombia",
      phone: "+57 1 555 0123",
      email: "contacto@solucionesglobales.com.co",
      website: "www.solucionesglobales.com.co",
      coordinates: [4.60971, -74.08175],
      description: "Empresa líder en el sector de la construcción y proveedora de materiales industriales.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 6:00 PM",
        saturday: "Sábados: 9:00 AM - 2:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 2,
      name: "Ingeniería y Servicios S.A.",
      address: "Carrera 10 #15-20, Bogotá, Colombia",
      phone: "+57 1 555 0456",
      email: "info@ingenieriayservicios.com.co",
      website: "www.ingenieriayservicios.com.co",
      coordinates: [4.6155, -74.082],
      description: "Servicios de ingeniería especializada en infraestructura.",
      hours: {
        weekday: "Lunes a Viernes: 9:00 AM - 5:00 PM",
        saturday: "Sábados: 9:00 AM - 1:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 3,
      name: "CaliProyectos Ingeniería S.A.",
      address: "Avenida Roosevelt #24-32, Cali, Colombia",
      phone: "+57 2 445 6789",
      email: "contacto@caliproyectos.com.co",
      website: "www.caliproyectos.com.co",
      coordinates: [3.42158, -76.5205],
      description: "Proyectos de ingeniería en desarrollo urbano y arquitectura sostenible.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 6:00 PM",
        saturday: "Sábados: 9:00 AM - 1:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 4,
      name: "Estructuras y Diseño Medellín",
      address: "Calle 30 #45-67, Medellín, Colombia",
      phone: "+57 4 312 4567",
      email: "contacto@estructurasydiseno.com.co",
      website: "www.estructurasydiseno.com.co",
      coordinates: [6.2442, -75.5812],
      description: "Especialistas en diseño estructural y construcción sostenible.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 5:30 PM",
        saturday: "Sábados: 8:00 AM - 12:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 5,
      name: "Ingeniería Avanzada de Bogotá",
      address: "Carrera 8 #21-10, Bogotá, Colombia",
      phone: "+57 1 328 9999",
      email: "info@ingenieriaavanzada.com.co",
      website: "www.ingenieriaavanzada.com.co",
      coordinates: [4.6097, -74.0817],
      description: "Servicios de ingeniería avanzada en proyectos de infraestructura y sostenibilidad.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 6:00 PM",
        saturday: "Sábados: 8:00 AM - 1:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 6,
      name: "Construcciones del Valle S.A.",
      address: "Calle 18 #32-54, Cali, Colombia",
      phone: "+57 2 478 0123",
      email: "info@construccionesvalle.com.co",
      website: "www.construccionesvalle.com.co",
      coordinates: [3.4516, -76.5319],
      description: "Empresa dedicada a la construcción de infraestructura urbana y rural.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 5:30 PM",
        saturday: "Sábados: 8:00 AM - 12:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 7,
      name: "Obras y Diseño de Medellín",
      address: "Carrera 50 #32-10, Medellín, Colombia",
      phone: "+57 4 311 1234",
      email: "contacto@obrasydiseno.com.co",
      website: "www.obrasydiseno.com.co",
      coordinates: [6.2518, -75.5636],
      description: "Expertos en diseño y construcción de edificaciones industriales.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 6:00 PM",
        saturday: "Sábados: 9:00 AM - 1:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 8,
      name: "Proyectos Modernos Bogotá",
      address: "Calle 12 #34-56, Bogotá, Colombia",
      phone: "+57 1 445 9876",
      email: "info@proyectosmodernos.com.co",
      website: "www.proyectosmodernos.com.co",
      coordinates: [4.6013, -74.0765],
      description: "Innovación en proyectos de ingeniería civil y urbana.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 5:00 PM",
        saturday: "Sábados: 8:00 AM - 12:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 9,
      name: "Soluciones Estructurales Cali",
      address: "Calle 9 #23-45, Cali, Colombia",
      phone: "+57 2 313 6789",
      email: "contacto@solucionesestructurales.com.co",
      website: "www.solucionesestructurales.com.co",
      coordinates: [3.4372, -76.5225],
      description: "Soluciones de diseño y construcción en proyectos de infraestructura.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 5:00 PM",
        saturday: "Sábados: 8:00 AM - 1:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 10,
      name: "Ingeniería de Infraestructura Medellín",
      address: "Carrera 43A #19-15, Medellín, Colombia",
      phone: "+57 4 445 7788",
      email: "info@infraestructuramed.com.co",
      website: "www.infraestructuramed.com.co",
      coordinates: [6.2519, -75.5636],
      description: "Empresa de ingeniería enfocada en proyectos de infraestructura urbana.",
      hours: {
        weekday: "Lunes a Viernes: 9:00 AM - 6:00 PM",
        saturday: "Sábados: 8:00 AM - 12:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 11,
      name: "Civiles y Construcciones Bogotá",
      address: "Carrera 14 #27-16, Bogotá, Colombia",
      phone: "+57 1 412 5566",
      email: "contacto@civilesyconstrucciones.com.co",
      website: "www.civilesyconstrucciones.com.co",
      coordinates: [4.6035, -74.0779],
      description: "Proyectos civiles y de construcción con énfasis en sostenibilidad.",
      hours: {
        weekday: "Lunes a Viernes: 8:30 AM - 5:30 PM",
        saturday: "Sábados: 9:00 AM - 1:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 12,
      name: "Innovación y Desarrollo de Cali",
      address: "Calle 5 #10-20, Cali, Colombia",
      phone: "+57 2 311 9876",
      email: "info@innovacionydesarrollo.com.co",
      website: "www.innovacionydesarrollo.com.co",
      coordinates: [3.4341, -76.5295],
      description: "Empresa de ingeniería y desarrollo de soluciones arquitectónicas.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 5:00 PM",
        saturday: "Sábados: 8:00 AM - 1:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 13,
      name: "Proyectos Urbanos Medellín",
      address: "Calle 20 #40-32, Medellín, Colombia",
      phone: "+57 4 312 9876",
      email: "contacto@proyectosurbanos.com.co",
      website: "www.proyectosurbanos.com.co",
      coordinates: [6.253, -75.564],
      description: "Servicios de ingeniería en proyectos urbanos y sostenibles.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 5:00 PM",
        saturday: "Sábados: 9:00 AM - 1:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 14,
      name: "Ingeniería Total Cali",
      address: "Carrera 15 #25-20, Cali, Colombia",
      phone: "+57 2 444 5566",
      email: "info@ingenieriatotal.com.co",
      website: "www.ingenieriatotal.com.co",
      coordinates: [3.4216, -76.5221],
      description: "Especialistas en soluciones de ingeniería integral.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 5:30 PM",
        saturday: "Sábados: 8:00 AM - 12:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 15,
      name: "Construcciones Integrales Bogotá",
      address: "Carrera 7 #33-44, Bogotá, Colombia",
      phone: "+57 1 456 7788",
      email: "contacto@construccionesintegrales.com.co",
      website: "www.construccionesintegrales.com.co",
      coordinates: [4.6094, -74.082],
      description: "Construcciones civiles e industriales de alto nivel.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 6:00 PM",
        saturday: "Sábados: 9:00 AM - 1:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 16,
      name: "Proyectos e Infraestructura S.A.",
      address: "Carrera 13 #18-10, Bogotá, Colombia",
      phone: "+57 1 555 6789",
      email: "info@proyectoseinfraestructura.com.co",
      website: "www.proyectoseinfraestructura.com.co",
      coordinates: [4.6028, -74.0786],
      description: "Empresa de ingeniería especializada en infraestructura pública.",
      hours: {
        weekday: "Lunes a Viernes: 8:30 AM - 5:30 PM",
        saturday: "Sábados: 9:00 AM - 1:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 17,
      name: "Cali Infraestructura Ltda.",
      address: "Avenida 6 #40-16, Cali, Colombia",
      phone: "+57 2 300 4567",
      email: "contacto@caliinfraestructura.com.co",
      website: "www.caliinfraestructura.com.co",
      coordinates: [3.4375, -76.5283],
      description: "Proyectos de infraestructura en el sector público y privado.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 5:00 PM",
        saturday: "Sábados: 8:00 AM - 1:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 18,
      name: "Ingeniería Urbana Medellín",
      address: "Carrera 58 #23-12, Medellín, Colombia",
      phone: "+57 4 323 4567",
      email: "info@ingenieriaurbana.com.co",
      website: "www.ingenieriaurbana.com.co",
      coordinates: [6.2502, -75.5648],
      description: "Servicios de ingeniería en planificación urbana y desarrollo sostenible.",
      hours: {
        weekday: "Lunes a Viernes: 9:00 AM - 6:00 PM",
        saturday: "Sábados: 8:00 AM - 12:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 19,
      name: "Diseño y Construcción Bogotá",
      address: "Calle 22 #10-18, Bogotá, Colombia",
      phone: "+57 1 332 4455",
      email: "info@disenoyconstruccion.com.co",
      website: "www.disenoyconstruccion.com.co",
      coordinates: [4.6052, -74.0805],
      description: "Servicios de diseño y construcción en proyectos residenciales.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 5:00 PM",
        saturday: "Sábados: 9:00 AM - 1:00 PM",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      id: 20,
      name: "Constructora del Valle",
      address: "Calle 8 #25-20, Cali, Colombia",
      phone: "+57 2 400 5566",
      email: "contacto@constructoradelvalle.com.co",
      website: "www.constructoradelvalle.com.co",
      coordinates: [3.435, -76.531],
      description: "Expertos en construcción de obras urbanas y rurales en el Valle del Cauca.",
      hours: {
        weekday: "Lunes a Viernes: 8:00 AM - 6:00 PM",
        saturday: "Sábados: 8:00 AM - 12:00 PM",
        sunday: "Domingos: Cerrado"
      }
    }
  ];  

  function ClientMapPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [selectedCompany, setSelectedCompany] = useState(null);
  
    // Filtrar empresas basándose en el término de búsqueda
    const filteredCompanies = companies.filter(company =>
      company.name.toLowerCase().includes(search.toLowerCase())
    );
  
    // Actualizar la empresa seleccionada en base a la búsqueda
    const handleSearch = (e) => {
      setSearch(e.target.value);
      if (filteredCompanies.length === 1) {
        setSelectedCompany(filteredCompanies[0]);
      } else {
        setSelectedCompany(null);
      }
    };
  
    const handleNavigateToHome = () => {
      navigate('/');
    };
  
    return (
      <div className="client-map-container">
        {/* Barra de Navegación */}
        <header className="navbar">
          <button className="menu-button">Mapa de ubicaciones ▼</button>
          <input
            className="search-bar"
            type="text"
            placeholder="Buscar Empresa"
            value={search}
            onChange={handleSearch}
          />
          <button className="filter-button">☰ Filters</button>
          <button className="logout-button" onClick={handleNavigateToHome}>Salir</button>
        </header>
  
        <div className="content">
          {/* Mapa de OpenStreetMap con Leaflet */}
          <div className="map-section">
            <MapContainer center={center} zoom={12} style={{ height: '400px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredCompanies.map((company) => (
                <Marker key={company.id} position={company.coordinates}>
                  <Popup>
                    <strong>{company.name}</strong> <br />
                    {company.address} <br />
                    Tel: {company.phone}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
  
          {/* Tarjeta de Detalles */}
          <div className="details-section">
            {selectedCompany ? (
              <>
                <button className="clone-button">Clone Test</button>
                <button className="edit-button">Edit Test</button>
                <h3>{selectedCompany.name}</h3>
                <p><strong>Dirección:</strong> {selectedCompany.address}</p>
                <p><strong>Teléfono:</strong> {selectedCompany.phone}</p>
                <p><strong>Correo Electrónico:</strong> {selectedCompany.email}</p>
                <p><strong>Página Web:</strong> {selectedCompany.website}</p>
                <p><strong>Horario de Atención:</strong></p>
                <ul>
                  <li>{selectedCompany.hours.weekday}</li>
                  <li>{selectedCompany.hours.saturday}</li>
                  <li>{selectedCompany.hours.sunday}</li>
                </ul>
                <h4>Descripción</h4>
                <p>{selectedCompany.description}</p>
              </>
            ) : (
              <p>Ingresa el nombre de la empresa para ver los detalles.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default ClientMapPage;