import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators,} from '@angular/forms';
import { traceUntilFirst } from '@angular/fire/performance';
import { UsersservicesService } from '../services/usersservices.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import {collection,
 
  addDoc,
  Firestore,
  
  getDocs,
  doc,
  updateDoc,
  deleteDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {
  
  productMyForm = new FormGroup(
    {
      title: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', Validators.required),
    
    },
  );
uid:any
  public data: any = []
  constructor(public firestore: Firestore,private userserv:UsersservicesService) {
    this.userserv.currentUserProfile$.subscribe(user=>{
      this.uid=user?.uid
    })
    this.getData()
  }
  ngOnInit(): void {
    
  }

  addProduct(value: any) {
    const dbInstance = collection(this.firestore, 'Products');
    addDoc(dbInstance,{
     title:value.title,
     description:value.description,
     image:value.image,
    uid:this.uid
    })
   
      .then(() => {
     
        alert('Data Sent');
        window.location.reload()
      })
      .catch((err) => {
        alert(err.message)
      })
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

 
 
  updateData(id:string) {
    const dataToUpdate = doc(this.firestore, 'Products',id);
    updateDoc(dataToUpdate, {
      title:this.data.title,
      description: this.data.description,
      image:this.data.image
    })
      .then(() => {
        alert('Data updated');
        this.getData()
        window.location.reload()
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  deleteData(id: string) {
    const dataToDelete = doc(this.firestore, 'Products', id);
    deleteDoc(dataToDelete)
    .then(() => {
      alert('Data Deleted');
      this.getData()
      window.location.reload()
    })
    .catch((err) => {
      alert(err.message)
    })
  }
}
    
  



