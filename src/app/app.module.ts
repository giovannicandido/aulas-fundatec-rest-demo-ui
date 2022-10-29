import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { TableModule } from 'primeng/table'

import { AppComponent } from './app.component';
import { PessoaService } from "./pessoa/pessoa.service";
import { HttpClientModule } from "@angular/common/http";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
registerLocaleData(ptBr)
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    CalendarModule,
    DialogModule,
    InputTextModule

  ],
  providers: [PessoaService, { provide: LOCALE_ID, useValue: 'pt-BR' }, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
