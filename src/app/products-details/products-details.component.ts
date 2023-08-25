import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { query } from 'firebase/firestore';
import {collection,
  Firestore,
  getDocs,
  doc,
  updateDoc,
  } from '@angular/fire/firestore';
import { title } from 'process';
@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
keyy:any
public data:any =[]
 


  constructor(private actrouter:ActivatedRoute,private fierstore:Firestore) { 
    this.actrouter.params.subscribe(keyq=>
      {
    return this.keyy= keyq['id']
      }
      )
      this.getData();
  }
  getData() {
    const dbInstance = collection(this.fierstore, 'Products');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }
  ngOnInit(): void {
  }

}
