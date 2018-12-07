import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UIModule } from '../ui-module/ui.module';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { UserModule } from '../user-module/user.module';
import { environment } from '../../environments/environment';
import { WebSocketManagerService } from './services/web-socket/web-socket-manager.service';
import { MessageQueueModule } from '../message-queue-module/message-queue.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'Cat Chat',
      disabled: environment.production,
      maxAge: 50
    }),
    UserModule,
    MessageQueueModule,
    UIModule
  ],
  providers: [
    AuthService,
    WebSocketManagerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
