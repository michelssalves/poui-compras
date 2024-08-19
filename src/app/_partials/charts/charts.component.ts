import { Component } from '@angular/core';

import { PoChartType, PoChartOptions, PoChartSerie, PoDialogService,  PoTableModule, PoContainerModule, PoWidgetModule, PoChartModule} from '@po-ui/ng-components';
import { PedidosService } from '../../_services/compras/pedidos/pedidos.service';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [PoTableModule, PoContainerModule, PoWidgetModule, PoChartModule],
  templateUrl: './charts.component.html',
  providers: [PoDialogService, PedidosService],
  styleUrl: './charts.component.css'
})
export class ChartsComponent {

  
  evolutionOfCoffeeAndSomeCompetitorsType: PoChartType = PoChartType.Column;
  coffeConsumingChartType: PoChartType = PoChartType.Donut;
  consumptionPerCapitaType: PoChartType = PoChartType.Bar;

  categoriesColumn: Array<any> = [];

  // chartAreaCategories: Array<string> = ['Jan-18', 'Jul-18', 'Jan-19', 'Jul-19', 'Jan-20', 'Jul-20', 'Jan-21'];

  coffeeProduction: Array<PoChartSerie> = []
  items: Array<any> = [];

  //BARRAS EM PÉ
  evolutionOfCoffeeAndSomeCompetitors: Array<PoChartSerie> = [ ]
    // COMPÁRAÇOES
    participationByCountryInWorldExportsType: PoChartType = PoChartType.Line;
    categories: Array<string> = [];
    participation: Array<PoChartSerie> = [];
  ngOnInit() {
    this.pedidosService.getMaxPurchases().subscribe(
      response => {
        this.coffeeProduction = response.objects;
        //console.log(response.objects)
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
    this.pedidosService.getMaxPurchasesTab().subscribe(
      response => {
        this.items = response.objects;
        //console.log(response.objects)
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
    this.pedidosService.getMaxPurchasesCol().subscribe(
      response => {
        this.evolutionOfCoffeeAndSomeCompetitors = response.objects;
       // console.log(response.objects)
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );  
    this.pedidosService.getMaxPurchasesLine().subscribe(
      response => {
        this.categories = response.categories[0]
        this.participation = response.participation;
        console.log(response.categories)
        console.log(response.participation)
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );  
  }  


//  // ranking




//PIZZA
   
//BARRAS DEITADAS 
  consumptionPerCapitaItems: Array<string> = [
    'Water',
    'Fruit Juice',
    'Coffee',
    'Cola drinks',
    'Pils',
    'Tea',
    'Red Wine',
    'Prosecco',
    'Sodas',
    'Beer 0% A.',
    'Wheat Beer',
    'Milk Shakes',
    'Icetea'
  ];
 consumptionPerCapita: Array<PoChartSerie> = [
  { label: '2018', data: [86.5, 51.3, 44.6, 39.5, 27.6, 27.3, 25.4, 21.5, 20.8, 15.9, 15.4, 14.4] },
  { label: '2020', data: [86.1, 52.1, 47.3, 37.8, 29.8, 28.5, 24.9, 22.5, 21.1, 14.5, 15.5, 15.5] }
];


  // ];


  // //ROSCA
  // coffeeConsumption: Array<PoChartSerie> = [
  //   { label: 'Finland', data: 9.6, tooltip: 'Finland (Europe)' },
  //   { label: 'Norway', data: 7.2, tooltip: 'Norway (Europe)' },
  //   { label: 'Netherlands', data: 6.7, tooltip: 'Netherlands (Europe)' },
  //   { label: 'Slovenia', data: 6.1, tooltip: 'Slovenia (Europe)' },
  //   { label: 'Austria', data: 5.5, tooltip: 'Austria (Europe)' }
  // ];
 //QUADRO
  // chartAreaSeries: Array<PoChartSerie> = [
  //   { label: 'Starbucks', data: [550, 497, 532, 550, 530, 565, 572], type: PoChartType.Area },
  //   { label: 'Green Mntn Coffee Roaster', data: [420, 511, 493, 525, 522, 510, 567], type: PoChartType.Area },
  //   { label: 'Dunkin Brands Group', data: [312, 542, 497, 610, 542, 661, 674], type: PoChartType.Area },
  //   {
  //     label: 'Coffee Arabica Price',
  //     data: [550, 612, 525, 373, 342, 297, 282],
  //     type: PoChartType.Line,
  //     color: 'po-color-07'
  //   }
  // ];
  //TABELAS


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

  constructor(
    private poAlert: PoDialogService,
    private pedidosService: PedidosService
  ) {}

  searchMore(event: any) {
    window.open(`http://google.com/search?q=coffee+producing+${event.label}`, '_blank');
  }
  


  showMeTheDates(event: any) {
    this.poAlert.alert({
      title: 'Statistic',
      message: `${event.label} consuming ${event.data}kg per capita!`,
      ok: () => {}
    });
  }

}
