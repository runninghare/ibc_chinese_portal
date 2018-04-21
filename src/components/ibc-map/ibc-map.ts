import { Component, Input } from '@angular/core';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Platform } from 'ionic-angular';

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
export class IbcMapComponent {

    @Input('lat') lat: number = 0;
    @Input('lng') lng: number = 0;
    @Input('title') title: string = "Target";
    @Input('address') address: string;
    @Input('height') height: string;

    map: GoogleMap;

    constructor(public platform: Platform, public nativeGeocoder: NativeGeocoder) {
        platform.ready().then(() => {
            setTimeout(() => {
                this.loadMap();
            }, 500);
        });

        this.nativeGeocoder.forwardGeocode('Berlin')
            .then((coordinates: NativeGeocoderForwardResult) => {
                console.log('The coordinates are latitude=');
            })
            .catch((error: any) => console.log(error));
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {

        let location = new GoogleMapsLatLng(this.lng, this.lat);

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

}
