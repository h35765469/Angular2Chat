import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { appRouting } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CatalogComponent } from './catalog/catalog.component';
import { TalentPostComponent } from './talent-post/talent-post.component';
import { MyDataComponent } from './my-data/my-data.component';
import { TalentPreviewComponent } from './talent-preview/talent-preview.component';

import { TalentEditComponent } from './talent-edit/talent-edit.component';
import { TalentRateComponent } from './talent-rate/talent-rate.component';
import { FacebookloginComponent } from './facebooklogin/facebooklogin.component';
import {FileUploadModule} from './file-upload/file-upload.module';
import { ChatRoomComponent } from './chat-room/chat-room.component';
// RECOMMENDED (doesn't work with system.js)
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { BaseComponent } from './base/base.component';
import { ScriptHackComponent } from './script-hack/script-hack.component';
import { OtherDataComponent } from './other-data/other-data.component';
import { SearchCatalogResultComponent } from './search-catalog-result/search-catalog-result.component';
import {ChartsModule} from "ng2-charts";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {LoadingModule} from "ngx-loading";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    CatalogComponent,
    TalentPostComponent,
    MyDataComponent,
    TalentPreviewComponent,
    TalentEditComponent,
    TalentRateComponent,
    FacebookloginComponent,
    ChatRoomComponent,
    ChatHistoryComponent,
    BaseComponent,
    ScriptHackComponent,
    OtherDataComponent,
    SearchCatalogResultComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    ChartsModule,
    InfiniteScrollModule,
    LoadingModule,
    ModalModule.forRoot(),
    appRouting,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
