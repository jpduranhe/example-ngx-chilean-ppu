import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxChileanPpuService, PpuValidation } from 'ngx-chilean-ppu';

@Component({
  selector: 'app-root',
imports: [
  FormsModule,
  ReactiveFormsModule
],
  template: `
  <div class="container">
    <div class="row">
    <h1>PPU Tester</h1>
      <div class="col-md-12">
        <form [formGroup]="formulario" class="form-horizontal">
          <input class="form-control" formControlName="ppu" name="ppu" type="text" placeholder="" />
        </form>

         @if(formulario.get('ppu')!.invalid){
            @if(formulario.get('ppu')!.errors?.['required']){
              <p style="color: #ff0000;">
              <span>El campo es requerido</span>
              </p>
            }
            @if(formulario.get('ppu')!.errors?.['ppuInvalid']){
              <p style="color: #ff0000;">
              <span >El placa patente no es válida</span>
              </p>
            }
        }

        </div>
        <div class="col-md-12">
          @if(formulario.get('ppu')!.valid){
            <p> PPU: {{ formulario.get('ppu')!.value }}</p>
            <p> DV ppu: {{ ppuService.calculateDv(formulario.get('ppu')!.value ) }}</p>
          }

        </div>
    </div>

  </div>
  `
})
export class AppComponent {
  public formulario: FormGroup;
  public ppu = 'XL1187';
  public ppuService = inject(NgxChileanPpuService);
  public ppuValidation = inject(PpuValidation);
  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      ppu: ['', [Validators.required, this.ppuValidation.ppuValid()]],
    });
  }
}
