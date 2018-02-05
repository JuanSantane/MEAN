import { Component, OnInit,OnDestroy} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../shared/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup = new FormGroup({
    'userData': new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'surname': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      're-password': new FormControl(null,[Validators.required])
    })
  });
  private signupSubscription: Subscription;

  constructor(
    private userService: UserService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm.get('userData').get('password').valueChanges
    .subscribe(value => {

    });
    this.signupForm.get('userData').get('re-password').valueChanges
    .subscribe(value => {
    });
  } 

  validatepassMatching() {
    let password = this.signupForm.get('userData').get('password').value;
    let rePassword = this.signupForm.get('userData').get('re-password').value;
    return password === rePassword;     
  }
  ngOnDestroy(): void {
  }

  onSubmit() {
    const userData =  this.signupForm.getRawValue().userData;
    const user = new User(
      null,
      userData.name,
      userData.surname,
      userData.email,
      userData.password
    );
    console.log(user);
    this.signupSubscription = this.userService.singup(user)
      .subscribe(
        (response: any) => {
      },
      err => {
        console.log("Error occured.")
        console.log(err);
      },
      () => { this.router.navigate(['/devices']); }
    );
  }
}
