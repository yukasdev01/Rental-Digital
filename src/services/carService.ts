import { apiService } from '@/lib/api';
import { Car, CreateCarData, UpdateCarData } from '@/types/car';

export const carService = {
  // Listar todos os carros
  getAllCars: async (): Promise<Car[]> => {
    try {
      return await apiService.get<Car[]>('/cars');
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
      // Fallback para dados locais em caso de erro
      const savedCars = localStorage.getItem('rental-cars');
      return savedCars ? JSON.parse(savedCars) : [];
    }
  },

  // Buscar carro por ID
  getCarById: async (id: string): Promise<Car | null> => {
    try {
      return await apiService.get<Car>(`/cars/${id}`);
    } catch (error) {
      console.error('Erro ao buscar carro:', error);
      return null;
    }
  },

  // Criar novo carro
  createCar: async (carData: CreateCarData): Promise<Car> => {
    try {
      const newCar = await apiService.post<Car>('/cars', carData);
      
      // Salvar também no localStorage como backup
      const savedCars = localStorage.getItem('rental-cars');
      const cars = savedCars ? JSON.parse(savedCars) : [];
      cars.push(newCar);
      localStorage.setItem('rental-cars', JSON.stringify(cars));
      
      return newCar;
    } catch (error) {
      console.error('Erro ao criar carro:', error);
      
      // Fallback para localStorage em caso de erro
      const newCar: Car = {
        ...carData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const savedCars = localStorage.getItem('rental-cars');
      const cars = savedCars ? JSON.parse(savedCars) : [];
      cars.push(newCar);
      localStorage.setItem('rental-cars', JSON.stringify(cars));
      
      return newCar;
    }
  },

  // Atualizar carro
  updateCar: async (carData: UpdateCarData): Promise<Car | null> => {
    try {
      const updatedCar = await apiService.put<Car>(`/cars/${carData.id}`, carData);
      
      // Atualizar também no localStorage
      const savedCars = localStorage.getItem('rental-cars');
      if (savedCars) {
        const cars = JSON.parse(savedCars);
        const carIndex = cars.findIndex((car: Car) => car.id === carData.id);
        if (carIndex !== -1) {
          cars[carIndex] = { ...cars[carIndex], ...carData, updatedAt: new Date().toISOString() };
          localStorage.setItem('rental-cars', JSON.stringify(cars));
        }
      }
      
      return updatedCar;
    } catch (error) {
      console.error('Erro ao atualizar carro:', error);
      return null;
    }
  },

  // Deletar carro
  deleteCar: async (id: string): Promise<boolean> => {
    try {
      await apiService.delete(`/cars/${id}`);
      
      // Remover também do localStorage
      const savedCars = localStorage.getItem('rental-cars');
      if (savedCars) {
        const cars = JSON.parse(savedCars);
        const filteredCars = cars.filter((car: Car) => car.id !== id);
        localStorage.setItem('rental-cars', JSON.stringify(filteredCars));
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao deletar carro:', error);
      return false;
    }
  },

  // Buscar carros por categoria
  getCarsByCategory: async (category: string): Promise<Car[]> => {
    try {
      return await apiService.get<Car[]>(`/cars?category=${category}`);
    } catch (error) {
      console.error('Erro ao buscar carros por categoria:', error);
      return [];
    }
  },

  // Buscar carros disponíveis
  getAvailableCars: async (): Promise<Car[]> => {
    try {
      return await apiService.get<Car[]>('/cars?available=true');
    } catch (error) {
      console.error('Erro ao buscar carros disponíveis:', error);
      return [];
    }
  },
};