import { NgModule } from '@angular/core';
import { CreditCardTypePipe } from './credit-card-type/credit-card-type';
import { PathImagenPipe } from './path-imagen/path-imagen';
@NgModule({
	declarations: [CreditCardTypePipe,
    PathImagenPipe,
    ],
	imports: [],
	exports: [CreditCardTypePipe,
    PathImagenPipe,
    ]
})
export class PipesModule {}
