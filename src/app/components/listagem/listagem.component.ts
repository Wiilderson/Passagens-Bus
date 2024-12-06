import { Component } from '@angular/core';
import { SearchTicketsService } from '../../services/search-tickets.service';
import { horariosTickets } from '../../../Data/data';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScheduleResult } from '../../DTO/passagem.dto';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss',
})
export class ListagemComponent {
  schedulesData: any = {};
  filteredSchedules: any[] = [];
  schedulesResults: ScheduleResult[] = [];

  constructor(private searchTickets: SearchTicketsService) {}

  ngOnInit() {
    this.schedulesData = this.searchTickets.getSearchData();
    this.schedulesResults = this.searchTickets.getSearchDataResults();

    console.log('Resultados da pesquisa:', this.schedulesData);
    console.log('Resultados da pesquisa:', this.schedulesResults);
    if (!this.schedulesData) {
      // Redireciona para a página de busca se os dados não estiverem definidos
      alert('Nenhuma pesquisa realizada. Retornando à busca.');
      window.location.href = '/';
      return;
    }
  }
}
