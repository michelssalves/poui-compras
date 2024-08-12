
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
    ChartsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterContentChecked, OnInit {

  @ViewChild('formShare', { static: true }) formShare?: NgForm;
  @ViewChild(PoModalComponent) poModal?: PoModalComponent;

  columns: Array<PoTableColumn> = [];
  email: string = '';
  isSubscribed: boolean = false;
   items: Array<object> =  [];

  public readonly actions: Array<PoPageAction> = [
    { label: 'Share', action: this.modalOpen.bind(this), icon: 'ph ph-share' },
    {
      label: 'Disable notification',
      icon: 'ph ph-bell',
      action: this.disableNotification.bind(this),
      disabled: () => this.isSubscribed
    }
  ];

   public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Dashboard' }]
   };

  public readonly cancelAction: PoModalAction = {
    action: () => {
      this.modalClose();
    },
    label: 'Cancel'
  };

  public readonly shareAction: PoModalAction = {
    action: () => {
      this.share();
    },
    label: 'Share'
  };

  constructor(
    private poNotification: PoNotificationService,
    private sampleDashboardService: DashboardService,
  ) {}

  ngOnInit() {
    this.columns = this.sampleDashboardService.getColumns();
    this.items = this.sampleDashboardService.getItems();
  }

  ngAfterContentChecked() {
    this.shareAction.danger = !!this.formShare?.invalid;
  }

  modalClose() {
    this.poModal?.close();
    this.formShare?.reset();
  }

  modalOpen() {
    this.poModal?.open();
  }

  share() {
    if (this.formShare?.valid) {
      this.poNotification.success(`Webpage shared successfully to: ${this.email}.`);
    } else {
      this.poNotification.error(`Invalid email.`);
    }
    this.modalClose();
  }

  private disableNotification() {
    this.isSubscribed = true;
  }
  salesRanges: Array<PoGaugeRanges> = [
    { from: 0, to: 50, label: 'Sales reduction', color: '#c64840' },
    { from: 50, to: 75, label: 'Average sales', color: '#ea9b3e' },
    { from: 75, to: 100, label: 'Sales soared', color: '#00b28e' }
  ];

  turnoverRanges: Array<PoGaugeRanges> = [
    { from: 0, to: 50, label: 'Low rate', color: '#00b28e' },
    { from: 50, to: 75, label: 'Average rate', color: '#ea9b3e' },
    { from: 75, to: 100, label: 'High rate', color: '#c64840' }
  ];

}
