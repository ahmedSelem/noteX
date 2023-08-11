import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private _toasterService : ToastrService) { }

  showToastSuccess(message : string) {
    this._toasterService.success(message)
  }

  showToastError(message : string) {
    this._toasterService.error(message)
  } 
}
