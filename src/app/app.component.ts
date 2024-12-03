import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { estadosECidades } from '../Data/data';
import { CommonModule } from '@angular/common';
import { SearchTicketsService } from './services/search-tickets.service';
import { APIService } from './services/api.service';
import { City } from './DTO/passagem.dto';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'passagens';
  searchData = {
    origin: '',
    destination: '',
    travelDate: '',
  };

  allCities: City[] = [];
  filteredOriginCities: City[] = [];
  filteredDestinationCities: City[] = [];

  constructor(
    private searchServiceTickets: SearchTicketsService,
    private serviceAPI: APIService
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

    if (type === 'origin') {
      this.filteredOriginCities = this.allCities.filter((item) =>
        item.name.toLowerCase().includes(filterText)
      );
    } else {
      this.filteredDestinationCities = this.allCities.filter((item) =>
        item.name.toLowerCase().includes(filterText)
      );
    }
  }

  selectCity(city: string, type: 'origin' | 'destination') {
    if (type === 'origin') {
      this.searchData.origin = city;
      this.filteredOriginCities = [];
    } else {
      this.searchData.destination = city;
      this.filteredDestinationCities = [];
    }
  }

  searchTickets() {
    console.log('Dados da Pesquisa:', this.searchData);
    const { origin, destination, travelDate } = this.searchData;

    if (!origin || !destination || !travelDate) {
      alert('Preencha todos os campos para continuar!');
      return;
    }

    this.searchServiceTickets.setSearchData(this.searchData); // Armazena os dados no serviço
    // this.router.navigate(['/schedules']);

    // Lógica de envio dos dados ao backend
  }
}
