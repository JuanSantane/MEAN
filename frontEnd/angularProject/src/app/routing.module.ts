import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { patch } from 'webdriver-js-extender';
import { DeviceComponent } from './devices/device/device.component';
import { AppComponent } from './app.component';
import { DevicesComponent } from './devices/devices-list.component';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'devices', pathMatch: 'full' },
  { path: 'devices', component: DevicesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'devices/:name', component: DeviceDetailComponent }
  // { path: 'devices', component: DevicesComponent, children: [
  //   {path: ':name', component: DeviceDetailComponent }
  // ] },
  // { path: 'about', component: DeviceComponent }
];

@NgModule({

  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})

export class AppRoutingModule {

}
