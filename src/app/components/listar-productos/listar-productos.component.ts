import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
	selector: 'app-listar-productos',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule
	],
	templateUrl: './listar-productos.component.html',
	styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent {

	constructor(private _productoService: ProductoService) {}

	ngOnInit(): void {
		this.obtenerProductos();
	}

	obtenerProductos() {
		this._productoService.getProductos().subscribe(data => {
			console.log(data);
		}, error => {
			console.log(error);
		});
	}
}
