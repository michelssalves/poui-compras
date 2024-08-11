import { Routes } from '@angular/router';
import { PedidosComponent } from './compras/pedidos/pedidos.component';
import { SamplePoContainerDashboardComponent } from './sample-po-container-dashboard/sample-po-container-dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: SamplePoContainerDashboardComponent
    },
    {
        path: 'dashboard',
        component: SamplePoContainerDashboardComponent
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
