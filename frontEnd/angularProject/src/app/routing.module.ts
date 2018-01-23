import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { patch } from 'webdriver-js-extender';
import { DeviceComponent } from './devices/device/device.component';
import { AppComponent } from './app.component';
import { DevicesComponent } from './devices/devices-list.component';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';
import { EditDeviceComponent } from './devices/edit-device/edit-device.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'devices', pathMatch: 'full' },
  { path: 'devices', component: DevicesComponent },
  { path: 'devices/edit/:id', component: EditDeviceComponent },
  { path: 'devices/new', component: EditDeviceComponent },
  { path: 'about', component: AboutComponent },
  { path: 'devices/:id', component: DeviceDetailComponent },
  { path: '**', component: PageNotFoundComponent }
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
