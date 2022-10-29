import { Component, OnInit } from '@angular/core';
import { Pessoa } from "./pessoa/pessoa.model";
import { PessoaService } from "./pessoa/pessoa.service";
import { catchError, Observable, of } from "rxjs";
import { ConfirmationService, MessageService, PrimeNGConfig } from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pessoas: Pessoa[] = [];
  submitted = false;
  pessoa: Pessoa = {};
  selectedPessoa: Pessoa | null = null;
  pessoaDialog = false

  constructor(private pessoaService: PessoaService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.loadPessoas()
  }

  openNew() {
    this.pessoa = {}
    this.submitted = false
    this.pessoaDialog = true
  }

  openEdit() {
    this.pessoa = this.selectedPessoa!
    console.debug(this.selectedPessoa)
    this.submitted = false
    this.pessoaDialog = true
  }

  deleteSelectedPessoa() {
    if (this.selectedPessoa) {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja deletar a pessoa?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          this.pessoaService.deletePessoa(this.selectedPessoa!.id!)
            .subscribe(status => {
              if (status == 200) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Pessoa deletada',
                  life: 3000
                });
                this.loadPessoas()
              } else {
                this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao remover pessoa'})
              }

            })
          this.selectedPessoa = null;

        }

      });
    } else {
      this.messageService.add({severity: 'warn', summary: 'Selecione', detail: 'Por favor selecione um registro'})
    }
  }

  loadPessoas() {
    this.pessoaService.getAll()
      .pipe(
        catchError(error => {
          this.messageService.add({severity: 'error', detail: 'Erro ao listar pessoas'})
          return of([])
        })
      )
      .subscribe(p => this.pessoas = p);
  }


  savePessoa() {
    this.submitted = true
    if(this.pessoa.nome == null || this.pessoa.nome?.trim() == "") {
      return;
    }

    if(this.pessoa.id) {
      this.putPessoa()
    }else {
      this.postPessoa()
    }

  }

  postPessoa() {
    this.pessoaService.postNew(this.pessoa)
      .subscribe(status => {
        if(status == 200 || status == 201) {
          this.messageService.add({severity: 'info', detail: 'Pessoa salva com sucesso'})
          this.loadPessoas()
          this.hideDialog()
        } else {
          this.messageService.add({severity: 'error', detail: 'Erro ao salvar pessoa'})
        }
      })
  }

  putPessoa() {
    this.pessoaService.updatePessoa(this.pessoa.id!, this.pessoa)
      .subscribe(status => {
        if(status == 200 || status == 201) {
          this.messageService.add({severity: 'info', detail: 'Pessoa salva com sucesso'})
          this.loadPessoas()
          this.hideDialog()
        } else {
          this.messageService.add({severity: 'error', detail: 'Erro ao salvar pessoa'})
        }
      })
  }

  hideDialog() {
    this.pessoa = {}
    this.pessoaDialog = false;
  }
}
