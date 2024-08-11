import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PoPageDynamicSearchComponent } from '@po-ui/ng-templates';
@NgModule({
  declarations: [AppComponent],
  imports: [PoPageDynamicSearchComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}