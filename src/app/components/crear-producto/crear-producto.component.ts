import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'

@Component({
	selector: 'app-crear-producto',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule
	],
	templateUrl: './crear-producto.component.html',
	styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent implements OnInit {
	productoForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.productoForm = this.fb.group({
			producto: ['', Validators.required],
			categoria: ['', Validators.required],
			ubicacion: ['', Validators.required],
			precio: ['', Validators.required]
		});
	}

	ngOnInit(): void {
		
	}

	agregarProducto() {
		console.log(this.productoForm);
	}
}
