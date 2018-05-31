import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fileToUpload: File = null;
  fileImporting = false;
  selectedItem: any;

  model: string;
  modelChanged: Subject<string> = new Subject<string>();
  results = [];
  importSuccessful = false;

  constructor(private api: ApiService) {
    this.modelChanged
      .debounceTime(300) // wait 300ms after the last event before emitting last event
      .distinctUntilChanged() // only emit if value is different from previous value
      .subscribe(model => {
        this.api.search(model)
          .subscribe(res => {
            this.results = res.results;
            console.log(this.results);
          });
      });
  }

  itemSelect(item) {
    this.selectedItem = item;
    this.results = [];
  }

  changed(text: string) {
    this.modelChanged.next(text);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFile() {
    if (this.fileToUpload) {
      this.fileImporting = true;
      this.api.fileUpload(this.fileToUpload)
        .subscribe(result => {
          if (result.success) {
            alert(result.message);
            this.importSuccessful = true;
          }
          this.fileImporting = false;
        });
    }
  }
}
