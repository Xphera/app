import { Pipe, PipeTransform } from '@angular/core';
import { BASE_URL } from '../../config/url.confing';
/**
 * Generated class for the PathImagenPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pathImagen',
})
export class PathImagenPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    return BASE_URL+'/'+value
  }
}
