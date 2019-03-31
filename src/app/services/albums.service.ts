//импортируем нужные декораторы и интерфейсы
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Album } from "../interfaces/Album";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient//HttpClient - это тоже сервис (интерфейс) с набором методов для http запросов
  ) { }

//метод для запроса массива альбомов (json распарсится автоматически)
  getAlbums(): Observable<Album[]> {
    //вызываем у this.http метод get
    return this.http.get<Album[]>(`${this.apiUrl}/albums`);//вернет Observable с массивом альбомов, на который мы подпишемся
    //в компоненте albums-list
  }

//метод для добавления нового альбома (stringify выполнится автоматически)
  addNewAlbum(value: Album) {
  	console.log(this.http.post(`${this.apiUrl}/albums`, value));
    return this.http.post(`${this.apiUrl}/albums`, value);//вернет Observable с альбомом, на который мы подпишемся
    //в компоненте формы
  }

//метод для удаления альбома
//вернет Observable на который мы подпишемся в компоненте album-item
  deleteAlbum(id: number) {
  	 	return new Observable( (observer) => {
    		this.http.delete(`${this.apiUrl}/albums/${id}`);
    		observer.next(id);
  		});
	}

//метод для редактирования альбома
//вернет Observable на который мы подпишемся в компоненте формы
  editAlbum(album: Album) {
      return new Observable( (observer) => {
        this.http.put(`${this.apiUrl}/albums/${album.id}`, album);
        observer.next(album);
      });
  }
}
