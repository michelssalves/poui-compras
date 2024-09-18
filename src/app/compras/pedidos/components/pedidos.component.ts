import { Component, OnInit, ViewChild } from '@angular/core';

import { PoBreadcrumb, PoButtonModule, PoContainerModule, PoDynamicModule, PoDynamicViewField, PoFieldModule, PoInfoModule, PoModalComponent, PoModalModule, PoPageModule, PoTableModule, PoWidgetModule } from '@po-ui/ng-components';
import {
  PoPageDynamicTableActions,
  PoPageDynamicTableCustomAction,
  PoPageDynamicTableCustomTableAction,
  PoPageDynamicTableOptions,
  PoPageDynamicDetailModule,
  PoPageDynamicEditModule,
  PoPageDynamicDetailField,
  PoPageDynamicDetailActions,
  PoPageDynamicTableModule  
} from '@po-ui/ng-templates';
import { PedidosService } from '../services';
import { CommonModule } from '@angular/common';

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
    PoButtonModule,
    PoPageDynamicDetailModule,
    PoPageDynamicEditModule,
    PoPageDynamicTableModule

    ],
  templateUrl: './pedidos.component.html',
  providers: [PedidosService]
})
export class PedidosComponent implements OnInit {
  
  @ViewChild('userDetailModal') userDetailModal!: PoModalComponent;
  @ViewChild('dependentsModal') dependentsModal!: PoModalComponent;

  serviceApi = 'http://vhwin1065:9023/rest/zWSPedidos/get_all_po?data1=20240906&data2=20240906';

  actionsRight = false;
  detailedUser: any;
  dependents: any;
  quickSearchWidth: number = 3;
  fixedFilter = false;
  id = 111

  readonly actions: PoPageDynamicTableActions = {
    new: 'pedidos/new',
    edit: `pedidos/edit?${this.id}`,
    remove: this.teste(),
    removeAll: true,
    
  };
  teste(){
    console.log('oi')
    return true
  }
  readonly cityOptions: Array<object> = [
    { value: 'São Paulo', label: 'São Paulo' },
    { value: 'Joinville', label: 'Joinville' },
    { value: 'São Bento', label: 'São Bento' },
    { value: 'Araquari', label: 'Araquari' },
    { value: 'Campinas', label: 'Campinas' },
    { value: 'Osasco', label: 'Osasco' }
  ];

  fields: Array<any> = [
    { property: 'Id', key: true, visible: false},
    { property: 'Pedido', label: 'Pedido'},
    { property: 'Item', label: 'Item'},
    { property: 'Codigo', label: 'Codigo'},
    { property: 'Produto', label: 'Produto' },
    { property: 'Un1A', label: 'Un1A'},
    { property: 'Un2A', label: 'Un2A'},
    { property: 'Qtde1A', label: 'Qtde1A'},
    { property: 'Qtde2A', label: 'Qtde2A' },
    { property: 'Preco', label: 'Preco'},
    { property: 'R$', label: 'R$' },
    { property: 'Pagamento', label: 'Pagamento'},
    { property: 'Condicao', label: 'Condicao'},
    { property: 'Fornecedor', label: 'Fornecedor'},
    { property: 'Loja', label: 'Loja'},
    { property: 'rzSocial', label: 'rzSocial'},
    { property: 'Data', label: 'Data'}
  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'status', tag: true, gridLgColumns: 4, divider: 'Personal Data' },
    { property: 'name', gridLgColumns: 4 },
    { property: 'nickname', label: 'User name', gridLgColumns: 4 },
    { property: 'email', gridLgColumns: 4 },
    { property: 'birthdate', gridLgColumns: 4, type: 'date' },
    { property: 'genre', gridLgColumns: 4, gridSmColumns: 6 },
    { property: 'cityName', label: 'City', divider: 'Address' },
    { property: 'state' },
    { property: 'country' }
  ];

  pageCustomActions: Array<PoPageDynamicTableCustomAction> = [
    {
      label: 'Actions Right',
      action: this.onClickActionsSide.bind(this),
      visible: this.isVisibleActionsRight.bind(this),
      icon: 'ph ph-caret-right'
    },
    {
      label: 'Actions Left',
      action: this.onClickActionsSide.bind(this),
      visible: this.isVisibleActionsLeft.bind(this),
      icon: 'ph ph-caret-left'
    },
    {
      label: 'Fixed Filter',
      action: this.onClickFixedFilter.bind(this),
      visible: this.isVisibleFixedFilter.bind(this),
      icon: 'ph ph-lock'
    },
    {
      label: 'Not Fixed Filter',
      action: this.onClickFixedFilter.bind(this),
      visible: this.isVisibleNotFixedFilter.bind(this),
      icon: 'ph ph-lock-open'
    },
    { label: 'Print', action: this.printPage.bind(this), icon: 'ph ph-printer' }
  ];

  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    // {
    //   label: 'Editar',
    //   action: this.onClickUserDetail.bind(this),
    //   disabled: this.isUserInactive.bind(this),
    //   icon: 'ph ph-user'
    // },
    // {
    //   label: 'Anexo',
    //   action: this.onClickDependents.bind(this),
    //   visible: this.hasDependents.bind(this),
    //   icon: 'ph ph-user'
    // },
  ];

  constructor(private usersService: PedidosService) {}

  ngOnInit(): void {
    this.pageCustomActions = [
      ...this.pageCustomActions,
      {
        label: 'Download .csv',
        action: this.usersService.downloadCsv.bind(this.usersService, this.serviceApi),
        icon: 'ph ph-download-simple'
      }
    ];
  }
 //COLUNAS
  onLoad(): PoPageDynamicTableOptions {
    return {

    };
  }

  isUserInactive(person: any) {
    return person.status === 'inactive';
  }

  hasDependents(person: any) {
    return true
   // return person.dependents.length !== 0;
  }

  printPage() {
    window.print();
  }

  private onClickUserDetail(user: any) {
    this.detailedUser = user;

    this.userDetailModal.open();
  }

  private onClickDependents(user: any) {
    console.log(user)
    this.dependents = user.Id;

    this.dependentsModal.open();
  }

  private onClickActionsSide(value: any) {
    this.actionsRight = !this.actionsRight;
  }

  private isVisibleActionsRight() {
    return !this.actionsRight;
  }

  private isVisibleActionsLeft() {
    return this.actionsRight;
  }

  private onClickFixedFilter() {
    this.fixedFilter = !this.fixedFilter;
    const fieldsDefault = [...this.fields];

    if (this.fixedFilter) {
      fieldsDefault
        .filter(field => field.property === 'search')
        .map(field => {
          field.initValue = 'Joinville';
          field.filter = true;
          field.fixed = true;
        });

      this.fields = fieldsDefault;
    } else {
      fieldsDefault
        .filter(field => field.property === 'search')
        .map(field => {
          field.initValue = 'São Paulo';
          field.fixed = false;
        });

      this.fields = fieldsDefault;
    }
  }

  private isVisibleFixedFilter() {
    return !this.fixedFilter;
  }

  private isVisibleNotFixedFilter() {
    return this.fixedFilter;
  }
}