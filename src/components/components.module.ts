import { NgModule } from '@angular/core';
import { MapMarkerFixedComponent } from './map-marker-fixed/map-marker-fixed';
import { IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { } from 'googlemaps';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { CalificarComponent } from './calificar/calificar';
import { ProximaSesionComponent } from './proxima-sesion/proxima-sesion';
import { Ionic2RatingModule } from "ionic2-rating";
import { ChartSesionesComponent } from './chart-sesiones/chart-sesiones';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SesionesCompradasComponent } from './sesiones-compradas/sesiones-compradas';
import { PipesModule } from '../pipes/pipes.module';

import { MomentModule } from 'angular2-moment';
import 'moment/locale/es';
import { ContentDrawerComponent } from './content-drawer/content-drawer';
import { XphMapComponent } from './xph-map/xph-map';
import { LocalizarUbicacionProvider } from '../providers/localizar-ubicacion/localizar-ubicacion';

@NgModule({
	declarations: [
		MapMarkerFixedComponent,
    CalificarComponent,
    ProximaSesionComponent,
    ChartSesionesComponent,
    SesionesCompradasComponent,
    ContentDrawerComponent,
    XphMapComponent
	],
	imports: [
						MomentModule,
						IonicModule,
				    Ionic2RatingModule,
						PipesModule,
						ChartsModule,
						AgmCoreModule.forRoot({
				      apiKey: 'AIzaSyAMm0ooQUphviDgCru8vaAFbgN8P1c67Io',
				      libraries: ["places"]
				    }),
					],
	exports: [MapMarkerFixedComponent,
    CalificarComponent,
    ProximaSesionComponent,
    ChartSesionesComponent,
    SesionesCompradasComponent,
    ContentDrawerComponent,
    XphMapComponent,
    ],
	providers: [
		Geolocation,
		LocationAccuracy,
		LocalizarUbicacionProvider
	]
})
export class ComponentsModule {}
