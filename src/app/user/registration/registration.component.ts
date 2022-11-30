import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { tap } from 'rxjs';
import { UserModel } from '../dashboard/user-profile/user.model';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  authId: string | null | undefined = "";

  form = new FormGroup({ 
    firstName: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z]+')]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z]+')])
  });

  constructor(
    private readonly api: RegistrationService,
    public auth: AuthService,
    private readonly router: Router
    ) {}

  ngOnInit(): void {
    this.auth.user$.pipe(
      tap((user: any) => this.authId = user.sub)
    )
    .subscribe();
  }

  submit() {
    this.api.registerUser(this.form).pipe(
      tap({
        next: () => this.router.navigateByUrl('/user/dashboard'),
        error: error => console.log(error)})
    ).subscribe();
  }

}
