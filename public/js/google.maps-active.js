var mapData = {};

function canvasHeight(canvas) {
    $(canvas).height($(window).height());
    $(canvas).width($(window).width());
}

function loadMap(canvas) {
    var styledMapType = new google.maps.StyledMapType(
        [
            {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
            {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
            },
            {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
            }
        ],
        {name: 'Styled Map'});

    var mapOptions = {
        center: new google.maps.LatLng(36.4875, -4.9525),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        // mapTypeControl: false,
        // streetViewControl: false,
        // zoomControlOptions: {
        //     position: google.maps.ControlPosition.RIGHT_BOTTOM
        // },
        // disableDefaultUI: false,
        // zoomControl: false,
        // scaleControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        fullscreenControl: true
    };
    mapData.map = new google.maps.Map($(canvas)[0],
        mapOptions);
    mapData.marker = new google.maps.Marker({
        position: new google.maps.LatLng(36.4875, -4.9525),
        map: mapData.map,
        title: 'Hello World!'
    });
    google.maps.event.addListenerOnce(mapData.map, 'idle', function (e) {
        console.log("idle");
        $("#map .ui-content").append($("#mapPH #map-canvas"));
        // $("#map .ui-content").append($("#mapPH #map-canvas").append($("<a/>", {
        //     class: "ui-btn ui-mini ui-btn-inline ui-btn-b ui-corner-all forMap"
        // }).text("Lost?").on("click", function () {
        //     history.back();
        // }) /**/ ));
        $("#mapPH").remove();
    });

    google.maps.event.addListener(mapData.map, 'dragstart', function (e) {
        $(".forMap").animate({
            "opacity": 0.3
        }, 300);
    });

    google.maps.event.addListener(mapData.map, 'dragend', function (e) {
        $(".forMap").animate({
            "opacity": 1
        }, 700);
    });

    google.maps.event.addListener(mapData.marker, 'click', function (e) {
        console.log("marker");
    });
}

function centerMap() {
    mapData.map.setCenter(mapData.marker.getPosition());
}

$(document).one("pagecontainershow", function () {
    canvasHeight("#map-canvas");
    loadMap("#map-canvas");
});

$(window).on("throttledresize orientationchange", function () {
    canvasHeight("#map-canvas");
    centerMap();
});