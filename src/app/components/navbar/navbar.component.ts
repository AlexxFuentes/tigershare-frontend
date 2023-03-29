import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  interruptor = false;

  constructor(public router: Router) {}

  open() {
		this.interruptor = !this.interruptor;
	}
}
