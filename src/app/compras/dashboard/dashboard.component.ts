
import { AfterContentChecked, Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { DashboardService } from '../../_services/compras/dashboard/dashboard.service';
import { GaugeComponent } from '../../_partials/gauge/gauge.component';
import {
  PoContainerModule,
  PoWidgetModule,
  PoBreadcrumb,
  PoPageModule,
  PoModalModule,
  PoFieldModule,
  PoDynamicModule,
  PoTableModule,
  PoGaugeRanges,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { ChartsComponent } from '../../_partials/charts/charts.component';
import { FiltersComponent } from '../../_partials/filters/filters.component';

@Component({
  selector: 'app-sample-po-container-dashboard',
  standalone: true,
  imports: [
    PoContainerModule,
    PoWidgetModule,
    PoPageModule,
    PoModalModule,
    PoFieldModule,
    PoDynamicModule,
    PoTableModule,
    GaugeComponent,
    ChartsComponent,
    FiltersComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  {

   public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Dashboard' }]
   };

  constructor(
    private sampleDashboardService: DashboardService,
  ) {}

}
