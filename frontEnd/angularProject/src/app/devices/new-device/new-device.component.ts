import { Device } from './../../shared/Device';
import { DeviceService } from './../../device.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AbstractControl } from '@angular/forms/src/model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {
  deviceTypes = ['MRA', 'LSR', 'VOC'];
  newDeviceForm: FormGroup;
  forbiddenDeviceNames = ['ABC', 'DEF', 'GHI', 'FELIPESANTA'];

  constructor(
    private deviceService: DeviceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.newDeviceForm = new FormGroup({
      'deviceData': new FormGroup({
        'type': new FormControl(null, [Validators.required]),
        'name': new FormControl(null, [Validators.required, this.forbiddenNamesValidator.bind(this)]),
        'description': new FormControl(null, [])
      })
    });

    this.newDeviceForm.get('deviceData.type').valueChanges.subscribe((type) => {
      const validatorsForDeviceName = [this.forbiddenNamesValidator.bind(this), Validators.required];
      const validatorsForDeviceDescription = [];
      const asyncValidatorsForDeviceDescription = [];
      console.log(type + ' selected');

      switch (type) {
        case 'MRA': {
          validatorsForDeviceName.push(Validators.minLength(6));
          validatorsForDeviceName.push(Validators.pattern('^(MRA)-[a-zA-Z0-9_.-]+$'));
          break;
        }
        case 'LSR': {
          validatorsForDeviceName.push(Validators.minLength(4));
          validatorsForDeviceName.push(Validators.pattern('^(LSR)-[a-zA-Z0-9_.-]+$'));
          break;
        }
        case 'VOC': {
          validatorsForDeviceName.push(Validators.minLength(2));
          validatorsForDeviceName.push(Validators.pattern('^(VOC)-[a-zA-Z0-9_.-]+$'));
          validatorsForDeviceDescription.push(Validators.minLength(15), Validators.required);
          asyncValidatorsForDeviceDescription.push(this.forbiddenText);
          break;
       }
        default: {
           console.log('default case');
           break;
        }
     }

      this.newDeviceForm.get('deviceData.name').setValidators(validatorsForDeviceName);
      this.newDeviceForm.get('deviceData.description').setValidators(validatorsForDeviceDescription);
      this.newDeviceForm.get('deviceData.description').setAsyncValidators(asyncValidatorsForDeviceDescription);


      this.newDeviceForm.get('deviceData.name').updateValueAndValidity();
      this.newDeviceForm.get('deviceData.description').updateValueAndValidity();

    });

  }

  onSubmit() {
    const device: Device = this.parseToDevice(this.newDeviceForm.get('deviceData'));
    console.log(device);
    this.deviceService.createOne(device).subscribe(
      (res: any) => {
        console.log(res);
        console.log('Respuesta del POST --> ' + JSON.stringify(res));
        this.router.navigate(['/devices/', res.insertedId ]);
    });

    // this.newDeviceForm.reset();
  }

  onAddHobby() {
    // const control = new FormControl(null, Validators.required);
    // (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNamesValidator(control: FormControl): {[s: string]: boolean} {
    const value =  (control.value + '').toUpperCase();
    if (this.forbiddenDeviceNames.indexOf(value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenText(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      const controlValue = (control.value + '').toUpperCase();
      setTimeout(() => {
        if (controlValue.includes('METRO')) {
          resolve({'invalidText': true});
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promise;
  }

  testEvent(object: any) {
    console.log(object);
  }

  getJson(obj: any) {
    return JSON.stringify(obj);
  }

  parseToDevice(formControl: AbstractControl): any {
    return new Device(
      null,
      formControl.value.name,
      formControl.value.type,
      formControl.value.description
    );
  }
}
