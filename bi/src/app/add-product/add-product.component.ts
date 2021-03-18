import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  
  product=new Product;
  constructor(private _http:HttpClient,private _product:ProductService) { }
  image:File;
  

  onFileSelect(event){
    this.image=<File>event.target.files[0];
  }
  
  addProduct(product){
    let fd=new FormData();
    console.log(this.image)
    fd.append('image',this.image,this.image.name);
    fd.append("name",product.name);
    fd.append("price",product.price); 
    fd.append("description",product.description);

    this._product.addProduct(fd);
    this.product=new Product;
  }

  ngOnInit(): void {
  }
}
