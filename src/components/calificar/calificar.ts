import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the CalificarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'xph-calificar',
  templateUrl: 'calificar.html'
})
export class CalificarComponent {

  @Input() prestador: string = '';
  @Input() fechaInicio: string = '';
  @Input() sesionId: number = 0;
  @Input() prestadorImagenPath: string = ''
  @Output() clickBotonEnviar = new EventEmitter();


  private todo: FormGroup;
  public titulo: string
  private comentarioMaxlength:number = 280

  constructor(private formBuilder: FormBuilder) {

    console.log('Hello CalificarComponent Component');

    this.todo = this.formBuilder.group({
      calificacion: ['', Validators.required],
      comentario: ['',Validators.maxLength(this.comentarioMaxlength)]
    });
    this.todo.controls['calificacion'].valueChanges
      .subscribe((valor: number) => {
        if (valor <= 3) {
          this.titulo = "¿Que ocurrio?"
        } else {
          this.titulo = "Comenta tu experiencia"
        }
      })
  }

  onClick() {
    if (this.todo.valid) {
      this.clickBotonEnviar.emit({
        calificacion: this.todo.value.calificacion,
        comentario: this.todo.value.comentario,
        sesionId: this.sesionId,
      });
    }
  }

}
