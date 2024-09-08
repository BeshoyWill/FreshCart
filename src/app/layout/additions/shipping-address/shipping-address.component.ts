import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../../shared/services/order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.css',
})
export class ShippingAddressComponent {
  private readonly _OrderService = inject(OrderService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  shippingAddressForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
  });

  submitShippingAddressForm() {
    if (this.shippingAddressForm.valid) {
      this._ActivatedRoute.paramMap.subscribe({
        next: (p) => {
          this._OrderService
            .checkout(p.get('cartId')!, this.shippingAddressForm.value)
            .subscribe({
              next: (res) => {
                window.open(res.session.url, '_self');
              },
              error: (err) => {
                console.log(err);
              },
            });
        },
      });
    }
    console.log(this.shippingAddressForm.value);
  }
}
