import { Component, OnInit } from '@angular/core';
import {collection,
  Firestore,
  getDocs,
  doc,
  updateDoc,
  } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 public data:any =[]
  constructor(private firestore:Firestore,private router:Router) { 
    this.getData()
  }
  getData() {
    const dbInstance = collection(this.firestore, 'Products');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }
  ngOnInit(): void {
  }
  detalis(id:string){
    this.router.navigate(['/product/'+id])
  }

 
        
}
