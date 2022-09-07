import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserDetails } from 'src/app/model/userDetails';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/store/dealer-store/action';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordType: string = "password";
  errorMsg: string = "";
  submitted: boolean = false;
  otpFormSubmitted: boolean = false;
  validateOtpFormSubmitted: boolean = false;
  isForgotPasswordClicked: boolean = true;
  sendOtpClicked: boolean = false;
  resetPasswordClicked: boolean = false;
  receivedOtp: number = 0;
  userDetails: UserDetails = new UserDetails();

  constructor(private userService: UserService, private router: Router, private store: Store, private authService: AuthenticationService, private cookies: CookieService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    mailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
  }
  );

  otpForm = new FormGroup({
    mailId: new FormControl('', [Validators.required, Validators.email]),
  }
  );

  validateOtpForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')]),
    otpEntered: new FormControl(0, [Validators.required]),
  }
  );

  get form() {
    return this.loginForm.controls;
  }

  get otpFormCon() {
    return this.otpForm.controls;
  }

  get validateOtpFormCon() {
    return this.validateOtpForm.controls;
  }

  onChange(e: any) {
    if (e.target.checked == true) {
      this.passwordType = "text"
    } else {
      this.passwordType = "password"
    }
  }

  getUserDetails() {
    this.userService.getUser(this.loginForm.value.mailId).subscribe({
      next: (data: any) => { this.userDetails = data, this.validateLogin() }
    })
  }

  validateLogin() {
    if ((this.userDetails.mailId == this.loginForm.value.mailId) && (this.userDetails.password == this.loginForm.value.password)) {
      this.errorMsg = ""
      this.store.dispatch(user(this.userDetails))
      const requestBody = { userId: this.userDetails.userId, userRole: this.userDetails.role, mailId: this.userDetails.mailId }
      this.authService.generateToken(requestBody).subscribe({
        next: (data: any) => {
          const parsedData = JSON.parse(data)
          this.cookies.set('jwt_token', parsedData.JWT, { expires: 3 })
          alert("User Logged in successfully")
          this.gotoDashBoard()
        }
      })

    } else {
      this.errorMsg = "Wrong Login Credentials"
    }
  }

  onSubmit() {
    if (this.loginForm.value.mailId != "" && this.loginForm.value.password != "") {
      this.submitted = true
      this.getUserDetails()
    } else {
      this.errorMsg = "Enter the credentials to login"
    }

  }

  sendOtp() {
    this.otpFormSubmitted = true;
    if (this.otpForm.valid) {
      this.userService.getOtp(this.otpForm.value.mailId).subscribe({
        next: (data: number) => { this.receivedOtp = data, this.errorMsg="", this.sendOtpClicked = false, this.isForgotPasswordClicked = false, this.resetPasswordClicked = true },
        error: (err: any) => { this.errorMsg = err.error, console.log(err) }
      })
    }

  }
  onResetPassword() {
    if (this.validateOtpForm.valid) {
      if (this.validateOtpForm.value.password === this.validateOtpForm.value.confirmPassword) {
        if (this.validateOtpForm.value.otpEntered === this.receivedOtp) {
          this.userService.resetPassword(this.validateOtpForm.value.confirmPassword, this.otpForm.value.mailId, "value").subscribe(
            {
              next: (data: any) => {
                if (data != null) {
                  alert("Password Reset Sucessfully");
                  this.sendOtpClicked = false;
                  this.isForgotPasswordClicked = true;
                  this.resetPasswordClicked = false;
                }
              }
            }
          )
        } else {
          alert("Entered OTP is wrong. Kindly check and Re-Enter")
        }
      }
    } else {
      alert("Entered details are invalid")
    }

  }
  forgotPassword() {
    this.isForgotPasswordClicked = false;
    this.resetPasswordClicked = false;
    this.sendOtpClicked = true;
  }
  backToLogin() {
    this.isForgotPasswordClicked = true;
    this.resetPasswordClicked = false;
    this.sendOtpClicked = false;
  }

  gotoDashBoard() {
    this.router.navigate(['/dealer']);
  }


}
