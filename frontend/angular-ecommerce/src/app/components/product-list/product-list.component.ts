import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[]
  currentCategoryId: number;
  searchMode: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    });
  }

  listProducts(){
    
    this.searchMode = this.route.snapshot.paramMap.has('keyword')

    if(this.searchMode)
      this.handleSearchProduct()
    else
      this.handleListProduct()

  }

  handleSearchProduct() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')

    //get list of product based on the searched keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data =>{
        this.products = data;
      }
    )
  }

  handleListProduct(){

    //check if id param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')

    if(hasCategoryId){
      //gets id param and converts it from a string to a number, this is done by the +
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')
    }
    else{
      //if no category id default to an id of 1
      this.currentCategoryId = 1;
    }

    //get list of product based on the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data =>{
        this.products = data;
      }
    )

  }

}
