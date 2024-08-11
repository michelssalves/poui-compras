
import { AfterContentChecked, Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { PoContainerModule, PoWidgetModule, PoPageModule, PoModalModule, PoFieldModule, PoDynamicModule,PoTableModule    } from '@po-ui/ng-components';


import {
  PoBreadcrumb,
  PoModalAction,
  PoModalComponent,
  PoNotificationService,
  PoPageAction,
  PoTableColumn
} from '@po-ui/ng-components';
import { DashboardService } from '../../_services/compras/dashboard/dashboard.service';


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

  ],
  templateUrl: './sample-po-container-dashboard.component.html',
  styleUrl: './sample-po-container-dashboard.component.css'
})
export class SamplePoContainerDashboardComponent implements AfterContentChecked, OnInit {

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
    private sampleDashboardService: DashboardService
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

}
