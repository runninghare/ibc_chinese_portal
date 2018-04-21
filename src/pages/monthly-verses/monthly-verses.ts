import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import { EnvVariables } from '../../app/environment/environment.token';
import { IbcStyleProvider } from '../../providers/ibc-style/ibc-style';

/**
 * Generated class for the MonthlyVersesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monthly-verses',
  templateUrl: 'monthly-verses.html',
})
export class MonthlyVersesPage {

    private targetUrl: string;
    private verse_pictures: string[] = [];
    public loading: boolean = false;

    error: string;

    bgColor: string;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public platform: Platform, 
        private http: Http,
        private ibcStyle: IbcStyleProvider,
        @Inject(EnvVariables) public envVariables
    ) {

        // this.verse_pictures = ["http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/150701-Memory-Verse-July-2015-fb-web.jpg-nggid03192-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.jpg","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/150801-Memory-Verse-August-2015-fb-web.jpg-nggid03193-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.jpg","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/150901-Memory-Verse-September-2015-fb-web.jpg-nggid03194-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.jpg","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/151001-Memory-Verse-October-2015-fb-web.jpg-nggid03195-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.jpg","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/151101-Memory-Verse-November-fb-web.png-nggid03196-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/151201-Memory-Verse-December-2015-fb-web.fw_.png-nggid03197-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/160101-Memory-Verse-January-2016-fb-web.fw_.png-nggid03198-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/160201-Memory-Verse-February-2016-fb-web.fw_.png-nggid03199-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/160301-Memory-Verse-March-2016-fb-web.fw_.png-nggid03200-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/160401-Memory-Verse-April-2016-fb-web.fw_.png-nggid03201-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/160501-Memory-Verse-May-2016-fb-web.fw_.png-nggid03202-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/160601-Memory-Verse-June-2016-fb-web.fw_.png-nggid03203-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/160701-Memory-Verse-July-2016-fb-web.fw_.png-nggid03204-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/160801-Memory-Verse-August-2016-fb-web.fw_.png-nggid03205-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/160901-Memory-Verse-September-2016-fb-web.jpg-nggid03206-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.jpg","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/161001-Memory-Verse-October-2016-fb-web.jpg-nggid03207-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.jpg","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/170201-Memory-Verse-February-2017-fb-web.fw_.png-nggid03208-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/170301-Memory-Verse-March-2017-fb-web.fw_.png-nggid03209-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/170401-Memory-Verse-April-2017-fb-web.fw_.png-nggid03210-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/170501-Memory-Verse-May-2017-fb-web.fw_.png-nggid03211-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/170601-Memory-Verse-June-2017-fb-web.fw_.png-nggid03213-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png","http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/170701-Memory-Verse-July-2017-fb-web.fw_.png-nggid03212-ngg0dyn-400x200x100-00f0w010c011r110f110r010t010.png"];
        // let churchPageUrl = 'http://www.islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/';

        // console.log("--- env variables ---");
        // console.log(this.envVariables);

        this.bgColor = this.ibcStyle.randomBg;

        this.targetUrl = "http://35.201.28.240/jsdom";

        // http.get(this.targetUrl).subscribe((data) => {
        //     console.log("=== data comes! ===");
        // })
        // 
        // 
        this.loading = true;
        
        this.http.get(`${this.envVariables.apiServer}/jsdom`).subscribe(
            (res) => {
                let data = res.json();
                this.verse_pictures = data.message;
                // this.verse_pictures = data.contents.match(/href=".*400x200x100[^"]*/g).map(url => "http://islingtonbaptist.org.au/hp_wordpress/wp-content/uploads/gallery/memory-verses-1/dynamic/" + url.replace("href=\"", ""));
            }, (err) => {
                this.error = err;
            }, () => {
                this.loading = false;
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MonthlyVersesPage');
    }

}
