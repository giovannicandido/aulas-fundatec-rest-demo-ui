import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { map } from "rxjs/operators"
import { Pessoa } from "./pessoa.model";

@Injectable()
export class PessoaService {
  private API_URL: string = "http://localhost:8080/api/pessoa"

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API_URL)
  }

  postNew(pessoa: Pessoa): Observable<number> {
    return this.http.post(this.API_URL, pessoa, {observe: 'response'})
      .pipe(map(response => response.status));
  }

  updatePessoa(id: number, pessoa: Pessoa): Observable<number> {
    return this.http.put(`${this.API_URL}/${id}`, pessoa, {observe: 'response'})
      .pipe(map(response => response.status));
  }

  deletePessoa(id: number): Observable<number> {
    return this.http.delete(`${this.API_URL}/${id}`, {observe: 'response'})
      .pipe(
        map(response => response.status),
        catchError(error => {
          return of(error.status)
        })
      );

  }
}
