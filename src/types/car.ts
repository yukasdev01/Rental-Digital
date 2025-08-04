export interface Car {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  transmission: string;
  fuel: string;
  seats: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCarData {
  name: string;
  image: string;
  price: number;
  category: string;
  transmission: string;
  fuel: string;
  seats: number;
  available: boolean;
}

export interface UpdateCarData extends Partial<CreateCarData> {
  id: string;
}