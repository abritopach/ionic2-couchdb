import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ViewPostPage } from '../pages/view-post/view-post';
import { AddPostPage } from '../pages/add-post/add-post';
import { AddCommentPage } from '../pages/add-comment/add-comment';
import { DataService } from '../providers/data-service';
import { PostsService } from '../providers/posts-service';
import { CommentsService } from '../providers/comments-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewPostPage,
    AddPostPage,
    AddCommentPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewPostPage,
    AddPostPage,
    AddCommentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService,
    PostsService,
    CommentsService
  ]
})
export class AppModule {}
