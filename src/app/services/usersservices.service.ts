import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc} from '@angular/fire/firestore';
import {  from,  Observable, of, switchMap } from 'rxjs';
import{ProductUser} from '../models/products';
import { ProfileUser } from '../models/user';

import { AuthservicesService } from '../services/authservices.service';

@Injectable({
  providedIn: 'root'
})
export class UsersservicesService {

  constructor(private firestore: Firestore, private authserv: AuthservicesService) { 
   
  }
 
  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authserv.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }
  get currentUserProducts$(): Observable<ProductUser | null> {
    return this.authserv.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'Products', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }


  addUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }
  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }
  addpro(products: ProductUser,user:ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'Products', user.uid);
    return from(setDoc(ref, products));
  }
  
}
