import { Component} from '@angular/core';
import { PoDisclaimerGroupModule, PoFieldModule, PoSelectOption } from '@po-ui/ng-components';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [PoDisclaimerGroupModule, PoFieldModule ],
  templateUrl: './filters.component.html',
  providers: [],
  styleUrl: './filters.component.css'
})
export class FiltersComponent {

  readonly tipos: Array<PoSelectOption> = [
    { label: 'SERVICO TERCEIRO', value: 'ST' },
    { label: 'MATERIAIS CONSUMO', value: 'MC' },
    { label: 'FERRAMENTAS EM GERAL', value: 'FG' },
    { label: 'ELEMENTOS MECANICOS', value: 'EM' }
  ];

}


