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
import { CommonDeleteModalComponent } from 'app/shared/common-delete-modal/common-delete-modal.component';
import { Apiurl } from 'app/shared/route';
import { BaseService } from 'app/shared/service/base.service';
import { LoaderService } from 'app/shared/service/loader.service';
import { ToastService } from 'app/shared/service/toast.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-device-categories',
    templateUrl: './device-categories.component.html',
    styleUrls: ['./device-categories.component.scss'],
})
export class DeviceCategoriesComponent implements OnInit {
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
    categoryform: FormGroup;
    submitted = false;
    selectedFile: any = [];
    selectedValue: string;
    deviceList: any[];
    constructor(
        private baseService: BaseService,
        private toastService: ToastService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private loader: LoaderService
    ) {
        this.searchUpdater
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe(() => this.getAllDeviceList());
    }

    ngOnInit(): void {
        this.searchText = new FormControl('');
        this.dataInitializer();
        this.defineForm();
    }

    /**
     * Method to initialize data
     */
    private dataInitializer(): void {
        this.initColumns();
        this.getAllDeviceList();
    }

    /**
     * Method to get and set all data to data source     */
    private getAllDeviceList(): void {
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

        this.baseService.get(Apiurl.deviceCategoryList, params).subscribe(
            (response: any) => {
                this.loader.hideLoader();
                if (response) {
                    this.dataSource.data = response.data.deviceCategory;
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
            },
            (error) => {
                // Handle errors
                this.dataSource.data = [];
                this.paginator.length = 0;
                if (this.pageIndex !== 0) {
                    this.pageIndex = 0;
                    this.getAllDeviceList();
                }
                // this.toastService.showToastMessage(error, 'error-style');
            }
        );
    }

    /**
     * Method to initialize Columns field
     */
    private initColumns(): void {
        this.columns = [
            'id',
            'DeviceCategoryName',
            'DeviceCategoryThumb',
            'WarrantyYear',
            'action',
        ];
    }

    /*---------------------------------
Public methods
-----------------------------------*/
    getAllStaticDevice() {
        this.baseService.get(Apiurl.staticDevices).subscribe((res: any) => {
            if (res) this.deviceList = res.data.deviceCategories;
        });
    }
    /**
     * define form
     */
    defineForm() {
        this.categoryform = this.fb.group({
            DeviceCategoryName: [
                '',
                [Validators.required, Validators.pattern(/^\S.*$/)],
            ],
            WarrantyYear: [
                '',
                [Validators.required, Validators.max(99), Validators.min(1)],
            ],
            parentId: [0],
        });
    }

    /**
     *
     *method for open dialog box
     */
    openDialog(templateRef: TemplateRef<any>, isEdit: boolean, data?: any) {
        this.getAllStaticDevice();
        this.id = null;
        this.selectedFile = null;
        this.imageFile = null;
        this.defineForm();
        this.isEdit = isEdit;
        this.submitted = false;
        this.dialog.open(templateRef, {
            disableClose: true,
            width: '45%',
            height: '55%',
        });
        if (this.isEdit) {
            this.setFormValue(data);
        }
    }
    /**
     * update time set the form value to form control
     */
    setFormValue(data: any) {
        this.id = data.id;
        this.categoryform.controls.DeviceCategoryName.setValue(
            data.DeviceCategoryName
        );
        this.categoryform.controls.WarrantyYear.setValue(data.WarrantyYear);
        this.categoryform.controls.parentId.setValue(data.ParentId);
        this.imageFile = data.DeviceCategoryThumb;
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
     * method for get data when page size is chnage
     * @param event
     */

    pageChanged(event: PageEvent): void {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.getAllDeviceList();
    }
    /**
     * Method for sorting data
     */
    sortChange(e): void {
        this.sortColumn = e.active;
        this.sortDirection = e.direction;
        this.getAllDeviceList();
    }
    /**
     * method for save form
     * @returns if form is not valid
     */
    saveForm() {
        this.submitted = true;
        if (!this.categoryform.valid) {
            return;
        }
        if (
            !this.categoryform.valid ||
            (!this.isEdit && this.selectedFile == null)
        ) {
            return this.toastService.showToastMessage(
                'Please fill out the form correctly',
                'error-style'
            );
        }
        const formData = new FormData();
        const formValues = {
            ParentId: this.categoryform.value.parentId,
            DeviceCategoryName: this.categoryform.value.DeviceCategoryName,
            WarrantyYear: this.categoryform.value.WarrantyYear,
            file: this.selectedFile,
        };
        Object.entries(formValues).forEach(([key, value]) => {
            formData.append(key, value);
        });
        const APIURL = this.isEdit
            ? Apiurl.deviceCategoryList + this.id
            : Apiurl.deviceCategoryList;
        this.baseService.post(APIURL, formData).subscribe(
            (res: any) => {
                if (res) {
                    this.toastService.showToastMessage(
                        res.message,
                        'success-style'
                    );
                    this.dialog.closeAll();
                    this.getAllDeviceList();
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
                title: 'Device Categories',
                message:
                    'Are you sure you want to delete this device category?',
            },
            width: '30%',
        });
        confirmation.afterClosed().subscribe((dialogResult) => {
            if (dialogResult === true) {
                // this.spinnerService.show();
                this.baseService
                    .delete(Apiurl.deviceCategoryList + id)
                    .subscribe(
                        (response: any) => {
                            if (response) {
                                // this.spinnerService.show();
                                this.toastService.showToastMessage(
                                    response.message,
                                    'success-style'
                                );
                                this.getAllDeviceList();
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
    imageFile;
    /**
     * method for set the selected file
     * @param event
     */
    onFileSelected(event) {
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
                this.imageFile = reader.result;
            };
            this.selectedFile = file;
        } else {
            this.toastService.showToastMessage(
                'Please select Image Extention .jpg .Jpeg .png format',
                'error-style'
            );
        }
    }
    /***
     * method for accept only numbers
     */
    keyPress(event: KeyboardEvent): void {
        const disallowedKeys = ['e', 'E', '+', '-','.'];
        if (disallowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }
}
