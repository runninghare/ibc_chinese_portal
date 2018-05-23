import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'web-animations-js/web-animations.min';
import {enableProdMode} from '@angular/core';
import { ENV } from '@app/env';

// import * as $ from 'jquery';

import { AppModule } from './app.module';

if (ENV.mode == 'Production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
