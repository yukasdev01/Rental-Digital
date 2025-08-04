import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload } from "lucide-react";

interface AddCarFormProps {
  onAddCar: (car: any) => void;
}

export const AddCarForm = ({ onAddCar }: AddCarFormProps) => {
  const { toast } = useToast();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newCar = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      transmission: formData.transmission,
      fuel: formData.fuel,
      seats: parseInt(formData.seats),
      image: formData.image || "/placeholder.svg",
      available: formData.available
    };

    onAddCar(newCar);
    
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

    toast({
      title: "Sucesso!",
      description: "Carro adicionado com sucesso ao estoque.",
    });
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
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="Hatchback">Hatchback</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transmission">Transmissão</Label>
              <Select value={formData.transmission} onValueChange={(value) => handleInputChange("transmission", value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Tipo de transmissão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Automático">Automático</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fuel">Combustível</Label>
              <Select value={formData.fuel} onValueChange={(value) => handleInputChange("fuel", value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Tipo de combustível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gasolina">Gasolina</SelectItem>
                  <SelectItem value="Etanol">Etanol</SelectItem>
                  <SelectItem value="Flex">Flex</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Elétrico">Elétrico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seats">Número de Assentos</Label>
              <Select value={formData.seats} onValueChange={(value) => handleInputChange("seats", value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Quantidade de assentos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 assentos</SelectItem>
                  <SelectItem value="4">4 assentos</SelectItem>
                  <SelectItem value="5">5 assentos</SelectItem>
                  <SelectItem value="7">7 assentos</SelectItem>
                  <SelectItem value="8">8 assentos</SelectItem>
                </SelectContent>
              </Select>
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

          <Button type="submit" className="w-full" variant="premium" size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Carro ao Estoque
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};