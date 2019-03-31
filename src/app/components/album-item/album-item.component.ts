import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import {AlbumEventsService} from "../../services/album-events.service";
import {Album} from "../../interfaces/Album";

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent implements OnInit {
  @Input() item: Album;
  isEditButtonHide = false;
  isChancelButtonHide = true;
  constructor(
  	public albumService: AlbumsService,
  	public albumEvents: AlbumEventsService
  ) {}

  ngOnInit() {

    //подписываемся на оповещение о событии "редактирование альбома", которое будут приходить с сервиса albumEvents
    //заменим кнопку chancell на edit 
    this.albumEvents.albumEditEventObservableSubject.subscribe((data: Album) => {
      if (data.title) {
        this.isEditButtonHide = false;
        this.isChancelButtonHide = true;
      }
      }, (err) => {
        console.log(err);
      }, () => {
        console.log('complete');
      });
  }

//обработчик клика на кнопку Delete дернет метод deleteAlbum()
//у сервиса albumService. Подпишемся на возвращаемый observable с помощью метода subscribe,
//и передадим в subscribe обработчик, который сработает при успешном ответе сервера. В обработчике 
//вызовем метод emitDeleteNewAlbum из сервиса albumEvents, который сообщит
//о событии "удаление альбома" всему приложению
  onDeleteAlbumClickHandler() {
  	this.albumService.deleteAlbum(this.item.id).subscribe((data: number) => {
      this.albumEvents.emitDeleteAlbum(data);
  	});
  }

//обработчик клика на кнопку Edit
  onEditAlbumClickHandler() {
    this.albumEvents.emitClickButtonEditAlbum(this.item);
    this.isEditButtonHide = !this.isEditButtonHide;
    if (this.isChancelButtonHide === true)
      this.isChancelButtonHide = !this.isChancelButtonHide;
  }

//обработчик клика на кнопку Chancel
  onChancelEditAlbumClickHandler() {
    this.albumEvents.emitClickButtonChancelEditAlbum(this.item);
    this.isEditButtonHide = !this.isEditButtonHide;
    this.isChancelButtonHide = !this.isChancelButtonHide;
    
  }
}
 