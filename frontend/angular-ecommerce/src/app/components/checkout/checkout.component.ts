import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0
  totalQuantity: number = 0
  cartItems: CartItem[] = [];

  constructor(private formBuilder: FormBuilder, private cartService:  CartService) { }

  ngOnInit(): void {

    this.listCartDetaild()

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        province:[''],
        zipCode:[''],
      }),
      bililngAddress: this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        province:[''],
        zipCode:[''],
      }),
      creditCard: this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode: [''],
        expirationMonth:[''],
        expirationYear:[''],
      })
    })
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

  onSubmit(){
    console.log("Order has been sent")
    console.log(this.checkoutFormGroup.get('customer').value)
  }

  copyShippingAddressToBillingAddress(event){

    if(event.target.checked){
      this.checkoutFormGroup.controls.bililngAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value)
    }
    else
      this.checkoutFormGroup.controls.bililngAddress.reset()
  }
}
