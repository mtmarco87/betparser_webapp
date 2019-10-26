import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollableDirective } from './directives/scrollable.directive';
import { ClickOutsideDirective } from './directives/clickoutside.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FilterNaPipe } from './pipes/filter-na.pipe';
import { AddPercentPipe } from './pipes/add-percent.pipe';


@NgModule({
  declarations: [ScrollableDirective, ClickOutsideDirective, FilterNaPipe, AddPercentPipe, SpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [ScrollableDirective, ClickOutsideDirective, FilterNaPipe, AddPercentPipe, SpinnerComponent, CommonModule]
})
export class SharedModule { }
