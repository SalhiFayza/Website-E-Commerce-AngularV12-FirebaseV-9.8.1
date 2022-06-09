import { Component, OnInit } from '@angular/core';
import {collection,
  Firestore,
  getDocs,
  doc,
  updateDoc,
  } from '@angular/fire/firestore';
  import {FormControl,FormGroup,Validators,} from '@angular/forms';
import { UsersservicesService } from '../services/usersservices.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$ = this.userserv.currentUserProfile$;
  productMyForm = new FormGroup(
    {
      title: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', Validators.required),
    
    },
  );
public data:any=[]

  constructor(private firestore:Firestore,
     private userserv:UsersservicesService,) { 
this.getData()
  }
  getData() {
    const dbInstance = collection(this.firestore, 'users');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }
  ngOnInit(): void {
    
  }

  updateData(uid:string) {

    const dataToUpdate = doc(this.firestore, 'users',uid);
    updateDoc(dataToUpdate, {
      displayName:this.data.displayName,
      bio: this.data.bio,
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



 

}
