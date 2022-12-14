import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

user: User = new User
confirmSenha: string
tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

confirmarSenha(event: any){
  this.confirmSenha = event.target.value
}

tipoUser(event: any){
  this.tipoUsuario = event.target.value
}


cadastrar(){

    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmSenha){
      this.alertas.showAlertInfo("Senhas Incorretas!")
    }

    else {this.authService.cadastrar(this.user).subscribe((resp: User)=>{
      this.user = resp
      this.router.navigate(['/entrar'])
      this.alertas.showAlertSuccess("Usuário cadastrado com Sucesso!")
      })
    }
}

}
