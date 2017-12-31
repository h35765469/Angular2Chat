import {Component, ElementRef, OnInit, TemplateRef} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { TalentService} from '../talent.service';
import { HttpService} from '../http.service';
import { Router} from '@angular/router';
import {Talent} from '../shared/talent';
import {Image} from '../shared/image';
import {GeneralService} from '../general.service';
import {FileUploader} from '../file-upload/file-uploader.class';
import {BaseComponent} from '../base/base.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-talent-edit',
  templateUrl: './talent-edit.component.html',
  styleUrls: ['./talent-edit.component.css'],
  providers: [TalentService, HttpService, GeneralService]
})
export class TalentEditComponent extends BaseComponent implements OnInit {
  talent: Talent;
  title: String;
  money: number;
  description: String;
  talent_id: String;
  talent_images: Image[] = [];
  talent_images_data: Image[] = [];
  all_talent_images = [];
  public modalRef: BsModalRef;

  // below are variables to upload picture
  uploader: FileUploader = new FileUploader({url: 'http://1.34.63.239:3001/upload'});
  files_name: String[] = [];


  selectedImage;
  // 0: remote image
  // 1: local image
  selected_image_type = 0;
  main_image;
  main_image_position = 0;

  constructor(
    private elementRef: ElementRef,
    private talent_service: TalentService,
    private http_service: HttpService,
    private general_service: GeneralService,
    private router: Router,
    private activated_route: ActivatedRoute,
    private modalService: BsModalService,
  ) {
    super();
  }

  ngOnInit() {
    this.addScriptTagBySrc('../../assets/js/slides_show_post.js');
    this.talent_id = this.activated_route.snapshot.params['talent_id'];
    this.getTalent();
  }

  getTalent() {
    this.talent_service.getTalent({talent_id: this.talent_id}, (error, response) => {
      if (error) {
        alert(response.message);
      }else {
        if (!response.error) {
          this.talent = response.message;
          this.talent_images = response.message.files_name;
          for (let i = 0; i < this.talent_images.length; i++) {
            if (this.talent_images[i].name === this.talent.main_image) {
              this.talent_images_data.unshift(this.talent_images[i]);
              this.all_talent_images.unshift(this.talent_images[i]);
            }else {
              this.talent_images_data.push(this.talent_images[i]);
              this.all_talent_images.push(this.talent_images[i]);
            }
          }
          this.title = this.talent.title;
          this.money = this.talent.money;
          this.description = this.talent.description;
          this.selectedImage = this.talent_images[0];
        }
      }
    });
  }

  editTalent() {
    const re = /\s|[　]/g;
    if (this.title === '' || this.title === null || re.test(this.title.toString())) {
      alert('標題不能為空');
    }else if (this.money === null) {
      alert('錢不能為空');
    }else if (this.description === '' || this.description === null ||  re.test(this.description.toString())) {
      alert('才能介紹不能為空');
    }else {
      if (this.uploader.queue.length > 0) {
        for (let i = 0 ; i < this.uploader.queue.length ; i++) {
          this.files_name.push(this.uploader.queue[i].random_name);
        }
      }

      this.talent_service.editTalent({
        title: this.title,
        money: this.money,
        description: this.description,
        talent_id: this.talent_id,
        talent_images_data: this.talent_images_data,
        files_name: this.files_name,
        main_image: this.main_image
      }, (error, result) => {
        if (error) {
          alert(result);
        }else {
          if (!result.error) {
            this.router.navigate(['/catalog/']);
          }else {
            alert('編輯失敗');
          }
        }
      });

      if (this.uploader.queue.length > 0) {
        this.uploader.uploadAll() ; // update images
      }
    }
  }

  deleteTalent() {
    this.talent_service.deleteTalent({talent_id: this.talent_id}, (error, result) => {
      if (error) {
        alert(result);
      }else {
        if (!result.error) {
          this.general_service.backPage();
          this.general_service.backPage();
          this.modalRef.hide();
        }else {
          alert('刪除失敗');
        }
      }
    });
  }
  urlSafe(url) {
    return this.general_service.urlSafe(url);
  }

  removeImage() {
    // this.talent_images.splice(this.talent_images.indexOf(talent_image), 1);
    this.all_talent_images.splice(this.all_talent_images.indexOf(this.selectedImage), 1);
    if (this.talent_images_data.indexOf(this.selectedImage) !== -1) {
      this.talent_images_data[this.talent_images_data.indexOf(this.selectedImage)].is_delete = 1;
    }else {
      this.uploader.queue[this.uploader.queue.indexOf(this.selectedImage)].remove();
    }
    this.navigate(true);
    if (this.all_talent_images.length === 0) {
      this.selectedImage = null;
    }
  }

  public addScriptTagBySrc(src) {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    this.elementRef.nativeElement.appendChild(s);
  }


  public openDeleteTalentModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // for slide show
  navigate(forward) {
    const index = this.all_talent_images.indexOf(this.selectedImage) + (forward ? 1 : -1);
    if (index >= 0 && index < this.all_talent_images.length) {
      this.selectedImage = this.all_talent_images[index];
    }

    if (this.talent_images_data.indexOf(this.selectedImage) !== -1) {
      this.selected_image_type = 0;
    }else {
      this.selected_image_type = 1;
    }

  }

  public addNewImages() {
    this.all_talent_images.length = 0;
    for (let i = 0 ; i < this.talent_images_data.length ; i++) {
      this.all_talent_images.push(this.talent_images_data[i]);
    }
    for (let i = 0 ; i < this.uploader.queue.length ; i++) {
      this.all_talent_images.push(this.uploader.queue[i]);
    }
  }

  setMainImagePosition() {
    if (this.talent_images_data.indexOf(this.selectedImage) !== -1) {
      this.main_image = this.selectedImage.name;
    }else {
      this.main_image = this.selectedImage.random_name;
    }
    this.main_image_position = this.all_talent_images.indexOf(this.selectedImage);
  }

}
