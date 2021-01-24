import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { Pageable } from '../models/pageable';
import { SalaryRequest } from '../models/salaryRequest';
import { User } from '../models/user';
import { UserSearchRequest } from '../models/userSerchRequest';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends RestService {

  private baseUsersUrl: string;
  private calculateUrl: string;
  private searchUsersUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.baseUsersUrl = this.backendUrl + "/users";
    this.calculateUrl = this.baseUsersUrl + "/calculate";
    this.searchUsersUrl = this.baseUsersUrl + "/search"
  }

/**
* Filters users by custom search criteria
*
* @param {object} searchRequest - object containing criteria to search for
* @returns the matched users {@link Page<User>}<Page<User>>
*/
  public filter(userSearchRequest: UserSearchRequest, pageable: Pageable): Observable<Page<User>> {
    return this.http.put<Page<User>>(this.searchUsersUrl, userSearchRequest, {
      headers: this.httpHeaders,
      params: this.convertToHttpParams(pageable),
      withCredentials: true
    });
  }

  /**
   * Calculates net/gross salary
   * @param salaryReqyest objeckt containing info about salary to calculate
   */
  public calculateSalary(salaryReqyest: SalaryRequest): Observable<Number>{
    return this.http.put<Number>(this.calculateUrl, salaryReqyest, this.httpOptions);
  }
}
