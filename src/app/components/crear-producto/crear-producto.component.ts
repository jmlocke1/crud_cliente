import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-crear-producto',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule
	],
	templateUrl: './crear-producto.component.html',
	styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {

}
