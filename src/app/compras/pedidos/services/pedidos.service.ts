import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PoTableColumn, PoTableColumnSort, PoTableColumnSortType, PoTableDetail } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl = 'http://vhwin1065:9023/rest/zWSPedidos/get_all_po';

  // pedidos: Array<any> = [      {
  //   Item: 11234,
  //   initials: 'BR',
  //   country: 'Brazil',
  //   value: 1000.0,
  //   date: '2018-10-09',
  //   returnDate: '2018-11-01',
  //   class: 'Economic',
  //   onBoardService: false,
  //   destination: 'Rio de Janeiro',
  //   airline: 'Azul',
  //   status: 'available',
  //   region: 'Latin America',
  // },]

  pedidos: Array<any>

  constructor(private http: HttpClient) { }
  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'Item' },
      { property: 'Codigo' },
      { property: 'Produto' },
      { property: 'Un1A' },
      { property: 'Un2A' },
      { property: 'Qtde1A' },
      { property: 'Qtde2A' },
      { property: 'Preco'},
      { property: 'R$'},
      { property: 'Pagamento' },
      { property: 'Condicao'},
      { property: 'Fornecedor' },
      { property: 'Loja' },
      { property: 'rzSocial' },
      { property: 'Data' }

    ];
  }  
  getPedidos(data1: string, data2: string): Observable<any> {
    const url = `${this.apiUrl}?data1=${data1}&data2=${data2}`;
    return this.http.get<any>(url);  // Retorna o Observable
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

}