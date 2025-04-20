import { Component, OnInit } from "@angular/core";
import { environment } from "environments/environment";

@Component({
  selector: "app-map",
  templateUrl: "map.component.html",
})
export class MapComponent implements OnInit {
  private map: google.maps.Map | undefined;

  constructor() {}

  ngOnInit(): void {
    this.loadGoogleMapsScript()
      .then(() => {
        this.initMap();
      })
      .catch((error) => {
        console.error("Error loading Google Maps script:", error);
      });
  }

  // Initialize the Google Map
  private initMap(): void {
    const myLatlng = new google.maps.LatLng(40.748817, -73.985428); // Example coordinates (New York)
    const mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, // Disable scroll on the map to avoid interference with page scrolling
      styles: this.getMapStyles(), // Apply custom styles
    };

    const mapElement = document.getElementById("map") as HTMLElement;
    this.map = new google.maps.Map(mapElement, mapOptions);

    // Add a marker to the map
    const marker = new google.maps.Marker({
      position: myLatlng,
      title: "Hello World!",
    });

    marker.setMap(this.map); // Attach the marker to the map
    console.log("Google Maps initialized successfully.");
  }

  // Define custom styles for the map
  private getMapStyles(): google.maps.MapTypeStyle[] {
    return [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#1d2c4d",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8ec3b9",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1a3646",
          },
        ],
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#4b6878",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#64779e",
          },
        ],
      },
      {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#4b6878",
          },
        ],
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#334e87",
          },
        ],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
          {
            color: "#023e58",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#283d6a",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#6f9ba5",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1d2c4d",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#023e58",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#3C7680",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#304a7d",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#98a5be",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1d2c4d",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#2c6675",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#9d2a80",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#9d2a80",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#b0d5ce",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#023e58",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#98a5be",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1d2c4d",
          },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#283d6a",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#3a4762",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#0e1626",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#4e6d70",
          },
        ],
      },
    ];
  }

  // Dynamically load the Google Maps script
  private loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if Google Maps API is already loaded
      if ((window as any).google && (window as any).google.maps) {
        resolve();
      } else {
        // Define a global callback function
        (window as any).initMap = () => {
          resolve();
        };

        // Create the script element
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMaps.apiKey}&loading=async&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
      }
    });
  }
}
