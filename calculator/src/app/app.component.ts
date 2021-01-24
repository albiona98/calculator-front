import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from './models/page';
import { Pageable } from './models/pageable';
import { User } from './models/user';
import { UserSearchRequest } from './models/userSerchRequest';
import { UsersService } from './services/users.service';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'calculator';
  userSearchRequest: UserSearchRequest;
  users: Observable<Page<User>>;


  form: FormGroup;
  displayedColumns: string[] = ['name', 'lastName', 'mobile', 'email', 'jobPosition', 'salary', 'address'];
  pageSize = 10;


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private usersService: UsersService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.paginator.pageSize = queryParams.size || this.pageSize;
    this.paginator.pageIndex = queryParams.page;
    this.sort = queryParams.sort;
    this.paginator.page.pipe(
      tap(() => this.loadUsers()),
    )
      .subscribe();
    this.createUsersSearchForm(queryParams);
    this.loadUsers();
  }

  loadUsers(): void {
    const userSearchRequest = this.userSearchRequest;
    this.users = this.usersService.filter(this.buildUsersSearchRequest(), this.buildPageable()).pipe(tap(page => {
      this.paginator.length = page.totalElements;
      console.log(page.content)
    }));
  }

  buildUsersSearchRequest(): UserSearchRequest {
    let usersSearchRequest = {} as UserSearchRequest;
    usersSearchRequest = this.form.getRawValue();
    return usersSearchRequest;
  }

  /**
 * Initialize forma and gets form's values
 */
  createUsersSearchForm(queryParams): void {
    this.form = this.formBuilder.group({
      name: [queryParams.name],
      jobPosition: [this.getQueryParamArray(queryParams.jobPosition)],
      salary: [this.getQueryParamArray(queryParams.salary)]
    });
  }

  getQueryParamArray(value: any, isNumber?: boolean): any[] {
    if (value === undefined) {
      return;
    }

    if (isNumber && !isNaN(value)) {
      value = +value;
    }
    return value instanceof Array ? value : [value];
  }

  /**
 * Creates a Pageable object and gets its values form user or is initialized with default values
 */
  buildPageable(): Pageable {
    const pageable = {
      sort: this.sort || ['modifiedOn,DESC']
    } as Pageable;

    pageable.size = this.paginator.pageSize;
    pageable.page = this.paginator.pageIndex;
    return pageable;

  }

  ngAfterViewInit() {
    this.loadUsers();
  }


  ngOnDestroy() {
  }
}
