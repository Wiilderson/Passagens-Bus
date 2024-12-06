import { Routes } from '@angular/router';
import { ListagemComponent } from './components/listagem/listagem.component';
import { AppComponent } from './app.component';
import { PesquisaComponent } from './components/pesquisa/pesquisa.component';
import { AssentosComponent } from './components/assentos/assentos.component';

export const routes: Routes = [
  {
    path: 'lista-passagens',
    component: ListagemComponent,
  },
  {
    path: '',
    component: PesquisaComponent,
  },
  {
    path: 'assentos-disponiveis/:id',
    component: AssentosComponent,
  },
];
