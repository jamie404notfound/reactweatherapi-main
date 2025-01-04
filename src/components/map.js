import React from "react";
import "../App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sites: [] };
  }

  componentDidMount() {
    fetch("http://localhost:3005/sites")
      .then((data) => data.json())
      .then((data) => this.setState({ sites: data }));
  }

  render() {
    return (
      <MapContainer
        center={[53.49592253769749, -8.204975925034635]}
        zoom={7}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div>
          {this.state.sites.map((item, t) => {
            return (
              <Marker key={t} position={[item.lat, item.lng]}>
                <Popup>
                  <b>
                    <u key={t}>{item.site_name}</u>
                  </b>{" "}
                  <br /> [{item.lat}, {item.lng}]
                </Popup>
              </Marker>
            );
          })}
        </div>
      </MapContainer>
    );
  }
}
export default Map;
