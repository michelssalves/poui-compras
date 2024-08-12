import { Component, OnInit } from '@angular/core';
import { PoComboOption, PoDisclaimer, PoTableColumn, PoDisclaimerGroupModule, PoFieldModule   } from '@po-ui/ng-components';
import { FiltersService } from '../../_services/filters/filters.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [PoDisclaimerGroupModule, PoFieldModule ],
  templateUrl: './filters.component.html',
  providers: [FiltersService ],
  styleUrl: './filters.component.css'
})
export class FiltersComponent {

  constructor(public disclaimerGroupSwPlanetsService: FiltersService) {}



}
