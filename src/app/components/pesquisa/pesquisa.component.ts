import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { City, Substop } from '../../DTO/passagem.dto';
import { SearchTicketsService } from '../../services/search-tickets.service';
import { APIService } from '../../services/api.service';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.scss',
})
export class PesquisaComponent {
  searchData = {
    origin: '',
    destination: '',
    travelDate: '',
    originId: '',
    destinationId: '',
  };

  allCities: City[] = [];
  filteredOriginCities: Substop[] = [];
  filteredDestinationCities: Substop[] = [];

  constructor(
    private searchServiceTickets: SearchTicketsService,
    private serviceAPI: APIService,
    private router: Router
  ) {
    // Constrói a lista completa de cidades com estados
    this.loadCities();
  }

  loadCities() {
    this.serviceAPI.getCities().subscribe({
      next: (data: City[]) => {
        this.allCities = data;
      },
      error: (err) => {
        console.error('Erro ao carregar cidades:', err);
        alert('Erro ao carregar as cidades. Tente novamente mais tarde.');
      },
    });
  }

  filterCities(input: string, type: 'origin' | 'destination') {
    const filterText = input.toLowerCase();

    if (!filterText) {
      // Se o campo estiver vazio, limpa a lista filtrada
      if (type === 'origin') {
        this.filteredOriginCities = [];
      } else {
        this.filteredDestinationCities = [];
      }
      return;
    }

    const filtered = this.allCities.flatMap((city) => {
      // Verifique se substops existe e se é um array
      if (city.substops && Array.isArray(city.substops)) {
        const substops = city.substops.filter((substop) =>
          substop.name.toLowerCase().includes(filterText)
        );
        return substops.map((substop) => ({
          id: substop.id,
          name: substop.name,
          parentCity: city.name,
        }));
      }
      return []; // Retorna um array vazio caso substops não exista
    });

    if (type === 'origin') {
      this.filteredOriginCities = filtered;
    } else {
      this.filteredDestinationCities = filtered;
    }
  }

  selectCity(
    selectedCity: { id: string; name: string },
    type: 'origin' | 'destination'
  ) {
    if (type === 'origin') {
      this.searchData.origin = selectedCity.name; // Exibir nome no input
      this.searchData.originId = selectedCity.id; // Guardar o ID
      this.filteredOriginCities = [];
    } else {
      this.searchData.destination = selectedCity.name; // Exibir nome no input
      this.searchData.destinationId = selectedCity.id; // Guardar o ID
      this.filteredDestinationCities = [];
    }
  }

  searchTickets() {
    console.log('Dados da Pesquisa:', this.searchData);
    const { origin, destination, travelDate, originId, destinationId } =
      this.searchData;

    if (!origin || !destination || !travelDate) {
      alert('Preencha todos os campos para continuar!');
      return;
    }

    const requestBody = {
      from: originId,
      to: destinationId,
      travelDate,
      affiliateCode: 'DDE',
      'include-connections': false, // Corrigido aqui
    };

    this.serviceAPI.searchTickets(requestBody).subscribe({
      next: (response) => {
        console.log('Resultados da pesquisa:', response);
        this.searchServiceTickets.setSearchData(this.searchData);
        this.searchServiceTickets.setSearchDataResults(response); // Armazena os resultados no serviço
        this.router.navigate(['/lista-passagens']); // Navega para o componente de listagem
      },
      error: (err) => {
        console.error('Erro ao pesquisar passagens:', err);
        alert('Erro ao realizar a pesquisa. Tente novamente mais tarde.');
      },
    });
  }
}
