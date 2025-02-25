import {
  Component,
  computed,
  effect,
  Input,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { myTranslateService } from '../../../core/services/translate/myTranslate.service';
import { TranslateModule } from '@ngx-translate/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartNumber!: Signal<number>;

  constructor(
    public auth: AuthService,
    private cart: CartService,
    private translate: myTranslateService,
    private flowbiteService: FlowbiteService
  ) {
    effect(() => {
      this.cartNumber = computed(() => cart.cartNumber());
      if (auth.userData() !== null) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }

  changeLang(lang: string) {
    localStorage.setItem('lang', lang);
    this.translate.changeDirection();
  }
}
