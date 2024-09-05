import { Routes } from '@angular/router';
import { DashboardComponent, MedicoesComponent, PedidosComponent } from './app/compras';


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
