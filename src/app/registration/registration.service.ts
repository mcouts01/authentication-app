import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { UserModel } from "../user/user.store";

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    constructor(private readonly http: HttpClient) {}

    registerUser(user: FormGroup): Observable<UserModel> {
        return <Observable<UserModel>>this.http.post('http://localhost:8080/user/', user.value);
    }
}