import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/layout/components/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
    // canActivate: [NoAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./modules/auth/pages/login/login.component').then(c => c.LoginComponent),
        title: 'Login'
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./modules/auth/pages/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent),
        title: 'Forgot Password'
      },
      {
        path: 'register',
        loadComponent: () => import('./modules/auth/pages/register/register.component').then(c => c.RegisterComponent),
        title: 'Register'
      },
      {
        path: 'recovery',
        loadComponent: () => import('./modules/auth/pages/recovery/recovery.component').then(c => c.RecoveryComponent),
        title: 'Recovery'
      },
    ]
  },

  {
    path: 'home',
    loadComponent: () => import('./modules/layout/components/app-layout/app-layout.component').then(c => c.AppLayoutComponent),
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent:() => import('./modules/workspaces/pages/boards/boards.component').then(c => c.BoardsComponent),
        title: 'Boards'
      },
      {
        path: 'board',
        loadComponent:() => import('./modules/workspaces/pages/board/board.component').then(c => c.BoardComponent),
        title: 'Board'
      },
      // {
      //   path: 'profile',
      //   loadComponent:() => import('./modules/profile/pages/profile/profile.component'),
      // },
      // {
      //   path: 'users',
      //   loadComponent:() => import('./modules/users/pages/users-table/users-table.component'),
      // },
    ]
  },
  {
    path: 'board',
    redirectTo: 'home/board',
    pathMatch: 'full'
  },

  // Catch-all route for any unmatched routes
  {
    path: '**',
    redirectTo: ''
  }
];
