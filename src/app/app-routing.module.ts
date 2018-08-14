import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NoteListComponent } from './modules/note/note-list/note-list.component';
import { CheckAuthGuard } from './guards/check-auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'notes',
        pathMatch: 'full'
    },
    { path: 'login',
        component: LoginComponent,
        data: { nameView: 'sign in' }
    },
    { path: 'registration',
        component: RegistrationComponent,
        data: { nameView: 'sign up'}
    },
    { path: 'notes',
        component: NoteListComponent,
        data: { nameView: 'note app' },
        canActivate: [ CheckAuthGuard ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
