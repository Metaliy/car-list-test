import React, { useState } from 'react';
import { ICarSpecifications } from 'shared/api/car';
import './carEditModal.scss';

interface EditCarProps {
  car: ICarSpecifications;
  onSave: (updatedCar: ICarSpecifications) => void;
  onCancel: () => void;
}

export const CarEditModal: React.FC<EditCarProps> = ({ car, onSave, onCancel }) => {
  const [editedCar, setEditedCar] = useState<ICarSpecifications>({ ...car });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedCar);
  };

  return (
    <div className="edit-car-overlay">
      <div className="edit-car-modal">
        <h2>Edit Car</h2>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={editedCar.name} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Model:
            <input type="text" name="model" value={editedCar.model} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Year:
            <input type="number" name="year" value={editedCar.year} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Color:
            <input type="text" name="color" value={editedCar.color} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input type="number" name="price" value={editedCar.price} onChange={handleInputChange} />
          </label>
        </div>
        <div className="edit-car-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
