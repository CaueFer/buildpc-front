import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NavComponent } from '../../layouts/nav/nav.component';
import { BlobOptions } from 'buffer';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  viewInited: boolean = false;
  ViewInitedDelayed: boolean = false;
  ViewInitedDelayed2: boolean = false;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.viewInited = true;

      setTimeout(() => {
        this.ViewInitedDelayed = true;

        setTimeout(() => {
          this.ViewInitedDelayed2 = true;
        }, 1500);
      }, 1500);
    }, 2000);
  }
}
