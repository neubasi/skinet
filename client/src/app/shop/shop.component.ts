import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from '../shared/models/IProduct';
import { ShopService } from './shop.service';
import { IBrands } from '../shared/models/IBrands';
import { IProductType } from '../shared/models/IProductType';
import { ShopParams } from '../shared/models/ShopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search', {static: false}) searchTerm: ElementRef;

  products: IProduct[];
  brands: IBrands[];
  productTypes: IProductType[];
  shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams)
      .subscribe(response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      }, error => {
        console.log(error);
      });
  }

  getBrands() {
    this.shopService.getBrands()
      .subscribe(response => {
        this.brands = [{id: 0, name: 'All'}, ...response];
      }, error => {
        console.log(error);
      });
  }

  getProductTypes() {
    this.shopService.getProductType()
      .subscribe(response => {
        this.productTypes = [{id: 0, name: 'All'}, ...response];
      }, error => {
        console.log(error);
      });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    this.shopParams.pageNumber = event;
    this.getProducts();
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
