import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'web-animations-js/web-animations.min';
// import * as $ from 'jquery';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
