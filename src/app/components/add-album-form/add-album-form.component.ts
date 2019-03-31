import { Component, OnInit, ViewChild } from '@angular/core';
import {AlbumsService} from "../../services/albums.service";
import {AlbumEventsService} from "../../services/album-events.service";
import {Album} from "../../interfaces/Album";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-add-album-form',
  templateUrl: './add-album-form.component.html',
  styleUrls: ['./add-album-form.component.css']
})
export class AddAlbumFormComponent implements OnInit {
  album = {
    title: '',
    id: 0
  };

  //декоратор @ViewChild позволяет при необходимости "забрать" из разметки
  //локальную переменную ('addAlbumForm') и сохранить ее в свойство (form),
  @ViewChild('addAlbumForm') form: NgForm;
 
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService
  ) { }

  ngOnInit() {
    //подписываемся на оповещение о событии "клик на Edit", которое будет приходить с сервиса albumEvents
    this.albumEvents.clickButtonEditEventObservableSubject.subscribe((data: Album) => {
      if(data.title) console.log(data);
       if (data.title){
          this.album.title = data.title;
          this.album.id = data.id;
          document.getElementById('submit').textContent = 'Edit';
          document.querySelector('.card-title').textContent = 'Edit album';
       } 
    });


    //подписываемся на оповещение о событии "клик на Chancel", которое будет приходить с сервиса albumEvents
    this.albumEvents.clickButtonChancelEventObservableSubject.subscribe(() => {
       document.getElementById('submit').textContent = 'Submit';
       document.querySelector('.card-title').textContent = 'Add new album';
       this.form.resetForm();
    });
  }

  //обработчик submit формы

  onFormSubmit() {
      const newAlbum = {
        userId: 1,
        title: this.album.title,
        id: this.album.id
      };
      if (document.getElementById('submit').textContent !== 'Edit') {
        
      this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
        this.albumEvents.emitAddNewAlbum(data);
        this.form.resetForm();
      })} else {
          this.albumService.editAlbum(newAlbum).subscribe((data: Album) => {
            console.log(data);
            this.albumEvents.emitEditAlbum(data);
            this.form.resetForm();
            document.getElementById('submit').textContent = 'Submit';
            document.querySelector('.card-title').textContent = 'Add new album';
          })
      }
  }

}




