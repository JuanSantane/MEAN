import { Subscription } from 'rxjs/Subscription';
import { Device } from './../../shared/Device';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceService } from '../../device.service';
import { Request } from '../../shared/request';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit, OnDestroy {


  @ViewChild('formData') formData: NgForm;
  private paramsSubscription: Subscription;
  deviceTypes = ['LSR', 'VOC', 'MRA'];
  queryRqst = new Request();
  currentDevice: Device;
  deviceData = {
    name: '',
    type: '',
    description: ''
  };
  submited = false;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router
  ) { }



  onSubmit() {
    const deviceFormObject = this.formData.value.deviceData;
    this.currentDevice.name = deviceFormObject.name;
    this.currentDevice.type = deviceFormObject.type;
    this.currentDevice.desc = deviceFormObject.description;
    this.deviceService.update(this.currentDevice)
    .subscribe(
      (res) => {}
    );

   // this.formData.reset();
  }
  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.queryRqst.id = params.id;
          this.deviceService.getDevices(this.queryRqst)
        .subscribe(
          (device: any ) =>  {
            this.currentDevice = device;
            this.fillData();
          },
          (error) => { console.log(error); }
        ); }
      );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  fillData() {
    this.formData.form.patchValue({
      deviceData: {
        name: this.currentDevice.name,
        description: this.currentDevice.desc,
        type: this.currentDevice.type
      }
    });
  }

  onDelete() {
    let rqst = new Request();
    rqst.id = this.currentDevice._id;
    this.deviceService.deleteOne(rqst).subscribe(res => {
      if (res.ok === 1) {
        this.router.navigate(['/devices']);
      }
    });
  }
}
