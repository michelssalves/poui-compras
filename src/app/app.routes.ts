import { Routes } from '@angular/router';
import { PedidosComponent } from './compras/pedidos/pedidos.component';
import { DashboardComponent } from './compras/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'pedidos/listar',
        component: PedidosComponent
    },
    {
        path: 'pedidos/followup',
        component: PedidosComponent
    },
    {
        path: 'cotacoes/criar',
        component: PedidosComponent
    },
    {
        path: 'cotacoes/listar',
        component: PedidosComponent
    }

];
