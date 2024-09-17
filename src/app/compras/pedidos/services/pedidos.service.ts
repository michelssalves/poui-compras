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

  constructor(private http: HttpClient) { }
  getColumns(): Array<PoTableColumn> {
    // const airfareDetail: PoTableDetail = {
    //   columns: [
    //     { property: 'package' },
    //     { property: 'tour' },
    //     { property: 'time', label: 'Departure time', type: 'time', format: 'HH:mm' },
    //     { property: 'distance', label: 'Distance (Miles)', type: 'number', format: '1.0-5' }
    //   ],
    //   typeHeader: 'top'
    // };

    return [
      {
        property: 'Item',
        type: 'label',
        labels: [
          // { value: 'available', color: 'color-11', label: 'Available' },
          // { value: 'reserved', color: 'color-08', label: 'Reserved' },
          // { value: 'closed', color: 'color-07', label: 'Closed' }
        ]
      },
      { property: 'Codigo' },
      { property: 'Descrição' },
      {
        property: 'UN1A',
        type: 'subtitle',
        width: '180px',
        subtitles: [
          // { value: 'Alps', color: 'color-01', label: 'Alps', content: 'AL' },
          // { value: 'Australasia', color: 'color-02', label: 'Australasia', content: 'AU' },
          // { value: 'British Isle', color: 'color-03', label: 'British Isle', content: 'BI' },
          // { value: 'Caucasus', color: 'color-04', label: 'Caucasus', content: 'CA' },
          // { value: 'Danube', color: 'color-05', label: 'Danube', content: 'DA' },
          // { value: 'East Asia', color: 'color-06', label: 'East Asia', content: 'EA' },
          // { value: 'Latin America', color: 'color-07', label: 'Latin America', content: 'LA' },
          // { value: 'Mediterranean', color: 'color-08', label: 'Mediterranean', content: 'ME' },
          // { value: 'Nordics', color: 'color-09', label: 'Nordics', content: 'NO' },
          // { value: 'North America', color: 'color-10', label: 'North America', content: 'NA' },
          // { value: 'Southern Africa', color: 'color-11', label: 'Southern Africa', content: 'SA' },
          // { value: 'Western Africa', color: 'color-12', label: 'Western Africa', content: 'WA' }
        ]
      },
      { property: 'UN2A' },
      { property: 'QTDE1A' },
      { property: 'QTDE2A' },
      { property: 'Preço'},
      { property: 'Total'},
      { property: 'Cod' },
      { property: 'Condição'},
      { property: 'Fornecedor' },
      { property: 'Loja' },
      { property: 'rzSocial' },
      { property: 'Data' },

    ];
  }

  items: any = [];

  // // Método para buscar os pedidos
  getPedidos(data1: string, data2: string) {
    const url = `${this.apiUrl}?data1=${data1}&data2=${data2}`;

     this.http.get<any>(url).subscribe(
      response => {
        this.items = [response.objects]
        
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );


}

TestBed(){
  this.getPedidos('20240906','20240906')
  return this.items
}  
  postData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  
}
