import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { UsersservicesService } from '../services/usersservices.service';
import { AuthservicesService } from '../services/authservices.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  signUpMyForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private authserv:AuthservicesService,
    private userserv:UsersservicesService,
    private router:Router,
    private toast:HotToastService) { }

  ngOnInit(): void {
  }
  get email() {
    return this.signUpMyForm.get('email');
  }

  get password() {
    return this.signUpMyForm.get('password');
  }

  get confirmPassword() {
    return this.signUpMyForm.get('confirmPassword');
  }

  get name() {
    return this.signUpMyForm.get('name');
  }
  submit(){
    if (!this.signUpMyForm.valid) {
      return;
    }

    const { name, email, password } = this.signUpMyForm.value;
    
    this.authserv
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.userserv.addUser({ uid, email, displayName: name ,image:"assets/images/image-placeholder.png",bio:"Welcom in my web Site Drone" })
         
          ),
        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Signing up...',
         
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
 
}
// *********************
export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}