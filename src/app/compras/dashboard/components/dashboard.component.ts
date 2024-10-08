import { Component, NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoChartType, PoChartOptions, PoChartSerie, PoTableModule, PoContainerModule, PoWidgetModule, PoChartModule, PoSelectOption, PoDisclaimerGroupModule, PoFieldModule, PoMultiselectOption, PoDialogService} from '@po-ui/ng-components';
import { DashboardService } from '../services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PoTableModule, PoContainerModule, PoWidgetModule, PoChartModule,PoDisclaimerGroupModule, PoFieldModule, FormsModule],

schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [PoDialogService, DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {

  maxSelection = 5;
  grupo: string = 'AB';
  groupName: string = 'ABASTECIMENTO'
  mes: string = this.mesAtual();
  ano: string = this.anoAtual()
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
  readonly meses: Array<PoSelectOption> = [
    { label: 'JAN' , value: '01'  },
    { label: 'FEV' , value: '02'  },
    { label: 'MAR' , value: '03'  },
    { label: 'ABR' , value: '04'  },
    { label: 'MAI' , value: '05'  },
    { label: 'JUN' , value: '06'  },
    { label: 'JUL' , value: '07'  },
    { label: 'AGO' , value: '08'  },
    { label: 'SET' , value: '09'  },
    { label: 'OUT' , value: '10'  },
    { label: 'NOV' , value: '11'  },
    { label: 'DEZ' , value: '12'  }
  ];
  grupos: Array<PoSelectOption> = []
  produtos:Array<PoSelectOption> = []
  mProdutos: Array<PoMultiselectOption> = [];
  
  constructor(
    private poAlert: PoDialogService,
    private dashboardService: DashboardService,
  ) {}

  ngOnInit() {
    this.getPizza()
    this.getTable()
    this.getCols()
    this.getLines()
    this.getGroups()
    this.getProducts()
    console.log(this.mesAtual())
   
  } 
  searchMore(event: any) {
    window.open(`http://google.com/search?q=coffee+producing+${event.label}`, '_blank');
  }
  getGroups(){
    console.log(this.grupo)
    this.dashboardService.getGroups().subscribe(
      response => {
        this.grupos = response.objects;
        //console.log(this.pizzaItens)
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  anoAtual(){
    const agora = new Date()
    return agora.getFullYear().toString()
  }
  mesAtual(){
    const data = new Date();
    return (data.getMonth() + 1).toString().padStart(2, '0');
  }
  getProducts(){
    console.log(this.grupo)
    this.dashboardService.getProducts(this.grupo).subscribe(
      response => {
        this.produtos = response.product
        this.mProdutos = response.products
        //console.log(this.pizzaItens)
      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  getPizza(){

    console.log(this.grupo)
    this.dashboardService.getPizza(this.grupo, this.mes, this.ano).subscribe(
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

    this.dashboardService.getTable(this.grupo, this.mes, this.ano).subscribe(
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

    this.dashboardService.getCols(this.grupo, this.produto, this.ano).subscribe(
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
    this.dashboardService.getLines(this.grupo, this.mProduto, this.ano).subscribe(
      response => {
        this.categories = response.categories[0]
        this.participation = response.participation;
        console.log(response.participation)

      },
      error => {
        console.error('Erro ao obter dados:', error);
      }
    );
  }
  changeTipo(event: any) {
    const selectedOption = this.grupos.find(option => option.value === event);
    if (selectedOption) {
      const originalLabel = selectedOption.label;
      const hyphenIndex =originalLabel.indexOf('-')
      if (hyphenIndex !== -1) {
        const valueAfterHyphen = originalLabel.substring(hyphenIndex + 1);
        this.groupName = valueAfterHyphen.trimStart(); 
      } else {
        console.log('O hífen não foi encontrado na string.');
      }
    }

    this.getPizza()
    this.getTable()
    this.getCols()
    this.getProducts()

  }
  changeMes(event: any) {

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

    if(!this.isMaxSelected()){  
      this.categories = []
      this.participation = []
      this.getLines()
    }else{
      alert('Limite Maximo Atingido, não será aparesentado no grafico')
    }
   }
  isMaxSelected(): boolean {
    return this.mProduto.length >= this.maxSelection;
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
