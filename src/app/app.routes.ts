import { Routes } from '@angular/router';
import { PedidosComponent } from './compras/pedidos/pedidos.component';
import { DashboardComponent } from './compras/dashboard/dashboard.component';
import { MedicoesComponent } from './medicoes'

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        title: 'Dashboard',
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        title: 'Medições',
        path: 'medicoes/listar',
        component: MedicoesComponent
    },
    {
        title: 'Pedidos',
        path: 'pedidos/listar',
        component: PedidosComponent
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }

];
