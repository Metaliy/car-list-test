import { useState, useEffect } from 'react';
import { fetchCarsList, selectcarsList } from 'entities/car/carsList';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { ICarSpecifications } from 'shared/api/car';
import './carsList.scss';
import { CarCard } from 'entities/car/carCard';

export const CarsList = () => {
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState<string>('price');
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
  const cars = useAppSelector(selectcarsList);

  useEffect(() => {
    dispatch(fetchCarsList());
  }, [dispatch]);

  const handleSort = (field: string) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortBy(field);
      setSortDirection('ascending');
    }
  };

  const sortedCars = [...cars].sort((a, b) => {
    const sortOrder = sortDirection === 'ascending' ? 1 : -1;
    if (sortBy === 'price') {
      return sortOrder * (a.price - b.price);
    } else if (sortBy === 'year') {
      return sortOrder * (a.year - b.year);
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div className="sort-buttons">
        <span className='sort-text'>Sort type:</span>
        <button
          className={sortBy === 'price' ? (sortDirection === 'ascending' ? 'active' : 'active desc') : ''}
          onClick={() => handleSort('price')}
        >
          Price {sortBy === 'price' && (sortDirection === 'ascending' ? '↑' : '↓')}
        </button>
        <button
          className={sortBy === 'year' ? (sortDirection === 'ascending' ? 'active' : 'active desc') : ''}
          onClick={() => handleSort('year')}
        >
          Year {sortBy === 'year' && (sortDirection === 'ascending' ? '↑' : '↓')}
        </button>
      </div>
      <div className="cars-list">
        {sortedCars.map((car: ICarSpecifications) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarsList;
