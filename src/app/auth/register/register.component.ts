import {Component, OnInit} from '@angular/core';
import {Personne} from '../../models/personne.model';
import {User} from '../../models/user.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonneValidators} from '../../personnes/personne.validators';
import {FileInput, FileValidator} from 'ngx-material-file-input';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  error: any;

  personne: Personne = new Personne(-1, '', '', '', false, '', '', new User(-1, '', '', []));

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {invalid: true};
    }
  }

  createForm() {
    this.registerForm = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
      prenom: new FormControl('', [Validators.required, Validators.minLength(4)]),
      pseudo: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pwd: new FormGroup({
          password: new FormControl(undefined, [Validators.required, Validators.minLength(4)]),
          confirmPassword: new FormControl(undefined)
        }, [this.passwordConfirming]
      ),
    });
  }

  get nom() {
    return this.registerForm.get('nom');
  }

  get prenom() {
    return this.registerForm.get('prenom');
  }

  get pseudo() {
    return this.registerForm.get('pseudo');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('pwd.password');
  }

  get confirmPassword() {
    return this.registerForm.get('pwd.confirmPassword');
  }


  onSubmit() {
    this.personne.nom = this.nom.value;
    this.personne.prenom = this.prenom.value;
    this.personne.pseudo = this.pseudo.value;
    this.personne.user.email = this.email.value;
    this.personne.user.name = `${this.personne.prenom} ${this.personne.nom}`;
    const pwd = this.password.value;

    this.authService.onRegister({personne: this.personne, pwd: this.password.value})
      .subscribe(data => {
          this.router.navigate(['/']);
        },
        error => {
          console.log('erreur en retour : ', error);
          this.error = error;
          this.loading = false;
        });
  }
}
