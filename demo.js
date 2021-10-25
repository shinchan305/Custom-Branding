var properties = {};
(function getJSONFile() {
    $.ajax({
        url: 'https://client-1.local/customshowbranding/json/variables.json',
        type: 'GET',
        data: null,
        success: function (response) {
            properties = response;
            console.log(window.navigator);
            if (properties && Object.keys(properties).length) {
                for (var property in properties) {
                    if (property === '--generic-font-url') {
                        var filePathArray = properties[property].split("/");
                        console.log(filePathArray);
                        var request = new XMLHttpRequest();
                        // Downloading a font from the path
                        request.open('get', properties[property]);
                        request.responseType = 'arraybuffer';

                        request.addEventListener('readystatechange', function (e) {
                            if (request.readyState == 2 && request.status == 200) {
                                // Download is being started
                            }
                            else if (request.readyState == 3) {
                                // Download is under progress
                            }
                            else if (request.readyState == 4) {
                                // Downloading has finished

                                if (!$('head style[data-name="' + properties["--generic-font-name"] + '"]').length) {
                                    $('<style data-name="' + properties["--generic-font-name"] + '"></style>')
                                        .appendTo('head')
                                        .text('@font-face { font-family: "' + properties["--generic-font-name"] + '"; src: url("' + properties["--generic-font-url"] + '"); src: url("' + properties["--generic-font-url"] + '") format("truetype"); font-weight: normal; font-style: normal; font-stretch: normal; }');
                                }
                                // … show text with new font :)

                                // //request.response holds the binary data of the font                                                         
                                // var junction_font = new FontFace(properties["--generic-font-name"], request.response);
                                // junction_font.load().then(function (loaded_face) {
                                //     document.fonts.add(loaded_face);
                                //     // document.body.style.fontFamily = '"Junction Regular", Arial';
                                // }).catch(function (error) {
                                //     // error occurred
                                // });
                            }
                        });

                        request.send();
                    }
                    else if (property === '--demo-logo') {
                        //Since IE doesn't load images with content property, need to set the src
                        //attribute
                        $('.logo').attr('src', properties[property]);
                    }
                    else {
                        document.documentElement.style.setProperty(property, properties[property]);
                    }
                }
            }
        },
        error: function () { }
    });
})();

window.onload = function () {

    const redBtn = document.querySelector('#toggle-red');
    const blueBtn = document.querySelector('#toggle-blue');
    const greenBtn = document.querySelector('#toggle-green');

    redBtn.addEventListener('click', function (e) {

        console.log("red");
        document.documentElement.style.setProperty('--main-hue', properties["--red-hue"]);
    })

    blueBtn.addEventListener('click', function (e) {
        document.documentElement.style.setProperty('--main-hue', properties["--blue-hue"]);
    })

    greenBtn.addEventListener('click', function (e) {
        document.documentElement.style.setProperty('--main-hue', properties["--green-hue"]);
    })
};