import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-horizontal-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './horizontal-nav.component.html',
  styleUrl: './horizontal-nav.component.scss',
})
export class HorizontalNavComponent {
  sidebarOpen: boolean = false;
  dropdownOpen: boolean = false;
  notificationOpen: boolean = false;

  constructor() {}

  ngOnInit() {

  }
}
