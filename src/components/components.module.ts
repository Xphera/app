import { NgModule } from '@angular/core';
import { MapMarkerFixedComponent } from './map-marker-fixed/map-marker-fixed';
import { IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { } from 'googlemaps';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
	declarations: [MapMarkerFixedComponent
	],
	imports: [
						IonicModule,
						AgmCoreModule.forRoot({
				      apiKey: 'AIzaSyAMm0ooQUphviDgCru8vaAFbgN8P1c67Io',
				      libraries: ["places"]
				    }),
					],
	exports: [MapMarkerFixedComponent,
    ],
	providers: [Geolocation]
})
export class ComponentsModule {}
