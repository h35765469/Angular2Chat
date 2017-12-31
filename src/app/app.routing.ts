import { ModuleWithProviders } from '@angular/core';

import { Routes , RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CatalogComponent } from './catalog/catalog.component';
import { TalentPostComponent} from './talent-post/talent-post.component';
import { MyDataComponent} from './my-data/my-data.component';
import { TalentPreviewComponent } from './talent-preview/talent-preview.component';
import {TalentRateComponent} from './talent-rate/talent-rate.component';
import {FacebookloginComponent} from './facebooklogin/facebooklogin.component';
import {TalentEditComponent} from './talent-edit/talent-edit.component';
import {ChatRoomComponent} from './chat-room/chat-room.component';
import {ChatHistoryComponent} from './chat-history/chat-history.component';
import {OtherDataComponent} from './other-data/other-data.component';
import {SearchCatalogResultComponent} from './search-catalog-result/search-catalog-result.component';



const appRoutes: Routes = [
  { path : '', component : CatalogComponent},
  // { path : '', component : FacebookloginComponent},
  { path : 'home', component : HomeComponent},
  { path : 'home/:userid', component : HomeComponent},
  { path : 'catalog', component : CatalogComponent},
  { path : 'talentPost', component : TalentPostComponent},
  { path : 'myData', component : MyDataComponent},
  { path : 'otherData/:user_id', component : OtherDataComponent},
  { path : 'talent/:talent_id', component : TalentPreviewComponent},
  { path : 'talentEdit/:talent_id', component : TalentEditComponent},
  { path : 'talentRate/:talent_id', component : TalentRateComponent},
  { path : 'facebooklogin', component : FacebookloginComponent},
  { path : 'chatRoom/:to_user_id', component : ChatRoomComponent},
  { path : 'chatHistory', component: ChatHistoryComponent},
  { path : 'searchCatalogResult/:search_word', component: SearchCatalogResultComponent},
  { path : '**' , component : NotFoundComponent},
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);

