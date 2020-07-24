import { Subscription } from 'rxjs';
import { Directive, OnDestroy } from '@angular/core';

@Directive()
export class UnsubscribeOnDestroyAdapter implements OnDestroy {
  subsink: Subscription[] = [];

  constructor() {
    this.subsink = [];
  }

  ngOnDestroy() {
    this.subsink.forEach((sub) => sub && sub.unsubscribe());
  }
}
