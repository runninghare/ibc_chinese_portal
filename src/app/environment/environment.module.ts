import { NgModule } from '@angular/core';
import { EnvVariables } from './environment.token';
import { environment as devVariables } from './development';
import { environment as prodVariables } from './production';
import { ENV } from '@app/env';

declare const process: any; // Typescript compiler will complain without this

export function environmentFactory() {
    console.log("----> ENV Injection: ");
    // console.log(JSON.stringify(process.env));

    console.log(ENV);
    return process.env.IONIC_ENV === 'prod' ? prodVariables : devVariables;
}

@NgModule({
  providers: [
    {
      provide: EnvVariables,
      // useFactory instead of useValue so we can easily add more logic as needed.
      useFactory: environmentFactory
    }
  ]
})
export class EnvironmentsModule {}