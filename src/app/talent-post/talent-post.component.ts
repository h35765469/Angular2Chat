import {Component, ElementRef, OnInit} from '@angular/core';
import { TalentService } from '../talent.service';
import { HttpService} from '../http.service';
import { Router } from '@angular/router';
import {FileUploader} from '../file-upload/file-uploader.class';
import {BaseComponent} from "../base/base.component";
import {GeneralService} from "../general.service";

@Component({
  selector: 'app-talent-post',
  templateUrl: './talent-post.component.html',
  styleUrls: ['./talent-post.component.css'],
  providers: [HttpService, TalentService]
})
export class TalentPostComponent extends BaseComponent implements OnInit {
  files_name: String[] = [];
  title: string = '';
  money: number = 0;
  description: string = '';
  uploader: FileUploader = new FileUploader({url: 'http://1.34.63.239:3001/upload'});
  selectedImage;
  main_image_position = 0;
  current_image_position = 0;

  constructor(
    private elementRef: ElementRef,
    private talent_service: TalentService,
    private general_service: GeneralService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
  }
  // post new talent
  postTalent() {
    const re = /\s|[　]/g; // check user click white space
    if (this.title === '' || this.title === null || re.test(this.title)) {
      alert('標題不能為空');
      return;
    }
    if (this.money === null) {
      alert('錢不能為空');
      return;
    }
    if (this.description === '' || this.description === null || re.test(this.description)) {
      alert('才能介紹不能為空');
      return;
    }
    if (!this.uploader.getNotUploadedItems().length) {
      alert('請選擇圖片');
      return;
    }

    for (let i = 0 ; i < this.uploader.queue.length ; i++) {
      this.files_name.push(this.uploader.queue[i].random_name);
    }
    this.talent_service.postTalent({
      title : this.title,
      money : this.money,
      description : this.description,
      files_name: this.files_name,
      user_id : localStorage.getItem('user_id'),
      main_image_position: this.main_image_position,
    }, (error , result) => {
      if (error) {
        alert(result);
      }else {
        if (!result.error) {
          this.general_service.backPage();
        }else {
          alert('上傳才能失敗');
        }
      }
    });
    this.uploader.uploadAll() ; // update images
  }

  // for slide show
  navigate(forward) {
    const index = this.uploader.queue.indexOf(this.selectedImage) + (forward ? 1 : -1);
    if (index >= 0 && index < this.uploader.queue.length) {
      this.selectedImage = this.uploader.queue[index];
    }
  }

  deleteImagePreview() {
    if (this.uploader.queue.length > 0) {
      this.selectedImage.remove();
      this.navigate(1);
      if (this.uploader.queue.length === 0) {
        this.selectedImage = null;
      }
    }else {
      this.selectedImage = null;
    }
  }
  setMainImagePosition() {
    const index = this.uploader.queue.indexOf(this.selectedImage);
    this.main_image_position = index;
  }
  setCurrentImagePosition() {
    const index = this.uploader.queue.indexOf(this.selectedImage);
    this.current_image_position = index;
  }
}
