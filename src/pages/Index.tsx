import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car as CarIcon, Search, Filter, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCars } from "@/hooks/useCars";

// Import car images
import carBmw from "@/assets/car-bmw.jpg";
import carMercedes from "@/assets/car-mercedes.jpg";
import carAudi from "@/assets/car-audi.jpg";
import carTesla from "@/assets/car-tesla.jpg";
import type { Car } from "@/types/car";

const defaultCars: Car[] = [
  {
    id: "1",
    name: "BMW Série 3",
    image: carBmw,
    price: 280,
    category: "Luxury",
    transmission: "Automático",
    fuel: "Gasolina",
    seats: 5,
    available: true
  },
  {
    id: "2", 
    name: "Mercedes-Benz C180",
    image: carMercedes,
    price: 320,
    category: "Luxury",
    transmission: "Automático",
    fuel: "Gasolina",
    seats: 5,
    available: true
  },
  {
    id: "3",
    name: "Audi A4 Sportback",
    image: carAudi,
    price: 350,
    category: "Sports",
    transmission: "Automático", 
    fuel: "Gasolina",
    seats: 5,
    available: false
  },
  {
    id: "4",
    name: "Tesla Model S",
    image: carTesla,
    price: 450,
    category: "Electric",
    transmission: "Automático",
    fuel: "Elétrico",
    seats: 5,
    available: true
  }
];

const Index = () => {
  const { cars, loading } = useCars();

  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // Inicializar com dados padrão se não houver carros
  useEffect(() => {
    if (cars.length === 0 && !loading) {
      // Se não há carros carregados da API, usar dados padrão do localStorage
      const savedCars = localStorage.getItem("rental-cars");
      if (!savedCars) {
        // Salvar carros padrão no localStorage se não existirem
        localStorage.setItem("rental-cars", JSON.stringify(defaultCars));
      }
    }
  }, [cars, loading]);

  // Filtrar carros com base nos critérios
  useEffect(() => {
    let filtered = cars.length > 0 ? cars : defaultCars;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(car => car.category === categoryFilter);
    }

    // Availability filter
    if (availabilityFilter !== "all") {
      filtered = filtered.filter(car => 
        availabilityFilter === "available" ? car.available : !car.available
      );
    }

    setFilteredCars(filtered);
  }, [cars, searchTerm, categoryFilter, availabilityFilter]);

  const allCars = cars.length > 0 ? cars : defaultCars;

  const categories = [...new Set(allCars.map(car => car.category))];
  const availableCars = allCars.filter(car => car.available).length;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Alugue o Carro dos Seus Sonhos
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubra nossa frota premium de veículos de luxo e carros esportivos. 
            Qualidade, conforto e segurança em cada viagem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="xl" variant="premium" className="min-w-48">
              <CarIcon className="w-5 h-5 mr-2" />
              Ver Carros Disponíveis
            </Button>
            <Button size="xl" variant="hero" className="min-w-48">
              <Phone className="w-5 h-5 mr-2" />
              Falar com Especialista
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CarIcon className="w-4 h-4 text-primary" />
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Carregando carros...</span>
                </div>
              ) : (
                <span>{allCars.length} carros no estoque</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {availableCars} disponíveis
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 border-y border-border/20 bg-background/5 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Filter className="w-4 h-4 text-primary" />
              <span>Filtros:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-4xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 backdrop-blur-sm"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="Disponibilidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="available">Disponíveis</SelectItem>
                  <SelectItem value="unavailable">Indisponíveis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-lg text-muted-foreground">Carregando carros...</p>
            </div>
          </div>
        ) : allCars.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                Carros Disponíveis
              </h2>
              <Badge variant="outline" className="px-4 py-2 text-base">
                {filteredCars.length} {filteredCars.length === 1 ? "resultado" : "resultados"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCars.map((car) => (
                <CarCard key={car.id} {...car} />
              ))}
            </div>
          </>
        ) : (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center py-16">
            <CardContent>
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-2xl mb-2">Nenhum carro encontrado</CardTitle>
              <CardDescription className="text-lg mb-6">
                Tente ajustar os filtros ou buscar por outros termos
              </CardDescription>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setAvailabilityFilter("all");
                }}
              >
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Call to Action for Admin */}
      {allCars.length <= 4 && (
        <section className="py-16 px-4 bg-gradient-secondary">
          <div className="container mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Gerencie Seu Estoque</h3>
            <p className="text-muted-foreground mb-6">
              Acesse o painel administrativo para adicionar novos carros ao estoque
            </p>
            <Link to="/admin">
              <Button variant="premium" size="lg">
                Ir para Administração
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border/20 bg-background/80 backdrop-blur-sm py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CarIcon className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">DigitalRent</span>
              </div>
              <p className="text-muted-foreground">
                A melhor plataforma de aluguel de carros premium do Brasil.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(11) 9999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@digitalrent.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>São Paulo, SP</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-muted-foreground hover:text-primary transition-smooth">
                  Carros Disponíveis
                </Link>
                <Link to="/admin" className="block text-muted-foreground hover:text-primary transition-smooth">
                  Administração
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/20 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 DigitalRent. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
