import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/producto.service';

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
	titulo = 'Crear producto';
	id: string | null;
	constructor(private fb: FormBuilder,
				private router: Router,
				private toastr: ToastrService,
				private _productoService: ProductoService,
				private aRouter: ActivatedRoute
	) {
		this.productoForm = this.fb.group({
			producto: ['', Validators.required],
			categoria: ['', Validators.required],
			ubicacion: ['', Validators.required],
			precio: ['', Validators.required]
		});
		this.id = this.aRouter.snapshot.paramMap.get('id');
	}

	ngOnInit(): void {
		this.esEditar();
	}

	agregarProducto() {
		const PRODUCTO: Producto = {
			nombre: this.productoForm.get('producto')?.value,
			categoria: this.productoForm.get('categoria')?.value,
			ubicacion: this.productoForm.get('ubicacion')?.value,
			precio: this.productoForm.get('precio')?.value,
		}

		if(this.id !== null) {
			// Editamos producto
			this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
				this.toastr.info('El producto fue actualizado con éxito', 'Producto Actualizado');
				this.router.navigate(['/']);
			}, error => {
				console.log(error);
				this.toastr.error('El producto no se pudo actualizar', 'Actualizar Producto fallido');
				this.productoForm.reset();
			});
		}else {
			// Agregamos producto
			console.log(PRODUCTO);
			this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
				this.toastr.success('El producto fue registrado con éxito', 'Producto Registrado');
				this.router.navigate(['/']);
			}, error => {
				console.log(error);
				this.toastr.error('El producto no se pudo registrar', 'Agregar Producto fallido');
				this.productoForm.reset();
			});
		}

		
	}

	esEditar() {
		if(this.id !== null) {
			this.titulo = 'Editar producto';
			this._productoService.obtenerProducto(this.id).subscribe(data => {
				this.productoForm.setValue({
					producto: data.nombre,
					categoria: data.categoria,
					ubicacion: data.ubicacion,
					precio: data.precio
				});
			});
		}
	}
}
