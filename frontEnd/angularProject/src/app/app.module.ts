import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DeviceService } from './device.service';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { DeviceComponent } from './devices-list/device/device.component';
import { DeviceDetailComponent } from './devices-list/device-detail/device-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DevicesListComponent,
    DeviceComponent,
    DeviceDetailComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
