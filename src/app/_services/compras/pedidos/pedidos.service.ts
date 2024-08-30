import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl = 'http://vhwin1065:9023/rest/zWSPedidos/get_all/';
  private apiPizza = 'http://vhwin1065:9023/rest/zWSDash/get_max_purchases_pizza';
  private apiTable = 'http://vhwin1065:9023/rest/zWSDash/get_max_purchases_tab';
  private apiCols = 'http://vhwin1065:9023/rest/zWSDash/get_max_purchases_col';
  private apiLines = 'http://vhwin1065:9023/rest/zWSDash/get_max_purchases_lin';
  private apiGroups = 'http://vhwin1065:9023/rest/zWSDash/get_groups';
  private apiProducts = 'http://vhwin1065:9023/rest/zWSDash/get_products';

  constructor(private http: HttpClient) { }


  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  postData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  getGroups(): Observable<any> {
    return this.http.get<any>(this.apiGroups);
  }
  getProducts(tipo: string): Observable<any> {
    const url = `${this.apiProducts}?tipo=${tipo}`;
    return this.http.get<any>(url);
  }
  getPizza(tipo: string, ano: string): Observable<any> {
    const url = `${this.apiPizza}?tipo=${tipo}&ano=${ano}`;
    return this.http.get<any>(url);
  }
  getTable(tipo: string, ano: string): Observable<any> {
    const url = `${this.apiTable}?tipo=${tipo}&ano=${ano}`;
    return this.http.get<any>(url);
  }
  getCols(tipo: string, produto: string, ano: string): Observable<any> {
   
    const url = `${this.apiCols}?tipo=${tipo}&produto=${produto}&ano=${ano}`;
    return this.http.get<any>(url);
  }
  getLines(produtos: string[], ano: string): Observable<any> {
    const url = `${this.apiLines}?produtos=${produtos}&ano=${ano}`;
    return this.http.get<any>(url);
  }


}
