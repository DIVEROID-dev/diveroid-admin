import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonDeleteModalComponent } from 'app/shared/common-delete-modal/common-delete-modal.component';
import { Apiurl } from 'app/shared/route';
import { BaseService } from 'app/shared/service/base.service';
import { LoaderService } from 'app/shared/service/loader.service';
import { ToastService } from 'app/shared/service/toast.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-water-types',
    templateUrl: './water-types.component.html',
    styleUrls: ['./water-types.component.scss'],
})
export class WaterTypesComponent implements OnInit {
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
    waterTypeForm: FormGroup;
    submitted = false;
    activeFile: any='mat_outline:file_upload';
    inActiveFile: any;
    activeImage;
    inActiveImage;
    constructor(
        private baseService: BaseService,
        private toastService: ToastService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private loader: LoaderService
    ) {
        this.searchUpdater
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe(() => this.getAllWaterTypeList());
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
        this.getAllWaterTypeList();
    }

    /**
     * Method to initialize Columns field
     */
    private initColumns(): void {
        this.columns = ['id', 'Type', 'ActiveThumb', 'InActiveThumb', 'action'];
    }
    /***
     * method for get all listing data 
     */
    getAllWaterTypeList() {
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
            params['sortOption'] = this.sortColumn;
        }

        this.baseService
            .get(Apiurl.waterTypesList, params)
            .subscribe((response: any) => {
                this.loader.hideLoader();
                if (response) {
                    this.dataSource.data = response.data.waterType;
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
            }, (error) => {
                // Handle errors
                this.dataSource.data = [];
                this.paginator.length = 0;
                if (this.pageIndex !== 0) {
                    this.pageIndex = 0;
                    this.getAllWaterTypeList();
                }
                // this.toastService.showToastMessage(error, 'error-style');
            });
    }
    /*---------------------------------
Public methods
-----------------------------------*/

    /**
     * method for define form
     */
    defineForm() {
        this.waterTypeForm = this.fb.group({
            Type: ['', [Validators.required, Validators.pattern(/^\S.*$/)]],
        });
    }

    /**
     * update time set the form value
     */
    setFormValue(data: any) {
        this.id = data.id;
        this.waterTypeForm.controls.Type.setValue(data.Type);
        this.activeImage = data?.ActiveThumb;
        this.inActiveImage = data?.InActiveThumb;
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
        this.getAllWaterTypeList();
    }

    /**
     *
     *method for open dialog box
     */
    openDialog(templateRef: TemplateRef<any>, isEdit: boolean, data?: any) {
        this.id = null;
        this.activeFile = null;
        this.inActiveFile = null;
        this.activeImage = null;
        this.inActiveImage = null;
        this.defineForm();
        this.isEdit = isEdit;
        this.submitted = false;
        this.dialog.open(templateRef, {
            disableClose: true,
            width: '40%',
            height: '50%',
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
        this.getAllWaterTypeList();
    }

    /***
     * method for save form
     */
    saveForm() {
        this.submitted = true;
        if(!this.waterTypeForm.valid){
            return
        }
        if (!this.waterTypeForm.valid ||
            (!this.isEdit && (this.activeFile == null || this.inActiveFile == null))) {
                return this.toastService.showToastMessage('Please fill out the form correctly', 'error-style');
        }
        const APIURL = this.isEdit
            ? Apiurl.waterTypesList + this.id
            : Apiurl.waterTypesList;
        const formData = new FormData();
        const formValues = {
            Type: this.waterTypeForm.value.Type,
            Active: this.activeFile,
            InActive: this.inActiveFile,
        };
        Object.entries(formValues).forEach(([key, value]) => {
            formData.append(key, value);
        });
        this.baseService.post(APIURL, formData).subscribe(
            (res: any) => {
                if (res) {
                    this.toastService.showToastMessage(
                        res.message,
                        'success-style'
                    );
                    this.dialog.closeAll();
                    this.getAllWaterTypeList();
                    
                }
            },
            (error) => {
                // Handle errors
                this.toastService.showToastMessage(error, 'error-style');
            }
        );
    }
    /**
     * method for delete selected record
     */
    deleteRecord(id: number) {
        const confirmation = this.dialog.open(CommonDeleteModalComponent, {
            data: {
                title: 'Water Types',
                message: 'Are you sure you want to delete this water type?',
            },
            width: '30%',
        });
        confirmation.afterClosed().subscribe((dialogResult) => {
            if (dialogResult === true) {
                // this.spinnerService.show();
                this.baseService.delete(Apiurl.waterTypesList + id).subscribe(
                    (response: any) => {
                        if (response) {
                            // this.spinnerService.show();
                            this.toastService.showToastMessage(
                                response.message,
                                'success-style'
                            );
                            this.getAllWaterTypeList();
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
    /***
     * method for set the active selected file
     */
    onActiveFileSelected(event) {
        const reader = new FileReader();
        const file = event.target.files[0];
        if (
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg'
        ) {
            if (file) reader.readAsDataURL(file); // read file as data url
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            reader.onload = () => {
                // called once readAsDataURL is completed
                this.activeImage = reader.result;
            };
            this.activeFile = file;
        } else {
            this.toastService.showToastMessage(
                'Please select Image Extention .jpg .Jpeg .png format',
                'error-style'
            );
        }
    }
    /**
     * method for set the in active selected file
     */
    onInActiveFileSelected(event) {
        const reader = new FileReader();
        const file = event.target.files[0];
        if (
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg'
        ) {
            if (file) reader.readAsDataURL(file); // read file as data url
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            reader.onload = () => {
                // called once readAsDataURL is completed
                this.inActiveImage = reader.result;
            };
            this.inActiveFile = file;
        } else {
            this.toastService.showToastMessage(
                'Please select Image Extention .jpg .Jpeg .png format',
                'error-style'
            );
        }
    }
}
