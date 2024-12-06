import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../services/api.service';
import { ScheduleResult } from '../../DTO/passagem.dto';
import { SearchTicketsService } from '../../services/search-tickets.service';

@Component({
  selector: 'app-assentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assentos.component.html',
  styleUrl: './assentos.component.scss',
})
export class AssentosComponent {
  seats: any[] = []; // Dados dos assentos
  scheduleId!: string; // ID da passagem selecionada
  schedulesResults: ScheduleResult[] = [];
  selectedSchedule: any;

  constructor(
    private route: ActivatedRoute,
    private serviceAPI: APIService,
    private searchTickets: SearchTicketsService
  ) {}

  ngOnInit(): void {
    // Obter o ID da passagem da URL
    this.scheduleId = this.route.snapshot.paramMap.get('id')!;
    this.schedulesResults = this.searchTickets.getSearchDataResults();
    this.selectedSchedule =
      this.schedulesResults.find(
        (schedule) => schedule.id === this.scheduleId
      ) || {}; // Se não encontrar, retorna um objeto vazio

    // Exemplo de como passar o array filtrado para outra variável
    console.log(this.selectedSchedule); // Exibe no console o novo array com o item encontrado
    this.loadSeats();
  }

  selectSeat(seat: any): void {
    if (seat.occupied) {
      alert('Este assento está ocupado.');
      return;
    }
    alert(`Você selecionou o assento ${seat.seat}`);
  }

  loadSeats(): void {
    const requestBody = {
      travelId: this.scheduleId,
    };
    this.serviceAPI.searchSeats(requestBody).subscribe({
      next: (data: any[]) => {
        this.seats = data;
      },
      error: (err) => {
        console.error('Erro ao pesquisar assentos:', err);
        alert('Erro ao realizar a pesquisa. Tente novamente mais tarde.');
      },
    });
  }
}
