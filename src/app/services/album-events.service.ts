import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import {Album} from "../interfaces/Album";

@Injectable({
  providedIn: 'root'
})
export class AlbumEventsService {

  //BehaviorSubject({}) - это "источник" для генерации оповещений о произошедшем
  //в какой-нибудь компоненте событии. На BehaviorSubject({}) можно подписаться как на обычный
  // Observable (через subscribe), так и отдельно (не внутри него) вызвать метод next,
  //заэммитив тем самым нужное событие, находясь за пределами BehaviorSubject.
  //У обычного Observable метод next у observer можно вызвать только изнутри (как в промисах) 
  private albumAddEventSource = new BehaviorSubject({});
  private albumDeleteEventSource = new BehaviorSubject({});
  private albumEditEventSource = new BehaviorSubject({});
  private clickButtonEditEventSource = new BehaviorSubject({});
  private clickButtonChancelEventSource = new BehaviorSubject({});
  // Т.к. метод next для albumAddEventSource за пределами этого сервиса недоступен
  //для того, чтобы любая компонента могла извне подписаться на BehaviorSubject({})
  //методом subscribe, создаем новое публичное свойство, вызвав у BehaviorSubject({})
  //метод asObservable(), т.е использовать его как обычный наблюдаемый объект (observable)
  public  albumAddEventObservableSubject = this.albumAddEventSource.asObservable();
  public  albumDeleteEventObservableSubject = this.albumDeleteEventSource.asObservable();
  public  albumEditEventObservableSubject = this.albumEditEventSource.asObservable();
  public  clickButtonEditEventObservableSubject = this.clickButtonEditEventSource.asObservable();
  public  clickButtonChancelEventObservableSubject = this.clickButtonChancelEventSource.asObservable();
  constructor() {}

//реализуем несколько методов, которые будут распространять (эмитить) события 
//добавления, удаления, редактирования альбома. Оповещая тем самым об этом другие
//подписанные на эти оповещения компоненты. Компоненты могут полученные данные
//передать в другие (неважно где находящиеся) компоненты или просто как-нибудь
//отреагировать на произошедшее событие

//метод распространит событие "добавления альбома"
  emitAddNewAlbum(value: Album) {
    this.albumAddEventSource.next(value);
  }

  //метод распространит событие "удаление альбома"
  emitDeleteAlbum(value: number) {
    this.albumDeleteEventSource.next(value);
  }

  //метод распространит событие "редактирование альбома"
  emitEditAlbum(value: Album) {
    console.log(value);
    this.albumEditEventSource.next(value);
  }

  //метод оповестит о клике на Edit
  emitClickButtonEditAlbum(value: Album) {
    console.log(value);
    this.clickButtonEditEventSource.next(value);
  }

  //метод оповестит о клике на Chancel
  emitClickButtonChancelEditAlbum(value: Album) {
    //console.log(value);
    this.clickButtonChancelEventSource.next(value);
  }
}


