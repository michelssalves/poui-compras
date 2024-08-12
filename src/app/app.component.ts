import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { SidebarService } from './_services/sideBar/sidebar.service';
import {
  PoContainerModule, 
  PoWidgetModule, 
  PoModalModule, 
  PoDynamicModule,
  PoTableModule, 
  PoPageAction,  
  PoBreadcrumb,
  PoComboComponent,
  PoFieldModule,
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
 
} from '@po-ui/ng-components';
import { FiltersComponent } from './_partials/filters/filters.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    PoFieldModule,
    FormsModule,
    ReactiveFormsModule,
    
  
  ],
  providers: [SidebarService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  menuItemSelected: string = '';

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Dashboard' }]
   };

   public readonly actions: Array<PoPageAction> = [
    
  ];

  menus: Array<PoMenuItem> = [
 
    { label: 'Dashboard',  action: this.printMenuAction.bind(this), icon: 'po-icon po-icon-chart-columns', link: 'dashboard' , shortLabel: 'dashboard'},
    {
      label: 'Cotações',
      icon: 'po-icon po-icon-handshake',
      shortLabel: 'Cotações',
      subItems: [
        { label: 'Criar', link: 'cotacoes/criar' },
        { label: 'Listar', link: 'cotacoes/listar' }
      ]
    },
    {
      label: 'Pedidos',
      icon: 'po-icon po-icon-finance-secure',
      shortLabel: 'Pedidos',
      subItems: [
        { label: 'Listar', link: 'pedidos/listar' },
        { label: 'FollowUp', link: 'pedidos/followup' }
      ]
    },
   
  ];

  constructor(public SidebarService: SidebarService) {}
  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }
}
