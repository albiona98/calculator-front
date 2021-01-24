import {HttpHeaders, HttpParams} from '@angular/common/http';
import * as _moment from 'moment';
import { environment } from 'src/environments/environment';
import CustomHttpUrlEncoder from './custom-encoded-url';

export class RestService {
  backendUrl = environment.backend;

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  readonly httpOptions = {
    headers: this.httpHeaders,
    withCredentials: true,
    // observe: 'response'
  };

  convertToHttpParams(object: Object): HttpParams {
    let httpParams = new HttpParams({ encoder: new CustomHttpUrlEncoder() });
    Object.keys(object).forEach(key => {
      let value = object[key];
      if (value === null || value === undefined || value === '') {
        return;
      }

      if (_moment.isMoment(value)) {
        value = value.toISOString();
      }
      httpParams = httpParams.append(key, value);
    });
    return httpParams;
  }

  createUrl(url: string): string {
    return this.backendUrl + url;
  }
}
