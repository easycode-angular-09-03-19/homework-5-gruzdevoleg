import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//все сгенерированные компоненты автоматически импортятся в основной модуль
import { AppComponent } from './app.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { HttpClientModule } from "@angular/common/http";
import { AlbumItemComponent } from './components/album-item/album-item.component';
import { AddAlbumFormComponent } from './components/add-album-form/add-album-form.component';
import { FormsModule } from "@angular/forms";
import { AlertMessageComponent } from './components/alert-message/alert-message.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsListComponent,
    AlbumItemComponent,
    AddAlbumFormComponent,
    AlertMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,//модуль для запросов на сервер (будем использовать в сервисах)
    FormsModule//модуль для работы с формами (базовой валидацией, директивой ngForm для 2стор.привязки)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
