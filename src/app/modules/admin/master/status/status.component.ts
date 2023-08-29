import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonDeleteModalComponent } from 'app/shared/common-delete-modal/common-delete-modal.component';
import { Apiurl } from 'app/shared/route';
import { BaseService } from 'app/shared/service/base.service';
import { LoaderService } from 'app/shared/service/loader.service';
import { ToastService } from 'app/shared/service/toast.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild('filter', { static: false }) filter: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: Array<string>;
  totalRows: number = 0;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize: number = 5;
  sortDirection: string = '';
  sortColumn: string = '';
  searchText: FormControl;
  searchUpdater = new Subject<string>();
  isEdit: boolean = false;
  id: any;
  statusForm: FormGroup;
  submitted = false;
  constructor(
      private baseService: BaseService,
      private toastService: ToastService,
      public dialog: MatDialog,
      private fb: FormBuilder,
      private loader: LoaderService
  ) {
      this.searchUpdater
          .pipe(debounceTime(1000), distinctUntilChanged())
          .subscribe(() => this.getAllStatusList());
  }

  ngOnInit(): void {
      this.searchText = new FormControl('');
      this.dataInitializer();
      this.defineForm();
  }
  /*---------------------------------
Private  methods
-----------------------------------*/

  /**
   * Method to initialize data
   */
  private dataInitializer(): void {
      this.initColumns();
      this.getAllStatusList();
  }

  /**
   * Method to initialize Columns field
   */
  private initColumns(): void {
      this.columns = ['id', 'Name', 'action'];
  }
  /***
   * method for get all listing data 
   */
  getAllStatusList() {
      this.loader.showLoader();
      const params = {
          index: this.pageIndex + 1,
          size: this.pageSize,
      };
      if (this.searchText?.value) {
          params['searchText'] = this.searchText.value;
      }
      if (this.sortDirection !== '' && this.sortColumn !== '') {
          params['sortDirection'] = this.sortDirection;
          params['sortColumn'] = this.sortColumn;
      }

      this.baseService
          .get(Apiurl.statusList, params)
          .subscribe((response: any) => {
              this.loader.hideLoader();
              if (response) {
                  this.dataSource.data = response.data.status;
                  this.totalRows = response.data.totalRecords;
                  setTimeout(() => {
                      this.paginator.pageIndex = this.pageIndex;
                      this.paginator.length = response.data.totalRecords;
                  });
              } else {
                  this.toastService.showToastMessage(
                      response.message,
                      'error-style'
                  );
              }
          });
  }
  /*---------------------------------
Public methods
-----------------------------------*/

  /**
   * method for define form
   */
  defineForm() {
      this.statusForm = this.fb.group({
          Name: ['', [Validators.required, Validators.pattern(/^\S.*$/)]],
      });
  }

  /**
   * update time set the form value
   */
  setFormValue(data: any) {
      this.id = data.id;
      this.statusForm.controls.Name.setValue(data.Name);
  }

  /**
   * input method for search the data
   * @param event set the event
   */
  onSerach(event) {
      this.searchText.setValue(event.target.value);
      this.searchUpdater.next(this.filter.nativeElement.value);
  }
  /**
   * method for cancel searching
   */
  cancelSearch() {
      this.searchText.setValue('');
      this.searchUpdater.next(this.filter.nativeElement.value);
  }
  /**
   * Method for sorting data
   */
  sortChange(e): void {
      this.sortColumn = e.active;
      this.sortDirection = e.direction;
      this.getAllStatusList();
  }

  /**
   *
   *method for open dialog box
   */
  openDialog(templateRef: TemplateRef<any>, isEdit: boolean, data?: any) {
      this.id = null;
      this.defineForm();
      this.isEdit = isEdit;
      this.submitted = false;
      this.dialog.open(templateRef, {
          disableClose: true,
          width: '28%',
          height: '26%',
      });
      if (this.isEdit) {
          this.setFormValue(data);
      }
  }

  /**
   * method for change page
   * @param event
   */
  pageChanged(event: PageEvent): void {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.getAllStatusList();
  }

  /***
   * method for save form
   */
  saveForm() {
      this.submitted = true;
      if (!this.statusForm.valid) {
          return;
      }
      if (this.isEdit) {
          this.baseService
              .put(
                  Apiurl.statusList + this.id,
                  this.statusForm.value
              )
              .subscribe(
                  (res: any) => {
                      if (res) {
                          this.toastService.showToastMessage(
                              res.message,
                              'success-style'
                          );
                          this.dialog.closeAll();
                          this.getAllStatusList();
                      }
                  },
                  (error) => {
                      // Handle errors
                      this.toastService.showToastMessage(
                          error,
                          'error-style'
                      );
                  }
              );
      } else if (!this.isEdit) {
          this.baseService
              .post(Apiurl.statusList, this.statusForm.value)
              .subscribe(
                  (res: any) => {
                      if (res) {
                          this.toastService.showToastMessage(
                              res.message,
                              'success-style'
                          );
                          this.dialog.closeAll();
                          this.getAllStatusList();
                      }
                  },
                  (error) => {
                      console.log('error: ', error);
                      // Handle errors
                      this.toastService.showToastMessage(
                          error,
                          'error-style'
                      );
                  }
              );
      }
  }
  /**
   * method for delete selected record
   */
  deleteRecord(id: number) {
      const confirmation = this.dialog.open(CommonDeleteModalComponent, {
          data: {
              title: 'Status',
              message: 'Are you sure you want to delete this status?',
          },
          width: '30%',
      });
      confirmation.afterClosed().subscribe((dialogResult) => {
          if (dialogResult === true) {
              // this.spinnerService.show();
              this.baseService.delete(Apiurl.statusList + id).subscribe(
                  (response: any) => {
                      if (response) {
                          console.log('response: ', response);
                          // this.spinnerService.show();
                          this.toastService.showToastMessage(
                              response.message,
                              'success-style'
                          );
                          this.getAllStatusList();
                      } else {
                          this.toastService.showToastMessage(
                              response.message,
                              'error-style'
                          );
                      }
                  },
                  (error) => {
                      // Handle errors
                      this.toastService.showToastMessage(
                          error,
                          'error-style'
                      );
                  }
              );
          }
      });
  }
}
