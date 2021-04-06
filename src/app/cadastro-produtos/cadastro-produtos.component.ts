import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent implements OnInit {

  mensagem : string;

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  cadastrarProduto(formCadastro) : void {

    this.httpClient.post(environment.apiUrl + "/produtos", formCadastro.form.value)
      .subscribe(
        (data:any) => {
          this.mensagem = data.mensagem;
          formCadastro.form.reset();
        },
        (e) => {
          console.log(e);
        }
      );

  }

}
