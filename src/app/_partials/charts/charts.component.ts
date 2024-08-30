import { Component, NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PoChartType, PoChartOptions, PoChartSerie, PoDialogService,  PoTableModule, PoContainerModule, PoWidgetModule, PoChartModule, PoSelectOption, PoDisclaimerGroupModule, PoFieldModule, PoMultiselectOption} from '@po-ui/ng-components';
import { PedidosService } from '../../_services/compras/pedidos/pedidos.service';
import { FiltersService } from '../../_services/filters/filters.service';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [PoTableModule, PoContainerModule, PoWidgetModule, PoChartModule,PoDisclaimerGroupModule, PoFieldModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './charts.component.html',
  providers: [PoDialogService, PedidosService],
  styleUrl: './charts.component.css'
})
export class ChartsComponent {

  tipo: string = 'LI';
  ano: string = '2024'
  produto: string = 'MC40009135'
  mProduto: string[] = [];
 
  consumptionPerCapitaType: PoChartType = PoChartType.Bar;
  categoriesColumn: Array<any> = [];
  // chartAreaCategories: Array<string> = ['Jan-18', 'Jul-18', 'Jan-19', 'Jul-19', 'Jan-20', 'Jul-20', 'Jan-21'];
  pizzaItens: Array<PoChartSerie> = []
  tableItens: Array<any> = [];
  typeAccount: string = 'Checking Account';
  //BARRAS EM PÉ
  evolutionOfCoffeeAndSomeCompetitors: Array<PoChartSerie> = [ ]
  // COMPÁRAÇOES
  participationByCountryInWorldExportsType: PoChartType = PoChartType.Line;
  categories: Array<string> = [];
  participation: Array<PoChartSerie> = [];
  
  readonly anos: Array<PoSelectOption> = [
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' }
  ];
  readonly tipos: Array<PoSelectOption> = [
    { label: 'MATERIAL DE LIMPEZA', value: 'LI' },
    { label: 'SERVICO TERCEIRO', value: 'ST' },
    { label: 'MATERIAIS CONSUMO', value: 'MC' },
    { label: 'FERRAMENTAS EM GERAL', value: 'FG' },
    { label: 'ELEMENTOS MECANICOS', value: 'EM' }
  ];

  readonly produtos:Array<PoSelectOption> = [
    { label: 'MANGUEIRAS E CONEXOES PARA PTS', value: 'EM00000935' },
    { label: 'PINO DO SKEW PARA TR KALMAR 21', value: 'EM00009938' },
    { label: 'PONTEIRA;SOLDA;30KVA;220V;PESO', value: 'FG00001007' },
    { label: 'MARCADORA;PNEUS;9 DIGITOS;20MM', value: 'FG90607855' }
  ]
  mProdutos: Array<PoMultiselectOption> = [
    { value: 'MC40000040', label: '1' },
    { value: 'MC40000427', label: '2' },
    { value: 'MC40000162', label: '3' },
    { value: 'MP88000028', label: '4' },
    { value: 'MC40009106', label: '5' }
  ];
  
  constructor(
    private poAlert: PoDialogService,
    private pedidosService: PedidosService,
    private filterService:FiltersService
  ) {}

  ngOnInit() {
    this.getPizza()
    this.getTable()
    this.getCols()
    this.getLines()
  } 
  searchMore(event: any) {
    window.open(`http://google.com/search?q=coffee+producing+${event.label}`, '_blank');
  }
  getPizza(){

    console.log(this.tipo)
    this.pedidosService.getPizza(this.tipo, this.ano).subscribe(
      response => {
        this.pizzaItens = response.objects;
        //console.log(this.pizzaItens)
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  } 
  getTable(){

    this.pedidosService.getTable(this.tipo, this.ano).subscribe(
      response => {
        this.tableItens = response.objects;
        //console.log(this.tableItens)
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  getCols(){

    this.pedidosService.getCols(this.tipo, this.produto, this.ano).subscribe(
      response => {
        this.evolutionOfCoffeeAndSomeCompetitors = response.objects;
        //console.log(this.tableItens)
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  getLines(){
    this.pedidosService.getLines(this.mProduto, this.ano).subscribe(
      response => {
        this.categories = response.categories[0]
        this.participation = response.participation;

      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  changeTipo(event: any) {
  
    this.getPizza()
    this.getTable()
    this.getCols()

  }
  changeAno(event: any) {

    this.getPizza()
    this.getTable()
    this.getCols()

  }
  changeProduto(event: any) {

    this.getPizza()
    this.getTable()
    this.getCols()

  }
  changeProdutos(event: any) {

    this.getLines()
  

  }
  consumptionPerCapitaOptions: PoChartOptions = {
    axis: {
      maxRange: 100,
      gridLines: 2
    }
  };

  chartAreaOptions: PoChartOptions = {
    axis: {
      maxRange: 700,
      gridLines: 8
    }
  };

  options: PoChartOptions = {
    axis: {
      minRange: 0,
      maxRange: 40,
      gridLines: 5
    }
  };

  optionsColumn: PoChartOptions = {
    axis: {
      minRange: -20,
      maxRange: 100,
      gridLines: 7
    }
  };






}
