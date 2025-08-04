import { useState, useEffect } from 'react';
import { carService } from '@/services/carService';
import { Car, CreateCarData, UpdateCarData } from '@/types/car';
import { useToast } from '@/hooks/use-toast';

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Carregar todos os carros
  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await carService.getAllCars();

      console.log('Carros carregados:', data);
      setCars(data);
    } catch (err) {
      const errorMessage = 'Erro ao carregar carros';
      setError(errorMessage);
      toast({
        title: 'Erro',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Adicionar novo carro
  const addCar = async (carData: CreateCarData) => {
    setLoading(true);
    try {
      const newCar = await carService.createCar(carData);
      setCars(prev => [...prev, newCar]);
      toast({
        title: 'Sucesso!',
        description: 'Carro adicionado com sucesso.',
      });
      return newCar;
    } catch (err) {
      const errorMessage = 'Erro ao adicionar carro';
      setError(errorMessage);
      toast({
        title: 'Erro',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar carro
  const updateCar = async (carData: UpdateCarData) => {
    setLoading(true);
    try {
      const updatedCar = await carService.updateCar(carData);
      if (updatedCar) {
        setCars(prev => prev.map(car => 
          car.id === carData.id ? updatedCar : car
        ));
        toast({
          title: 'Sucesso!',
          description: 'Carro atualizado com sucesso.',
        });
        return updatedCar;
      }
    } catch (err) {
      const errorMessage = 'Erro ao atualizar carro';
      setError(errorMessage);
      toast({
        title: 'Erro',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Deletar carro
  const deleteCar = async (id: string) => {
    setLoading(true);
    try {
      const success = await carService.deleteCar(id);
      if (success) {
        setCars(prev => prev.filter(car => car.id !== id));
        toast({
          title: 'Sucesso!',
          description: 'Carro removido com sucesso.',
        });
      }
      return success;
    } catch (err) {
      const errorMessage = 'Erro ao remover carro';
      setError(errorMessage);
      toast({
        title: 'Erro',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Buscar carro por ID
  const getCarById = (id: string): Car | undefined => {
    return cars.find(car => car.id === id);
  };

  // Filtrar carros por categoria
  const getCarsByCategory = (category: string): Car[] => {
    return cars.filter(car => car.category === category);
  };

  // Filtrar carros disponíveis
  const getAvailableCars = (): Car[] => {
    return cars.filter(car => car.available);
  };

  // Carregar carros na inicialização
  useEffect(() => {
    fetchCars();
  }, []);

  return {
    cars,
    loading,
    error,
    fetchCars,
    addCar,
    updateCar,
    deleteCar,
    getCarById,
    getCarsByCategory,
    getAvailableCars,
  };
};