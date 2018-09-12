import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UIModule } from '../ui-module/ui.module';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { WebSocketModule } from '../web-socket-module/web-socket.module';
import { UserModule } from '../user-module/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    WebSocketModule,
    UserModule,
    UIModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
