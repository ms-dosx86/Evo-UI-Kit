import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { EvoUiKitComponent } from './evo-ui-kit.component';
import { EvoButtonComponent } from './components/evo-button/evo-button.component';
import { EvoCheckboxComponent  } from './components/evo-checkbox/evo-checkbox.component';
import { EvoControlErrorComponent } from './components/evo-control-error/evo-control-error.component';
import { EvoInputComponent } from './components/evo-input/evo-input.component';
import { EvoBannerComponent } from './components/evo-banner/evo-banner.component';

import { EvoUiClassDirective } from './directives/evo-ui-class.directive';
import { EvoHeaderComponent } from './components/evo-header/evo-header.component';
import { EvoCardComponent } from './components/evo-card/evo-card.component';
import { EvoListComponent } from './components/evo-list/evo-list.component';

const components: any = [
  EvoButtonComponent,
  EvoCheckboxComponent,
  EvoControlErrorComponent,
  EvoInputComponent,
  EvoBannerComponent,
  EvoHeaderComponent,
  EvoCardComponent,
  EvoListComponent,
];

const directives: any = [
  EvoUiClassDirective,
];

const bundle: any = [
  ...components,
  ...directives
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
  ],
  declarations: [
    EvoUiKitComponent,
    ...bundle,
  ],
  exports: [
    EvoUiKitComponent,
    ...bundle,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EvoUiKitModule { }
