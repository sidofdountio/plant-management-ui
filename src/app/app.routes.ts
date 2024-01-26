import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HistoricComponent } from './toolbar/watering/history/historic.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AddPlantComponent } from './toolbar/plant/add-plant/add-plant.component';
import { AdminComponent } from './admin/admin.component';

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
    }
];

export default routes;
