import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private _product:ProductService,private route:ActivatedRoute,private _http:HttpClient) { }

  product=new Product;
  

  ngOnInit(): void {
    const product_id=this.route.snapshot.paramMap.get('id');
    this._product.getProduct(product_id).subscribe((res)=>{
      this.product=<Product>res;
      this.product._id=product_id;
    });
  }


  editProduct(product){
    //this._http.post(this.editProductUrl+this.route.snapshot.paramMap.get('id'),product,{responseType: 'text'}).subscribe((res)=>{
      this._product.editProduct(product,this.route.snapshot.paramMap.get('id')).subscribe(()=>{
      alert("Successfully Edited")
      this.ngOnInit();
    },(res)=>{
      alert("cant edit");
        console.log(res);
    });
    
  }



}
