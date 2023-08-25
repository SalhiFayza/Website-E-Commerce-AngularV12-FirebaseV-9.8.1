import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SingupComponent } from './singup/singup.component';
import { ProductsComponent } from './products/products.component';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { ProfileComponent } from './profile/profile.component';
import { GuardService } from './services/guard/guard.service';
import { NoguardService } from './services/guard/noguard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
const routes: Routes = [
{path:'',component:HomeComponent},
{path:'login',component:LoginComponent,canActivate:[GuardService]},
{path:'logout',component:LogoutComponent},
{path:'singup',component:SingupComponent,canActivate:[GuardService]},
{path:'products',component:ProductsComponent,canActivate:[NoguardService]},
{path:'myproducts',component:MyproductsComponent,canActivate:[NoguardService]},
{path:'profile',component:ProfileComponent,canActivate:[NoguardService]},
{path:'product/:id',component:ProductsDetailsComponent},
{path:'**',component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
