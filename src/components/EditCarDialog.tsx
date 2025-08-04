import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Edit, Loader2, Save } from "lucide-react";
import { useCars } from "@/hooks/useCars";
import { Car, UpdateCarData } from "@/types/car";

interface EditCarDialogProps {
  car: Car;
}

export const EditCarDialog = ({ car }: EditCarDialogProps) => {
  const { updateCar, loading } = useCars();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: car.name,
    price: car.price.toString(),
    category: car.category,
    transmission: car.transmission,
    fuel: car.fuel,
    seats: car.seats.toString(),
    image: car.image,
    available: car.available
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const updateData: UpdateCarData = {
        id: car.id,
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        transmission: formData.transmission,
        fuel: formData.fuel,
        seats: parseInt(formData.seats),
        image: formData.image,
        available: formData.available
      };

      await updateCar(updateData);
      setOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar carro:', error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Carro</DialogTitle>
          <DialogDescription>
            Modifique as informações do carro {car.name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome do Carro</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="BMW X5, Mercedes C180..."
                className="bg-background/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-price">Preço por dia (R$)</Label>
              <Input
                id="edit-price"
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
              <Label htmlFor="edit-category">Categoria</Label>
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
              <Label htmlFor="edit-transmission">Transmissão</Label>
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
              <Label htmlFor="edit-fuel">Combustível</Label>
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
              <Label htmlFor="edit-seats">Número de Assentos</Label>
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
            <Label htmlFor="edit-image">URL da Imagem</Label>
            <Input
              id="edit-image"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="https://exemplo.com/imagem-do-carro.jpg"
              className="bg-background/50"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="edit-available"
              checked={formData.available}
              onCheckedChange={(checked) => handleInputChange("available", checked)}
            />
            <Label htmlFor="edit-available">Disponível para aluguel</Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" variant="premium" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};