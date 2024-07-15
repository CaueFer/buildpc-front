import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Dbservice {
  //private baseUrl = 'http://localhost:3000/api';
  private baseUrl = 'https://buildpc-backend-production.up.railway.app/api';

  constructor(private http: HttpClient) {}

  getAllCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categorias`).pipe(
      catchError((err) => {
        console.error('Ocorreu um erro:', err);
        throw err;
      })
    );
  }

  addCategoria(newCat: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/categorias`, newCat).pipe(
      catchError((err) => {
        console.error('Ocorreu um erro:', err);
        throw err;
      })
    );
  }

  editCategoria(id: any, categoriaData: any): Observable<any[]> {
    console.log(id, categoriaData);
    return this.http
      .put<any[]>(`${this.baseUrl}/categorias/${id}`, categoriaData)
      .pipe(
        catchError((err) => {
          console.error('Ocorreu um erro:', err);
          throw err;
        })
      );
  }

  removeCategoria(id: any): Observable<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/categorias/${id}`).pipe(
      catchError((err) => {
        console.error('Ocorreu um erro:', err);
        throw err;
      })
    );
  }

  // COMPONENTES
  getAllComponentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/componentes`).pipe(
      catchError((err) => {
        console.error('Ocorreu um erro:', err);
        throw err;
      })
    );
  }

  addComponente(newComp: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/componentes`, newComp).pipe(
      catchError((err) => {
        console.error('Ocorreu um erro:', err);
        throw err;
      })
    );
  }

  editComponente(id: any, componenteData: any): Observable<any[]> {
    console.log(id, componenteData);
    return this.http
      .put<any[]>(`${this.baseUrl}/componentes/${id}`, componenteData)
      .pipe(
        catchError((err) => {
          console.error('Ocorreu um erro:', err);
          throw err;
        })
      );
  }

  removeComponente(id: any): Observable<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/componentes/${id}`).pipe(
      catchError((err) => {
        console.error('Ocorreu um erro:', err);
        throw err;
      })
    );
  }


  // EQUIPAMENTOS
  getAllEquipamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/equipamentos`).pipe(
      catchError((err) => {
        console.error('Ocorreu um erro:', err);
        throw err;
      })
    );
  }

  addEquipamento(newEquip: any): Observable<any[]> {

    console.log(newEquip)
    return this.http.post<any[]>(`${this.baseUrl}/equipamentos`, newEquip).pipe(
      catchError((err) => {
        console.error('Ocorreu um erro:', err);
        throw err;
      })
    );
  }

  editEquipamento(id: any, equipamentoData: any): Observable<any[]> {
    console.log(id, equipamentoData);
    return this.http
      .put<any[]>(`${this.baseUrl}/equipamentos/${id}`, equipamentoData)
      .pipe(
        catchError((err) => {
          console.error('Ocorreu um erro:', err);
          throw err;
        })
      );
  }

  removeEquipamento(id: any): Observable<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/equipamentos/${id}`).pipe(
      catchError((err) => {
        console.error('Ocorreu um erro:', err);
        throw err;
      })
    );
  }

}
