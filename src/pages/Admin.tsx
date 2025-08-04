import { Header } from "@/components/Header";
import { AddCarForm } from "@/components/AddCarForm";
import { CarCard } from "@/components/CarCard";
import { EditCarDialog } from "@/components/EditCarDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Car as CarIcon, DollarSign, Users, Loader2, Trash2 } from "lucide-react";
import { useCars } from "@/hooks/useCars";
import { Car } from "@/types/car";

const Admin = () => {
  const { cars, loading, deleteCar } = useCars();

  const handleDeleteCar = async (id: string) => {
    if (confirm('Tem certeza que deseja remover este carro?')) {
      await deleteCar(id);
    }
  };

  const stats = {
    totalCars: cars.length,
    availableCars: cars.filter(car => car.available).length,
    totalRevenue: cars.reduce((acc, car) => acc + car.price, 0),
    averagePrice: cars.length > 0 ? Math.round(cars.reduce((acc, car) => acc + car.price, 0) / cars.length) : 0
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-muted-foreground text-lg">
            Gerencie o estoque de carros e visualize estatísticas
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Carros</CardTitle>
              <CarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCars}</div>
              <p className="text-xs text-muted-foreground">
                carros no estoque
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.availableCars}</div>
              <p className="text-xs text-muted-foreground">
                prontos para aluguel
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Preço Médio</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.averagePrice}</div>
              <p className="text-xs text-muted-foreground">
                por dia
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Potencial</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.totalRevenue}</div>
              <p className="text-xs text-muted-foreground">
                por dia (total)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add Car Form */}
        <div className="mb-8">
          <AddCarForm />
        </div>

        {/* Cars Inventory */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-lg text-muted-foreground">Carregando carros...</p>
            </div>
          </div>
        ) : cars.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Estoque de Carros</h2>
              <Badge variant="outline" className="px-3 py-1">
                {cars.length} {cars.length === 1 ? "carro" : "carros"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cars.map((car) => (
                <div key={car.id} className="relative group">
                  <CarCard {...car} />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <EditCarDialog car={car} />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8"
                      onClick={() => handleDeleteCar(car.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        
        {!loading && cars.length === 0 && (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center py-12">
            <CardContent>
              <CarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-xl mb-2">Nenhum carro no estoque</CardTitle>
              <CardDescription>
                Adicione o primeiro carro ao estoque usando o formulário acima
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Admin;