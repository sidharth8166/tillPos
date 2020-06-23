function initialize() {
    var test_form = { locality: 'short_name', sublocality: 'long_name', administrative_area_level_2: 'short_name', country: 'long_name', postal_code: 'short_name' };

    var acInputs = document.getElementsByClassName("autocomplete");

    for (var i = 0; i < acInputs.length; i++) {

        var autocomplete = new google.maps.places.Autocomplete(acInputs[i]);
        autocomplete.inputId = acInputs[i].id;
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                var lat = place.geometry.location.lat();
                var lng = place.geometry.location.lng();
                $("#lat").val(lat);
                $("#lng").val(lng);
            }
        });
    }
}

initialize();

function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $.dialog({
                icon: 'fa fa-alert',
                title: 'Geolocation Not Availbale !!',
                content: 'Please type locality manually',
                type: 'green',
                backgroundDismiss: true,
                bgOpacity: 0.2
            });
        }
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'latLng': latlng
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var location = results[1].formatted_address;
                    location = location.split(", ");
                    $('#address').val(location);
                    $("#lat").val(lat);
                    $("#lng").val(lng);
                }
            }
        });
    }