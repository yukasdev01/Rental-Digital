import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload, Loader2 } from "lucide-react";
import { useCars } from "@/hooks/useCars";
import { CreateCarData } from "@/types/car";

interface AddCarFormProps {
  onAddCar?: (car: any) => void; // Opcional agora
}

export const AddCarForm = ({ onAddCar }: AddCarFormProps) => {
  const { toast } = useToast();
  const { addCar, loading } = useCars();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    transmission: "",
    fuel: "",
    seats: "",
    image: "",
    available: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      const carData: CreateCarData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        transmission: formData.transmission,
        fuel: formData.fuel,
        seats: parseInt(formData.seats),
        image: formData.image || "/placeholder.svg",
        available: formData.available
      };

      const newCar = await addCar(carData);
      
      // Callback opcional para compatibilidade
      if (onAddCar) {
        onAddCar(newCar);
      }
      
      // Reset form
      setFormData({
        name: "",
        price: "",
        category: "",
        transmission: "",
        fuel: "",
        seats: "",
        image: "",
        available: true
      });
    } catch (error) {
      // Erro já tratado no hook
      console.error('Erro ao adicionar carro:', error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          Adicionar Novo Carro
        </CardTitle>
        <CardDescription>
          Preencha as informações para adicionar um novo carro ao estoque
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Carro *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="BMW X5, Mercedes C180..."
                className="bg-background/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Preço por dia (R$) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="150.00"
                className="bg-background/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Selecione a categoria</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transmission">Transmissão</Label>
              <select
                id="transmission"
                value={formData.transmission}
                onChange={(e) => handleInputChange("transmission", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Tipo de transmissão</option>
                <option value="Automático">Automático</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fuel">Combustível</Label>
              <select
                id="fuel"
                value={formData.fuel}
                onChange={(e) => handleInputChange("fuel", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Tipo de combustível</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Etanol">Etanol</option>
                <option value="Flex">Flex</option>
                <option value="Diesel">Diesel</option>
                <option value="Elétrico">Elétrico</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seats">Número de Assentos</Label>
              <select
                id="seats"
                value={formData.seats}
                onChange={(e) => handleInputChange("seats", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Quantidade de assentos</option>
                <option value="2">2 assentos</option>
                <option value="4">4 assentos</option>
                <option value="5">5 assentos</option>
                <option value="7">7 assentos</option>
                <option value="8">8 assentos</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL da Imagem</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="https://exemplo.com/imagem-do-carro.jpg"
                className="bg-background/50"
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="available"
              checked={formData.available}
              onCheckedChange={(checked) => handleInputChange("available", checked)}
            />
            <Label htmlFor="available">Disponível para aluguel</Label>
          </div>

          <Button type="submit" className="w-full" variant="premium" size="lg" disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            {loading ? "Adicionando..." : "Adicionar Carro ao Estoque"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};