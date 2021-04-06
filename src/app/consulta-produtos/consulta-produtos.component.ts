import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-consulta-produtos',
  templateUrl: './consulta-produtos.component.html',
  styleUrls: ['./consulta-produtos.component.css']
})
export class ConsultaProdutosComponent implements OnInit {

  listagemProduto = [];

  produto = {
    idProduto : 0,
    nome : '',
    descricao : '',
    quantidade : 0,
    preco : 0.0
  }

  mensagem = '';

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.consultarProdutos();
  }

  consultarProdutos() : void {

    this.httpClient.get(environment.apiUrl + "/produtos")
      .subscribe(
        (data:any[]) => {
          this.listagemProduto = data;
        },
        (e) => {
          console.log(e);
        }
      );

  }

  obterProduto(idProduto) : void {

    this.httpClient.get(environment.apiUrl + "/produtos/" + idProduto)
      .subscribe(
        (data:any) => {
          this.mensagem = '';
          this.produto = data;
        },
        (e) => {
          console.log(e);
        }
      );

  }

  excluirProduto(idProduto) : void {
    this.httpClient.delete(environment.apiUrl + "/produtos/" + idProduto)
      .subscribe(
        (data:any) => {
          this.consultarProdutos();
          this.mensagem = data.mensagem;
        },
        (e) => {
          console.log(e);
        }
      );
  }
  
  atualizarProduto(produto) : void {
    this.httpClient.put(environment.apiUrl + "/produtos", produto)
      .subscribe(
        (data:any) => {
          this.mensagem = data.mensagem;
          this.consultarProdutos();
        },
        (e) => {
          console.log(e);
        }
      );
  }

}
