import { Component } from '@angular/core';
import { SearchTicketsService } from '../../services/search-tickets.service';
import { horariosTickets } from '../../../Data/data';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss',
})
export class ListagemComponent {
  schedulesData: any = {};
  filteredSchedules: any[] = [];

  constructor(private searchTickets: SearchTicketsService) {}

  ngOnInit() {
    this.schedulesData = this.searchTickets.getSearchData();

    if (!this.schedulesData) {
      // Redireciona para a página de busca se os dados não estiverem definidos
      alert('Nenhuma pesquisa realizada. Retornando à busca.');
      window.location.href = '/';
      return;
    }

    this.loadSchedules();
  }

  loadSchedules() {
    const { origin, destination } = this.schedulesData;

    // Filtra os horários simulados com base na origem e destino
    const match = horariosTickets.find(
      (item) =>
        item.origin.toLowerCase() === origin.toLowerCase() &&
        item.destination.toLowerCase() === destination.toLowerCase()
    );

    this.filteredSchedules = match ? match.schedules : [];
  }
}
