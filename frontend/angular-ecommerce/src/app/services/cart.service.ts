import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[]  = []
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem){

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0) {
      
      existingCartItem = this.cartItems.find(
        tempCartItem => tempCartItem.id === cartItem.id
      );

      alreadyExistsInCart = (existingCartItem != undefined)
    }

    if(alreadyExistsInCart)
      existingCartItem.quantity++;
    else
      this.cartItems.push(cartItem)
    
    this.computeCartTotal()
  }

  computeCartTotal() {
    let totalPrice: number = 0
    let totalQuantity: number = 0

    for(let currentCartItem of this.cartItems){
      totalPrice += (currentCartItem.unitPrice * currentCartItem.quantity)
      totalQuantity += currentCartItem.quantity
    }

    this.totalPrice.next(totalPrice)
    this.totalQuantity.next(totalQuantity)
  }

}
