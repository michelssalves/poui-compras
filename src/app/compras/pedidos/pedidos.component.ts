import { 
  PoContainerModule, 
  PoWidgetModule, 
  PoPageModule, 
  PoModalModule, 
  PoFieldModule, 
  PoDynamicModule,
  PoTableModule, 
  PoModalAction, 
  PoNotificationService, 
  PoModalComponent, 
  PoPageAction,
  PoTableColumn, 
  PoBreadcrumb

} from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { AfterContentChecked, Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { PedidosService } from '../../_services/compras/pedidos/pedidos.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    PoTableModule, 
    CommonModule,
    PoContainerModule, 
    PoPageModule,
    PoWidgetModule,
    PoPageModule,
    PoModalModule,
    PoFieldModule,
    PoDynamicModule,
    PoTableModule,
  
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent  {

 pedidos: any = [];

 public readonly breadcrumb: PoBreadcrumb = {
  items: [{ label: 'Pedidos', link: '/' }, { label: 'Listar' }]
 };

 constructor(private dataService: PedidosService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(
      response => {
        this.pedidos = response.objects; // Supondo que a resposta seja { objects: [...] }
        console.log(this.pedidos);
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }                                               

  columns = [
    { property: 'order', label: 'Order' },
    { property: 'describe', label: 'Description' },
    { property: 'amount', label: 'Amount' },
    { property: 'price', label: 'Price' },
    { property: 'um', label: 'UM' },
    { property: 'provider', label: 'Provider' }
  ];


  // columns = [
  //   { property: 'medicao', label: 'Medição' },
  //   { property: 'contrato', label: 'Nº Contrato' },
  //   { property: 'revisao', label: 'Nº Revisao' },
  //   { property: 'competencia', label: 'Competencia' },
    //  { property: 'descricao', label: 'Descricao' }
  //   { property: 'valor', label: 'Valor' },

  // ];

}
