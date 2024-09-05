import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://vhwin1065:9023/rest/zWSPedidos/get_all/';
  private apiPizza = 'http://vhwin1065:9023/rest/zWSDash/get_max_purchases_pizza';
  private apiTable = 'http://vhwin1065:9023/rest/zWSDash/get_max_purchases_tab';
  private apiCols = 'http://vhwin1065:9023/rest/zWSDash/get_max_purchases_col';
  private apiLines = 'http://vhwin1065:9023/rest/zWSDash/get_max_purchases_lin';
  private apiGroups = 'http://vhwin1065:9023/rest/zWSDash/get_groups';
  private apiProducts = 'http://vhwin1065:9023/rest/zWSDash/get_products';

  constructor(private http: HttpClient) { }

  getGroups(): Observable<any> {
    return this.http.get<any>(this.apiGroups);
  }
  getProducts(tipo: string): Observable<any> {
    const url = `${this.apiProducts}?tipo=${tipo}`;
    return this.http.get<any>(url);
  }
  getPizza(tipo: string, mes: string, ano: string): Observable<any> {
    const url = `${this.apiPizza}?tipo=${tipo}&mes=${mes}&ano=${ano}`;
    return this.http.get<any>(url);
  }
  getTable(tipo: string, mes: string, ano: string): Observable<any> {
    const url = `${this.apiTable}?tipo=${tipo}&mes=${mes}&ano=${ano}`;
    return this.http.get<any>(url);
  }
  getCols(tipo: string, produto: string, ano: string): Observable<any> {
   
    const url = `${this.apiCols}?tipo=${tipo}&produto=${produto}&ano=${ano}`;
    return this.http.get<any>(url);
  }
  getLines(tipo: string, produtos: string[], ano: string): Observable<any> {
    const url = `${this.apiLines}?tipo=${tipo}&produtos=${produtos}&ano=${ano}`;
    return this.http.get<any>(url);
  }

}
