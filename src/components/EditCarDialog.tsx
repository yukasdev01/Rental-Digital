import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    seats: car.seats?.toString(),
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
              <select
                id="edit-category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              <Label htmlFor="edit-transmission">Transmissão</Label>
              <select
                id="edit-transmission"
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
              <Label htmlFor="edit-fuel">Combustível</Label>
              <select
                id="edit-fuel"
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
              <Label htmlFor="edit-seats">Número de Assentos</Label>
              <select
                id="edit-seats"
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