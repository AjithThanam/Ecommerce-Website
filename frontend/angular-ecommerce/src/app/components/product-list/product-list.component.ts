import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //variable related to pagination
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;
  previousKeyword: string = null

  constructor(private productService: ProductService, private cartService: CartService,private route: ActivatedRoute) { }

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

    if(this.previousKeyword != theKeyword)
      this.pageNumber = 1;
    
    this.previousKeyword = theKeyword;

    //get list of product based on the searched keyword
    this.productService.searchProductListPaginate(this.pageNumber -1, this.pageSize, theKeyword).subscribe(
      this.processResult()
    );
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

    if(this.previousCategoryId != this.currentCategoryId)
      this.pageNumber = 1

    this.previousCategoryId = this.currentCategoryId

    //get list of product based on the given category id
    this.productService.getProductListPaginate(this.pageNumber -1, this.pageSize, this.currentCategoryId).subscribe(
      this.processResult());

  }

  processResult(){
    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize:number){
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product){
    const cartItem = new CartItem(product)
    this.cartService.addToCart(cartItem)
  }
}
