import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerIcon from "../../assets/marker.png";
import Form from "../Form";
import { TableFormData } from "@/types";

interface MarkerData {
  positions: { lat: number; lng: number };
}

interface MapProps {
  setFormData: Dispatch<SetStateAction<TableFormData[]>>;
  mode: "add" | "edit" | "view" | "";
  formData: TableFormData[]; // Assuming any[] for now
  editMarkerData?: TableFormData; // Optional editMarkerData
  searchPositions: { lat: number; lng: number } | null;
}

let center = {
  lat: 8.757509273522448,
  lng: 76.74224853515626,
};

const Map: React.FC<MapProps> = ({
  setFormData,
  mode,
  formData,
  editMarkerData,
  searchPositions,
}) => {
  const [positions, setPositions] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isInitialCall, setIsInitialCall] = useState(false);

  useEffect(() => {
    if (mode === "edit" && editMarkerData?.positions) {
      setPositions(editMarkerData.positions);
      setIsInitialCall(true);
    }
  }, [editMarkerData, mode]);

  useEffect(() => {
    if(searchPositions !== null ){
        setPositions(searchPositions);
    }
  }, [searchPositions]);

  const customIcon = new Icon({
    iconUrl: MarkerIcon.src,
    iconSize: [38, 38],
  });

  function MapClick() {
    const map = useMapEvent("click", (e) => {
      // Provide both 'click' and handler
      setPositions(e.latlng);
      map.flyTo(e.latlng);
    });

    if (mode === "edit" && isInitialCall) {
      map.flyTo(editMarkerData!.positions); // Use non-null assertion here
      setIsInitialCall(false);
    }

    if(searchPositions !== null){
        map.flyTo(searchPositions)
    }

    return positions === null ? null : (
      <Marker position={positions} icon={customIcon}>
        <Popup>
          <Form
            setFormData={setFormData}
            positions={positions}
            mark={editMarkerData}
            mode={mode}
            formData={formData}
          />
        </Popup>
      </Marker>
    );
  }

  return (
    <div className="w-full h-full">
      <MapContainer center={center} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {(mode === "add" || mode === "edit") && <MapClick />}
        {searchPositions !== null && <MapClick />}
        {mode === "view" && (
          <>
            {formData.map((mark, i) => (
              <Marker key={i} position={mark.positions} icon={customIcon}>
                <Popup>
                  <Form
                    formData={formData}
                    setFormData={setFormData}
                    mark={mark}
                    mode={mode}
                  />
                </Popup>
              </Marker>
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
