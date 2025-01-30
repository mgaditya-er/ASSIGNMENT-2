import { Injectable } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate:() => Observable<boolean>|boolean | Promise<boolean>;
}




// @Injectable({
//     providedIn: 'root',
// })
export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
  
  if(component && typeof component.canDeactivate === 'function'){
      return component.canDeactivate();
  }
          return true;
};


