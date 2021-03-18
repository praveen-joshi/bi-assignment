import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';
import {BehaviorSubject, Observable} from 'rxjs';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _productService:ProductService) { }
  products$;
  refreshProducts$=new BehaviorSubject<boolean>(false);
  ngOnInit(): void {
    //this.products$=<any>this._productService.getProducts();
    this.products$=this.refreshProducts$.pipe(switchMap( ()=>this._productService.getProducts()));
    //this.refreshProducts$.subscribe(l=>console.log(l));

  }


  DeleteProduct(id)
  {
    console.log("deleting"+id);
    this._productService.deleteProdcut(id).subscribe((res)=>{
      console.log(res);
      this.refreshProducts$.next(true);

      alert("deleted");
    },(err)=>{
      alert("Cant delete ");
      console.log(err);
    });
    
  }
}
