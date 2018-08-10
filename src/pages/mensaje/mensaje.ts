import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { FormBuilder,Validators } from '@angular/forms';
import { MensajeProvider } from '../../providers/mensaje/mensaje';
import {AutenticacionProvider} from '../../providers/autenticacion/autenticacion';

/**
 * Generated class for the MensajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensaje',
  templateUrl: 'mensaje.html',
})
export class MensajePage {

@ViewChild(Content) content: Content;
 public messageForm: any;
 public chatBox: string;
 public compraDetalleId:number
 public mensajes:Array<any> = new Array<any>()

 constructor(
   public navCtrl: NavController,
   public formBuilder: FormBuilder,
   public navParams: NavParams,
   public _autenticacionPrvdr:AutenticacionProvider,
   public _mensajePrvdr:MensajeProvider) {

  this._autenticacionPrvdr.activo()

   this.messageForm = formBuilder.group({
     message: ['', [Validators.required,Validators.maxLength(250)]]
   });
   this.chatBox = '';
 }

 ionViewDidEnter(){
   this.compraDetalleId = this.navParams.get('compraDetalleId')

   this._mensajePrvdr.obtenerMensaje(this.compraDetalleId)
   .subscribe((data:any[])=>{
     this.mensajes = data
     this.scrollToBottom()
   })

   this._mensajePrvdr.mensajeSubject
    .subscribe((mensaje:any)=>{
      if(this.mensajes["compraDetalle"]["compraDetalleId"] == mensaje.chat.compraDetalleId){
        this.mensajes["mensajes"].push(mensaje.mensaje)
        this.scrollToBottom();
      }
   })
 }
ionViewDidLoad() {
    console.log('ionViewDidLoad MensajePage');
  }

  enviarMensaje(mensaje){
    this._mensajePrvdr.enviarMensaje(this.compraDetalleId,mensaje)
    .subscribe((data)=>{
      this.mensajes["mensajes"].push(data)
      this.chatBox=""
      this.scrollToBottom()
    })
  }

  scrollToBottom() {
   setTimeout(() => {
     this.content.scrollToBottom();
   },600);
 }

}
