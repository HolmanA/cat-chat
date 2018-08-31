import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { UserHttpService } from './services/user.service';
import { UserState } from './store/user.state';

@NgModule({
  imports: [
    HttpClientModule,
    NgxsModule.forFeature([
      UserState
    ]),
  ],
  providers: [
    UserHttpService
  ]
})
export class UserModule { }
