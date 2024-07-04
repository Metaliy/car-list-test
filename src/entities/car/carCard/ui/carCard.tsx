import React, { useState } from 'react';
import { useAppDispatch } from 'shared/lib/store';
import { ICarSpecifications } from 'shared/api/car';
import { deleteCar, updateCar } from 'entities/car/carsList/model/carsListSlice';
import DefaultCarImage from 'shared/assets/images/defaultCarImage.svg?react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import './carCard.scss';
import { CarEditModal } from 'entities/car/carEditModal';

interface CustomIcon extends Icon {
  _getIconUrl?: string; 
}


delete (L.Icon.Default.prototype as CustomIcon)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CarCardProps {
  car: ICarSpecifications;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveCar = (updatedCar: ICarSpecifications) => {
    dispatch(updateCar(updatedCar));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    dispatch(deleteCar(car.id));
  };

  return (
    <div className="car-card">
      <div className="car-image">
        <DefaultCarImage className="car-image-svg" />
      </div>
      <div className="car-details">
        <h2 className="car-title">{car.name} {car.model}</h2>
        <p className="car-year">Year: {car.year}</p>
        <p className="car-color">Color: {car.color}</p>
        <p className="car-price">Price: ${car.price}</p>
        <div className="car-actions">
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
      {isEditing && (
        <CarEditModal
          car={car}
          onSave={handleSaveCar}
          onCancel={handleCancelEdit}
        />
      )}
      <div className="car-map">
        <MapContainer center={[car.latitude, car.longitude]} zoom={13} style={{ height: '200px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[car.latitude, car.longitude]}>
            <Popup>
              {car.name} {car.model} <br /> {car.price}$
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
