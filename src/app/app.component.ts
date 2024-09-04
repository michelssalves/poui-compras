import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { SidebarService } from './_services/sideBar/sidebar.service';
import { filter } from 'rxjs/operators';
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

  // public readonly breadcrumb: PoBreadcrumb = {
  //   items: [{ label: 'Home', link: '/' }, { label: 'Dashboard' }]
  //  };

   public readonly actions: Array<PoPageAction> = [
    
  ];
  menuItemSelected: string = '';
  menus: Array<PoMenuItem> = [
 
    { label: 'Dashboard',  action: this.printMenuAction.bind(this), icon: 'po-icon po-icon-chart-columns', link: 'dashboard' , shortLabel: 'dashboard'},
    {
      label: 'Cotações',
      icon: 'po-icon po-icon-handshake',
      shortLabel: 'Cotações',
      subItems: [

      ]
    },
    {
      label: 'Pedidos',
      icon: 'po-icon po-icon-finance-secure',
      shortLabel: 'Pedidos',
      subItems: [
        { label: 'Listar', link: 'pedidos/listar' },
      ]
    },
    {
      label: 'Contratos',
      icon: 'po-icon po-icon-document-filled',
      shortLabel: 'Contratos',
      subItems: [
        { label: 'Listar', link: 'medicoes/listar' }
   
      ]
    },
   
  ];

  constructor(public SidebarService: SidebarService, private router: Router, private route: ActivatedRoute) {}
  printMenuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
  }

  public breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/home' }]
  };


  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });
  }

  updateBreadcrumb(): void {
    const currentRoute = this.route.root.firstChild?.snapshot;
    if (currentRoute) {
      const breadcrumbLabel = currentRoute.title || 'Home';
      const breadcrumbLink = this.router.url;
      console.log(breadcrumbLink)

      this.breadcrumb.items = [
        { label: 'Compras', link: '/home' },
        { label: breadcrumbLabel, link: breadcrumbLink }
      ];
    }
  }



}
