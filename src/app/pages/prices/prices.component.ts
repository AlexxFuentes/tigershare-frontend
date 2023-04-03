import { Component } from '@angular/core';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent {
  faCcVisa = faCcVisa;
  faCcMastercard = faCcMastercard;
}
