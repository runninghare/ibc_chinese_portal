import { Component, Input, OnInit } from '@angular/core';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
// import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the IbcMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'ibc-map',
    templateUrl: 'ibc-map.html'
})
export class IbcMapComponent implements OnInit {

    @Input('lat') lat: number = 0;
    @Input('lng') lng: number = 0;
    @Input('title') title: string = "Target";
    @Input('address') address: string;
    @Input('height') height: string;

    map: GoogleMap;
    iframeUrl: string;

    sanitizedUrl: any;

    constructor(public common: CommonProvider, public nativeGeocoder: NativeGeocoder, public navLauncher: LaunchNavigator) {
        // platform.ready().then(() => {
        //     setTimeout(() => {
        //         this.loadMap();
        //     }, 500);
        // });
    }

    ngOnInit(): void {
        // console.log(`The address is ${this.address}`);

        if (this.common.isWeb && this.address) {
            this.iframeUrl = `https://maps.google.com/maps?width=100&height=600&hl=en&q=${this.address}&ie=UTF8&t=&z=14&iwloc=B&output=embed`;
            this.sanitizedUrl = this.common.sanitize(this.iframeUrl);
            return;
        } 

        if (!this.lat || !this.lng) {
            this.nativeGeocoder.forwardGeocode(this.address)
                .then((coordinates: NativeGeocoderForwardResult) => {
                    console.log('The coordinates are latitude=');
                    console.log(JSON.stringify(coordinates, null, 2));
                    if (coordinates && coordinates['length'] > 0) {
                        this.lat = coordinates[0].latitude;
                        this.lng = coordinates[0].longitude;

                        setTimeout(() => {
                            this.loadMap();
                        }, 500);
                    }
                })
                .catch((error: any) => console.log(error));
        } else {
            setTimeout(() => {
                this.loadMap();
            }, 500);
        }
    }

    loadMap() {
        let location = new GoogleMapsLatLng(this.lat, this.lng);

        this.map = new GoogleMap('map', {
            'backgroundColor': 'white',
            'controls': {
                'compass': true,
                'myLocationButton': true,
                'indoorPicker': true,
                'zoom': true
            },
            'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
            },
            'camera': {
                'latLng': location,
                'tilt': 30,
                'zoom': 15,
                'bearing': 50
            }
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
            this.map.addMarker({
                title: this.title,
                icon: 'blue',
                animation: 'DROP',
                position: location
            })
            .then(marker => {
                marker.on(GoogleMapsEvent.MARKER_CLICK)
                    .subscribe(() => {
                        alert('clicked');
                    });
            });
        });

    }

    geoNavigate() {
        this.navLauncher.navigate(this.address).then(() => {
        }, console.error);
    }

}
