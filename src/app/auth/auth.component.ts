import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { PlaceholderComponent } from "./placeholder/placeholder.component";


@Component({
    standalone: true,
    imports: [CommonModule ,LoginComponent, RegisterComponent, PlaceholderComponent],
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent {
    loginMode : boolean = false;
    isLoading : boolean = false;

    logToggle() {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
            this.loginMode = !this.loginMode;
        }, 500);
    }
    

}