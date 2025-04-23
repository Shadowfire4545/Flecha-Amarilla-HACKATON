import { Component } from '@angular/core';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent { 
  currentYear = new Date().getFullYear();
  applicationVersion = Constants.applicationVersion;
}
