import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { MytranslateService } from '../../../shared/services/mytranslate/mytranslate.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  cartItemNumber!: number;

  constructor(
    public _AuthService: AuthService,
    private _FlowbiteService: FlowbiteService,
    private _CartService: CartService,
    private _MytranslateService: MytranslateService
  ) {
    // Subscribe to cart number changes
    this._CartService.getCartNumber().subscribe((cartNumber) => {
      this.cartItemNumber = cartNumber; // Update cart number
      console.log('Updated cart number:', cartNumber);
    });
  }

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

  getCartItemsNumber() {
    this._CartService.cartNumber.subscribe({
      next: (res) => {
        this.cartItemNumber = res;
      },
    });
  }

  changeLang(lang: string) {
    this._MytranslateService.changeLang(lang);
  }
}
