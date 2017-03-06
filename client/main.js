import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

document.addEventListener('touchstart', function(e) {

    var touch = e.touches[0];
    $('#touchx').val(touch.pageX)
    $('#touchy').val(touch.pageY)

}, false);

Meteor.startup(function() {
    // Here we can be sure the plugin has been initialized

});

Template.example.onRendered(function() {


})


if (Meteor.isCordova) {

  Template.barcode_scanner.events({
    'click #vibrar': function() {
      navigator.vibrate(3000)
    },
    'click #geo': function() {



      var options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0
      };

      function success(pos) {
        var crd = pos.coords;

        alert('Sua posição atual é: \nLatitude : ' + crd.latitude + '\nLongitude: ' + crd.longitude + ' \nMargem de erro de mais ou menos ' + Number(crd.accuracy).toFixed(0) + ' metros.');

      };

      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);



    },
    'click #acelerometro': function() {
      function onSuccess(acceleration) {

        $('#x').val(Number(acceleration.x).toFixed(2))
        $('#y').val(Number(acceleration.y).toFixed(2))
        $('#z').val(Number(acceleration.z).toFixed(2))

      }

      function onError() {
        alert('onError!');
      }

      var options = { frequency: 300 };  // Update every 3 seconds

      var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

    },
    'click #scan': function () {

      cordova.plugins.barcodeScanner.scan(
        function (result) {
          alert("We got a barcode\n" +
          "Result: " + result.text + "\n" +
          "Format: " + result.format + "\n" +
          "Cancelled: " + result.cancelled);
        },
        function (error) {
          alert("Scanning failed: " + error);
        }
      );

    }

  });


  Template.example.events({
    'click .takePhoto': function(e, instance) {
      e.preventDefault();
      var cameraOptions = {
        width: 800,
        height: 600
      };
      MeteorCamera.getPicture(cameraOptions, function (error, data) {
        if (!error) {
          instance.$('.photo').attr('src', data);
        }
      });
    }
  });

}
