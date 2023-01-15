import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CallComponent } from './components/call/call.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationGuardService } from './services/guards/navigation-guard.service';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'admin', component: AdminDashboardComponent },
	{ path: ':roomName', component: CallComponent, canActivate: [NavigationGuardService] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
