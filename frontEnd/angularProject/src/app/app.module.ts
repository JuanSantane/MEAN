import { PracticeComponent } from './practice/practice.component';
import { PracticeService } from './practice.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NewDeviceComponent } from './devices/new-device/new-device.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './routing.module';
import { SelectedItemDirective } from './shared/selected.item.directive';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DeviceService } from './device.service';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DevicesComponent } from './devices/devices-list.component';
import { DeviceComponent } from './devices/device/device.component';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { EmbedVideo } from 'ngx-embed-video';
import { EditDeviceComponent } from './devices/edit-device/edit-device.component';
import { CanDeactivateGuard } from './devices/can-deactivate-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent,
    DeviceComponent,
    DeviceDetailComponent,
    HeaderComponent,
    SelectedItemDirective,
    AboutComponent,
    EditDeviceComponent,
    PageNotFoundComponent,
    NewDeviceComponent,
    SignupComponent,
    SigninComponent,
    PracticeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    EmbedVideo.forRoot()
  ],
  providers: [DeviceService, CanDeactivateGuard, PracticeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
