import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LikeMessageHttpService } from './services/like-message.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    LikeMessageHttpService
  ]
})
export class LikeMessageModule { }
