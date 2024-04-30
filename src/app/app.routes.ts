import { Routes } from '@angular/router';
import { HistoricComponent } from './toolbar/watering/history/historic.component';
import { AddPlantComponent } from './toolbar/plant/add-plant/add-plant.component';
import { AdminComponent } from './admin/admin.component';
import { Demo17Component } from './demo17/demo17.component';

export const routes: Routes = [

    {
        path: '',
        component:AdminComponent,
        title:'Home'
    },
    {
        path: 'history',
        component:HistoricComponent,
        title:'waring-history'
    },
    {
        path: 'add-new-plant',
        component:AddPlantComponent,
        title:'Add New Plant'
    },
    {
        path: 'demo',
        component:Demo17Component,
        title:'demo'
    }
];

export default routes;
