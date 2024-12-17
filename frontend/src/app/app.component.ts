import { Component, Inject, PLATFORM_ID } from "@angular/core";
// import { isPlatformBrowser } from '@angular/common';

import { LoadingBarService } from "@ngx-loading-bar/core";
import { TranslateService } from "@ngx-translate/core";
import { delay, map, withLatestFrom } from "rxjs/operators";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map((v) => v[1])
  );

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService,
    private translate: TranslateService
  ) {
    // this.store.dispatch(UserActions.loadUserSession());
    // this.store.dispatch(loadPreviewLanguage());
    // this.language$.subscribe((language) => {
    //   this.translate.use(language);
    // });
    // if (isPlatformBrowser(this.platformId)) {
    //   translate.setDefaultLang('en');
    //   translate.addLangs(['en', 'de', 'es', 'fr', 'pt', 'cn', 'ae']);
    // }
  }
}
