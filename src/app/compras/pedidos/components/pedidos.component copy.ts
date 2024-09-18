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
  PoBreadcrumb,
  PoTableColumnSort,
  PoTableColumnLabel,
  PoDialogService,
  PoTableComponent,
  PoTableAction,
  PoInfoModule,
  PoButtonModule, 

} from '@po-ui/ng-components';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AfterContentChecked, Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { PedidosService } from '../services';
import { SamplePoTableComponentStatus } from '../shared/enum';


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
  PoInfoModule,
  PoButtonModule

  
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
  providers: [PoDialogService]
})
export class PedidosComponent implements OnInit {

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;


 data1: string = '20240906'
 data2: string = '20240906'
 actions: Array<PoTableAction> = [
  {
    action: this.discount.bind(this),
    icon: 'ph ph-currency-circle-dollar',
    label: 'Apply Discount',
    disabled: this.validateDiscount.bind(this)
  },
  { action: this.details.bind(this), icon: 'ph ph-info', label: 'Details' },
  { action: this.remove.bind(this), icon: 'po-icon ph ph-trash', label: 'Remove' }
];
  columns: Array<PoTableColumn>;
  columnsDefault: Array<PoTableColumn>;
  detail: any;
  pedidos: any 
  items: Array<any>;
  total: number = 0;
  totalExpanded = 0;
  initialColumns: Array<any>;
 constructor(
  private pedidosService: PedidosService,
  //private sampleAirfare: SamplePoTableAirfareService,
  private poNotification: PoNotificationService,
  private poDialog: PoDialogService
 ) {
    
  }

  getItems() {
    this.pedidosService.getPedidos('20240906', '20240906').subscribe(
      response => {
       this.items = response.objects;
       //this.items = [{"item": "0001","codigo": "ST00005124","produto": "…ocial"": "Craft Multimodal Lt","data": "06/09/24"}]
       console.log(this.items)
       
      },
      error => {
        console.error('Erro ao buscar dados', error);
      }
    );
  }

  ngOnInit(): void {

    //this.pedidos = this.pedidosService.getPedidos(this.data1, this.data2)
    this.columns = this.pedidosService.getColumns();
    this.getItems(); 

   // console.log( this.items)
    // this.pedidosService.getPed().subscribe(data => {
    //   this.pedidos = data[0];
    //   console.log(this.pedidos)
    // });
    // this.pedidosService.getPed('20240906','20240906').subscribe({
    //   next: (response) => {
  
    //       this.pedidos = response[0];
    //       console.log('Dados recebidos:', this.pedidos);
     
    //   },
    //   error: (error) => {
    //     console.error('Erro ao obter dados:', error);
    //   }
    // });
  }                                               

  gAfterViewInit(): void {
    this.columnsDefault = this.columns;
    if (localStorage.getItem('initial-columns')) {
      this.initialColumns = localStorage.getItem('initial-columns').split(',');

      const result = this.columns.map(el => ({
        ...el,
        visible: this.initialColumns.includes(el.property)
      }));

      const newColumn = [...result];
      newColumn.sort(this.sortFunction);
      this.columns = newColumn;
    }
  }

  sortFunction(a, b) {
    const teste = localStorage.getItem('initial-columns').split(',');
    const indexA = teste.indexOf(a['property']);
    const indexB = teste.indexOf(b['property']);
    
    if (indexA === -1) {
      return 1;  // a goes after b if it's not found
    }
    if (indexB === -1) {
      return -1;  // a goes before b if b is not found
    }
    if (indexA < indexB) {
      return -1;  // a comes before b
    } else if (indexA > indexB) {
      return 1;  // a comes after b
    }
    
    return 0;  // a and b are in the same position
  }
  

  addToCart() {
    const selectedItems = this.poTable.getSelectedRows();

    if (selectedItems.length > 0) {
      this.poDialog.confirm({
        title: 'Add to cart',
        message: `Would you like to add ${selectedItems.length} items to cart?`,
        confirm: () => this.confirmItems(selectedItems),
        cancel: () => {}
      });
    }
  }

  confirmItems(selectedItems: Array<any>) {
    selectedItems.forEach(item => {
      switch (item.status) {
        case 'available':
          this.poNotification.success(`${this.getDescription(item)} added succesfully`);
          break;
        case 'reserved':
          this.poNotification.warning(
            `${this.getDescription(item)} added succesfully, verify your e-mail to complete reservation`
          );
          break;
        case 'closed':
          this.poNotification.error(`${this.getDescription(item)} is closed and not available anymore`);
          break;
      }
    });

    this.poTable.unselectRows();
  }

  collapseAll() {
    this.items.forEach((item, index) => {
      if (item.detail) {
        this.onCollapseDetail();
        this.poTable.collapse(index);
      }
    });
  }

  decreaseTotal(row: any) {
    if (row.value) {
      this.total -= row.value;
    }
  }

  deleteItems(items: Array<any>) {
    this.items = items;
  }

  details(item) {
    this.detail = item;
    this.poModal.open();
  }

  remove(item: { [key: string]: any }) {
    this.poTable.removeItem(item);
  }

  discount(item) {
    if (!item.disableDiscount) {
      const updatedItem = { ...item, value: item.value - item.value * 0.2, disableDiscount: true };
      this.poTable.updateItem(item, updatedItem);
    }
  }

  expandAll() {
    this.totalExpanded = 0;
    this.items.forEach((item, index) => {
      if (item.detail) {
        this.onExpandDetail();
        this.poTable.expand(index);
      }
    });
  }

  onCollapseDetail() {
    this.totalExpanded -= 1;
    this.totalExpanded = this.totalExpanded < 0 ? 0 : this.totalExpanded;
  }

  onExpandDetail() {
    this.totalExpanded += 1;
  }

  sumTotal(row: any) {
    if (row.value) {
      this.total += row.value;
    }
  }

  restoreColumn() {
    this.columns = this.columnsDefault;
  }

  changeColumnVisible(event) {
    localStorage.setItem('initial-columns', event);
  }

  private getDescription(item: any) {
    return `Airfare to ${item.destination} - ${item.initials}`;
  }

  private validateDiscount(item) {
    return item.disableDiscount;
  }
  
  // columns = [
  //   { property: 'order', label: 'Order' },
  //   { property: 'describe', label: 'Description' },
  //   { property: 'amount', label: 'Amount' },
  //   { property: 'price', label: 'Price' },
  //   { property: 'um', label: 'UM' },
  //   { property: 'provider', label: 'Provider' }
  // ];


  // columns = [
  //   { property: 'medicao', label: 'Medição' },
  //   { property: 'contrato', label: 'Nº Contrato' },
  //   { property: 'revisao', label: 'Nº Revisao' },
  //   { property: 'competencia', label: 'Competencia' },
    //  { property: 'descricao', label: 'Descricao' }
  //   { property: 'valor', label: 'Valor' },

  // ];

}
