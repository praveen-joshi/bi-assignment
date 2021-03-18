import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient) { }

  base_url="http://localhost:3000/";
  deleteProdcutUrl=this.base_url+"product/delete/";
  productsListUrl="http://localhost:3000/product";//all products
  ProdcutDetailUrl="http://localhost:3000/product/";
  addProductUrl=this.base_url+"product";
  editProductUrl="http://localhost:3000/product/edit_product/";

  getProducts(){
      return this._http.get(this.productsListUrl).pipe(map(res=>{
        for (let product in res)
        {
          res[product].image=(res[product] as any).image="http://localhost:3000/static/products/"+(res[product] as any).image;
        }
        return res;
      }));
  }

  getProduct(id)
  {
    return this._http.get(this.ProdcutDetailUrl+id).pipe(map(res=>{
      (res as any).image=(res as any).image="http://localhost:3000/static/products/"+(res as any).image;
    return res;
  }));
  }

  deleteProdcut(id){
    return this._http.get(this.deleteProdcutUrl+id);
  }

  addProduct(formData){
    console.log("hi");
    console.log(formData);

    this._http.post(this.addProductUrl,formData,{responseType: 'text'}).subscribe(()=>{
      alert("Successfully Added");
    });
  }

  editProduct(product,id){
    return this._http.post(this.editProductUrl+id,product,{responseType: 'text'});
  }

  

  }
