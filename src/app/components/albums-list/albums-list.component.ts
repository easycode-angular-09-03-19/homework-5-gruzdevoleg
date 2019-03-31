import { Component, OnInit, Input } from '@angular/core';
//импортируем нужные сервисы
import { AlbumsService } from '../../services/albums.service';
import { AlbumEventsService } from "../../services/album-events.service";
import { AlertMessageService } from "../../services/alert-message.service";
//импортируем нужные интерфейсы
import { Album } from "../../interfaces/Album";
@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {
  //перед конструктором принято объявлять внутренние свойства данной компоненты
  albums: Album[] = [];
@Input() item: Album;
  constructor(
    //в конструкторе компоненты регистрируем необходимые сторонние сервисы
    //которые будем дергать (как публичные свойства)
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService,
    public alertMessage: AlertMessageService
  ) { }

  ngOnInit() {
    //в  ngOnInit дергаем методы сервисов  
    //также в  ngOnInit работаем с внутренними свойства

    //"дергаем" метод getAlbums() у сервиса albumService и подписываемся на Observable,
    // возвращаемый методом getAlbums() 
    //вызываем у Observable метод subscribe, передавая ему три колбэка
    //- который выполнится, если данные будут получены
    //- который выполнится, если придет ошибка
    //- который выполнится, на complete (завершение запроса)
    this.albumService.getAlbums().subscribe((data: Album[]) => {
      this.albums = data;
      console.log(data);
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('complete');
    });

    //подписываемся на оповещение о событии "добавление нового альбома", которые будут приходить с сервиса albumEvents
    this.albumEvents.albumAddEventObservableSubject.subscribe((data: Album) => {
      if (data.title) {
        this.albums.unshift(data);
        this.alertMessage.emitMessage(`Альбом успешно добавлен`);
      }
    });

    //подписываемся на оповещение о событии "удаление альбома", которое будут приходить с сервиса albumEvents
    //и отфильтруем массив альбомов, оставив те альбомы, чей id не совпадает с id удаляемого альбома
    this.albumEvents.albumDeleteEventObservableSubject.subscribe((data: number) => {
      this.albums = this.albums.filter((item) => {
          return data !== item.id;
        });
      this.alertMessage.emitMessage(`Альбом успешно удален`);
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('complete');
    });


    //подписываемся на оповещение о событии "редактирование альбома", которое будут приходить с сервиса albumEvents
    //найдем в списке редактированный альбом и заменим title на новый полученный 
    this.albumEvents.albumEditEventObservableSubject.subscribe((data: Album) => {
      //найти в списке редактированный альбом и заменить title
    for (let i = 0; i <  this.albums.length; i++) {
      if (this.albums[i].id == data.id) {
        this.albums[i].title = data.title;
      }
    }
    this.alertMessage.emitMessage(`Альбом успешно отредактирован`);
    


     /*this.albums.some((item) => {
          return data.id == item.id;
        });*/



      
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('complete');
    });

    
  } //ngOnInit()

  //далее идут методы, обработчики событий и т д
  //....


}
