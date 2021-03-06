import { PracticeComponent } from './practice/practice.component';
import { PracticeService } from './services/practice.service';
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
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard.service';
import { AccessForbiddenComponent } from './shared/access-forbidden/access-forbidden.component';

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
    PracticeComponent,
    AccessForbiddenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    EmbedVideo.forRoot()
  ],
  providers: [DeviceService, PracticeService, UserService, CanDeactivateGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
