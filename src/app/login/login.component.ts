import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthservicesService } from '../services/authservices.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginMyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  constructor(
    private authserv:AuthservicesService,
    
    private router:Router,
    private toast:HotToastService
  ) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginMyForm.get('email');
  }

  get password() {
    return this.loginMyForm.get('password');
  }

  submit() {
    if (!this.loginMyForm.valid) {
      return;
    }

    const { email, password } = this.loginMyForm.value;
    this.authserv.login(email, password).pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error: ({ message }) => `There was an error: ${message} `
      })
    ).subscribe(() => {
      this.router.navigate(['/']);
    
    });

  }

}
