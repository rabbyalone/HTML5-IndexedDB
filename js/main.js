

//index page 

$(function () {
    function randomText() {
        var tech = 'Bootstrap 3,jQuery,JavaScript,IndexedDB'.split(','),
            keep = "";
        for (var i = 0, j = tech.length; i < j; i++) {
            keep = tech[Math.floor(Math.random() * 4)];
        }
        return keep;
    }
    setInterval(function () {
        $('#tech').html(randomText)
        //.slideToggle(5000)

    }, 2000)

    $(".slides").BackgroundSlider();
});



//contact map


   
function initialize() {
    var latlng = new google.maps.LatLng(23.752352, 90.381678);
    var mapOptions = {
        center: latlng,
        zoom: 14,
        draggable: true,
    }
    var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
    var marker = new google.maps.Marker({
        position: map.getCenter(),
        icon: {
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
            scale: 10
        },
        title: "Just Find Me Here",
        map: map
    });
    var styles = [
{
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
        {
            "saturation": 36
        },
        {
            "color": "#000000"
        },
        {
            "lightness": 40
        }
    ]
},
{
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [
        {
            "visibility": "on"
        },
        {
            "color": "#000000"
        },
        {
            "lightness": 16
        }
    ]
},
{
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 20
        }
    ]
},
{
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 17
        },
        {
            "weight": 1.2
        }
    ]
},
{
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 20
        }
    ]
},
{
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 21
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 17
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 29
        },
        {
            "weight": 0.2
        }
    ]
},
{
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 18
        }
    ]
},
{
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 16
        }
    ]
},
{
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 19
        }
    ]
},
{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#000000"
        },
        {
            "lightness": 17
        }
    ]
}
    ]
    map.setOptions({ styles: styles });

    //marker.setMap(map);
}




