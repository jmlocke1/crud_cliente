import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';

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

	constructor(private fb: FormBuilder,
				private router: Router,
				private toastr: ToastrService) {
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
		const PRODUCTO: Producto = {
			nombre: this.productoForm.get('producto')?.value,
			categoria: this.productoForm.get('categoria')?.value,
			ubicacion: this.productoForm.get('ubicacion')?.value,
			precio: this.productoForm.get('precio')?.value,
		}
		console.log(PRODUCTO);
		this.toastr.success('El producto fue registrado con éxito', 'Producto Registrado');
		this.router.navigate(['/']);
	}
}
