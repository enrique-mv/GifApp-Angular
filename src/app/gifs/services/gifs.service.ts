import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'ATNMr8J64QkaPjiKEEyl0kjEXi3rKfOk';
  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = []

  get historial() {
    return [...this._historial]
  }

  constructor(private http: HttpClient) {

    // OPCION #1
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];


  }

  buscarGifs(query: string): void {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '12')
      .set('q', query);



    this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search`, { params:params })
      .subscribe((resp: SearchGifsResponse) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })

  }


  // async buscarGifs(query: string) {

  //   query = query.trim().toLowerCase();

  //   if (!this._historial.includes(query)) {
  //     this._historial.unshift(query);
  //     this._historial = this._historial.splice(0, 10);
  //   }


  //   const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=ATNMr8J64QkaPjiKEEyl0kjEXi3rKfOk&q=dragon ball z&limit=10');
  //   const data = await resp.json();
  //   console.log(data);

  // }






}
