import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = []
  totalPrice: number = 0
  totalQuantity:number = 0
  faPlus = faPlus
  faMinus = faMinus

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetaild()
  }

  listCartDetaild() {
    //Retrieves all relevant cart information from the cart service
    this.cartItems = this.cartService.cartItems

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

    this.cartService.computeCartTotal()
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem)
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem)
  }

  remove(cartItem: CartItem){
    this.cartService.removeFromCart(cartItem)
  }

}
