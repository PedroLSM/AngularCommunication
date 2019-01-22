import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

    pageTitle: string = 'Product List';
    showImage: boolean;
    includeDetail: boolean = true;
    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
    parentListFilter: string;

    // [()] The Long Way
    // listFilter: string;
    // listFilter: string;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    // @ViewChild(NgModel) filterInput: NgModel;
    // ViewChild - NgIf
    // private _filterInput: NgModel;
    // private _sub: Subscription;

    // get filterInput(): NgModel {
    //     return this._filterInput;
    // }

    // @ViewChild(NgModel)
    // set filterInput(value: NgModel) {
    //     this._filterInput = value;

    //     if (this.filterInput && !this._sub) {
    //         console.log('Subscribing');
    //         this._sub = this.filterInput.valueChanges
    //             .subscribe(() => {
    //                 this.performFilter(this.listFilter);
    //                 console.log('Performed the filter');
    //             });
    //     }

    //     if (this.filterElementRef) {
    //         this.filterElementRef.nativeElement.focus();
    //     }

    // }

    // @ViewChildren(NgModel)
    //     inputElementRefs: QueryList<NgModel>;

    // Getters and Setters - Clean, Clear and Easy
    // private _listFilter: string;
    // get listFilter(): string {
    //     return this._listFilter;
    // }

    // set listFilter(value: string) {
    //     this._listFilter = value;
    //     this.performFilter(this.listFilter);
    // }

    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) { }

    ngAfterViewInit(): void {
        this.parentListFilter = this.filterComponent.listFilter;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.parentListFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    // Using [()] The Long Way
    // onFilterChange(filter: string): void {
    //     this.listFilter = filter;
    //     this.performFilter(this.listFilter);
    // }

    onValueChange(value: string): void {
        this.performFilter(value);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
