import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http';
import { PracticeService } from './../../practice.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Device } from './../../shared/Device';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceService } from '../../device.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  signinForm: FormGroup = new FormGroup({
    'userData': new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'surname': new FormControl(null, [Validators.required])
    })
  });

  constructor(private practiceService: PracticeService) { }

  ngOnInit() {

  }
  ngOnDestroy(): void {

  }

  onSubmit() {
    console.log(this.signinForm.getRawValue());
  }

}
