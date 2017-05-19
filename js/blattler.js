var loadingTime = 100;

// ========================================================================
// =========================== A L L   P A G E S ==========================
// ========================================================================

$(window).on("orientationchange", function(event) {
    //console.log("orientationchange");
    initializeApp();
});

$(window).on("resize", function(event) {
    //console.log("resize");
    initializeApp();
});

// ========================================================================
// =========================== M A I N   P A G E ==========================
// ========================================================================

var useSmallImages = false;

$(document).on("pageinit", "#mainpage", function(event) {
    initializeApp();
});


/**
 * back-button pressed
 */
function onBackPressed() {
    // map
	var activePage = $.mobile.activePage;
	console.log(activePage);
	console.log(activePage.attr('id') );
	// $( ".selector" ).pagecontainer( "getActivePage" );
    if ($.mobile.activePage.attr('id') === "mappage") {
        $.mobile.changePage("#mainpage");
        return;
    }

    if ($.mobile.activePage.attr('id') === "datapage") {
        $.mobile.changePage("#mainpage");
        return;
    }

    if ($.mobile.activePage.attr('id') === "linkpage") {
        $.mobile.changePage("#mainpage");
        return;
    }

    if ($.mobile.activePage.attr('id') === "zoomdialog") {
        $.mobile.changePage("#mainpage");
        return;
    }

    if ($.mobile.activePage.attr('id') === "cachedialog") {
        $.mobile.changePage("#mainpage");
        return;
    }

    control.quit();
}

function checkSmallImages() {
    var w = $(window).width();
    var h = $(window).height();
    var dpi = window.devicePixelRatio;
    //console.log("pageinit w:" + w + " h:" + h + " dpi:" + dpi);

    if (w * dpi <= 800 && h * dpi <= 800) {
        //console.log("use small images");
        useSmallImages = true;
    } else {
        //console.log("use large images");
        useSmallImages = false;
    }
}

/**
 * helper function, add image or small image to content
 * @param {object} $content
 * @param {string} id
 */
function addImage($content, id) {
    var path = useSmallImages ? "images/small/" : "images/";
    $content.append("<div class='preview'><img src='" + path + id + ".jpg' alt=''/></div>");
}

/**
 * add zoom functionality to image
 */
function addZoom() {
    $(".preview img").click(function(e) {
        zoom($(this), e);
    });
}

/**
 * show index page
 */
function showIndex() {
    $.mobile.changePage("#mainpage");
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images
}

/**
 * zoom an image
 * 
 * @param {object} image
 * @param {object} e
 * @returns {undefined}
 */
function zoom(image, e) {
    if ($(window).width() > 640) {
        // tablet or pc
        $(".preview").removeClass("zoom");  // disable zoom
        return;
    } else {

        var dialogHeight = $(window).height() * 0.8;
        var dialogWidth = $(window).width() * 0.925;

        var $content = $("#zoomdialog div[data-role='content']");
        $content.html("");    // clear images
        $content.height(dialogHeight);   // limit max heigth

        var src = image.attr("src");
        $content.append("<img id='zoomed' src='" + src + "' alt=''/>");
        //$content.append("<img class='zoom' src='" + src + "' alt=''/>");

        var imageZoomedWidth = image.width() * 2;
        var imageZoomedHeight = imageZoomedWidth * 1.35;
        $("#zoomed").width(imageZoomedWidth);

        // save click position
        var posX = (e.pageX - image.position().left);
        var posY = (e.pageY - image.position().top);
        var x = posX / image.width(); // relative to image
        var y = posY / image.height(); // relative to image       

        var p = (y * (imageZoomedHeight - dialogHeight));

        $content.animate({
            'scrollTop': p
        }, {duration: 1000, queue: false});

        $content.animate({
            'scrollLeft': x * dialogWidth
        }, {duration: 1000, queue: false});

        $.mobile.changePage("#zoomdialog", {role: "dialog"});
    }
}

/**
 * initialize app (pageinit, orientationchange, resize), enable or disable splitview and zoom
 */
function initializeApp() {
    $.mobile.defaultPageTransition = 'none';

    checkSmallImages();

    var window_width_em = 1 / 16 * $(window).width();
    //console.log("initializeApp " + $(window).width() + "/" + $(window).height() + "px " + window_width_em + "/" + (1 / 16 * $(window).height()) + "em");

    //initializeApp 751/947px 46.9375/59.1875em (11:56:58:408)
    //initializeApp 383/586px 23.9375/36.625em 
}

// ========================================================================
// =========================== D A T A   P A G E ==========================
// ========================================================================

/**
 * remove all header classes
 */
function removeBackgroundAndHeaderClasses() {
    $("#datapageheader").removeClass("bfvheader-e");    // weiss
    $("#datapage").removeClass("ui-body-e");
    $("#datapage").removeClass("ui-overlay-e");

    $("#datapageheader").removeClass("bfvheader-f");    // gelb
    $("#datapage").removeClass("ui-body-f");
    $("#datapage").removeClass("ui-overlay-f");

    $("#datapageheader").removeClass("bfvheader-g");    // gruen
    $("#datapage").removeClass("ui-body-g");
    $("#datapage").removeClass("ui-overlay-g");

    $("#datapageheader").removeClass("bfvheader-h");    // rot
    $("#datapage").removeClass("ui-body-h");
    $("#datapage").removeClass("ui-overlay-h");

    $("#datapageheader").removeClass("bfvheader-i");    // blau
    $("#datapage").removeClass("ui-body-i");
    $("#datapage").removeClass("ui-overlay-i");

    $("#datapageheader").removeClass("bfvheader-j");    // orange
    $("#datapage").removeClass("ui-body-j");
    $("#datapage").removeClass("ui-overlay-j");

    $("#datapageheader").removeClass("bfvheader-k");    // violet
    $("#datapage").removeClass("ui-body-k");
    $("#datapage").removeClass("ui-overlay-k");
}

function showLoader() {
    $.mobile.loading('show', {text: "Lädt...", textVisible: true});
}

function changePageHideLoader() {
    setTimeout(function() {
        $.mobile.changePage("#datapage");
        $.mobile.loading('hide');
    }, loadingTime);
}

function showGams() {
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "1");
    addImage($content, "81");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-e");
    $("#datapage").addClass("ui-body-e");
    $("#datapage").addClass("ui-overlay-e");

    changePageHideLoader();
}

function showKennzeichnung() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "3");
    addImage($content, "4");
    addImage($content, "5");
    addImage($content, "6");
    addImage($content, "7");
    addImage($content, "8");
    addImage($content, "9");
    addImage($content, "10");
    addImage($content, "11");
    addImage($content, "12");
    addImage($content, "13");
    addImage($content, "14");
    addImage($content, "15");
    addImage($content, "16");
    addImage($content, "17");
    addImage($content, "18");
    addImage($content, "19");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-e");
    $("#datapage").addClass("ui-body-e");
    $("#datapage").addClass("ui-overlay-e");

    changePageHideLoader();
}

function showGefahrnummer() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "20");
    addImage($content, "21");
    addImage($content, "22");
    addImage($content, "23");
    addImage($content, "24");
    addImage($content, "25");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-e");
    $("#datapage").addClass("ui-body-e");
    $("#datapage").addClass("ui-overlay-e");

    changePageHideLoader();
}

function showGasflaschen() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "26");
    addImage($content, "27");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-e");
    $("#datapage").addClass("ui-body-e");
    $("#datapage").addClass("ui-overlay-e");

    changePageHideLoader();
}

function showBio() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "28");
    addImage($content, "29");
    addImage($content, "30");
    addImage($content, "31");
    addImage($content, "32");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-g");
    $("#datapage").addClass("ui-body-g");
    $("#datapage").addClass("ui-overlay-g");

    changePageHideLoader();
}

function showStrahlenschutz() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "33");
    addImage($content, "34");
    addImage($content, "35");
    addImage($content, "36");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-f");
    $("#datapage").addClass("ui-body-f");
    $("#datapage").addClass("ui-overlay-f");

    changePageHideLoader();
}

function showMenschenrettung() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "37");
    addImage($content, "38");
    addImage($content, "39");
    addImage($content, "40");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-h");
    $("#datapage").addClass("ui-body-h");
    $("#datapage").addClass("ui-overlay-h");

    changePageHideLoader();
}

function showEinsatzhygiene() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "41");
    addImage($content, "42");
    addImage($content, "43");
    addImage($content, "44");
    addImage($content, "45");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-h");
    $("#datapage").addClass("ui-body-h");
    $("#datapage").addClass("ui-overlay-h");

    changePageHideLoader();
}

function showPhotovoltaik() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "46");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-i");
    $("#datapage").addClass("ui-body-i");
    $("#datapage").addClass("ui-overlay-i");

    changePageHideLoader();
}

function showElektrizitaet() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "47");
    addImage($content, "48");
    addImage($content, "49");
    addImage($content, "50");
    addImage($content, "51");
    addImage($content, "52");
    addImage($content, "53");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-i");
    $("#datapage").addClass("ui-body-i");
    $("#datapage").addClass("ui-overlay-i");

    changePageHideLoader();
}

function showGleisbereich() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "54");
    addImage($content, "55");
    addImage($content, "56");
    addImage($content, "57");
    addImage($content, "58");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-i");
    $("#datapage").addClass("ui-body-i");
    $("#datapage").addClass("ui-overlay-i");

    changePageHideLoader();
}

function showAlternativantrieb() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "60");
    addImage($content, "61");
    addImage($content, "62");
    addImage($content, "63");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-i");
    $("#datapage").addClass("ui-body-i");
    $("#datapage").addClass("ui-overlay-i");

    changePageHideLoader();
}

function showChecklisten() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "64");
    addImage($content, "65");
    addImage($content, "66");
    addImage($content, "67");
    addImage($content, "68");
    addImage($content, "69");
    addImage($content, "70");
    addImage($content, "71");
    addImage($content, "72");
    addImage($content, "73");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-j");
    $("#datapage").addClass("ui-body-j");
    $("#datapage").addClass("ui-overlay-j");

    changePageHideLoader();
}

function showGrenzwerte() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "77");
    addImage($content, "78");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-k");
    $("#datapage").addClass("ui-body-k");
    $("#datapage").addClass("ui-overlay-k");

    changePageHideLoader();
}

function showKenndaten() {
    showLoader();
    var $content = $("#datapage div[data-role='content']");
    $content.html("");    // clear images

    addImage($content, "79");
    addImage($content, "80");
    addZoom();

    removeBackgroundAndHeaderClasses();
    $("#datapageheader").addClass("bfvheader-k");
    $("#datapage").addClass("ui-body-k");
    $("#datapage").addClass("ui-overlay-k");

    changePageHideLoader();
}

function showLinks() {
    $.mobile.changePage("#linkpage");
}


// ========================================================================
// =========================== M A P   P A G E ============================
// ========================================================================

var map;
var overlays;
var currentLocation;
var currentLocationMarker;

/** initialize open street maps */
function initializeMap() {

    overlays = new Array();
    currentLocation = null;   // current gps position
    currentLocationMarker = null;
    map = L.map('map');

    // create the tile layer
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Kartendaten © OpenStreetMap';
    var osm = new L.TileLayer(osmUrl, {minZoom: 6, maxZoom: 18, attribution: osmAttrib});

    // legend
    var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'legend');
        div.innerHTML += '<i style="background:#FF0000"></i> 30m<br />';
        div.innerHTML += '<i style="background:#FF7700"></i> 60m<br />';
        div.innerHTML += '<i style="background:#FFFF00"></i> 300m<br />';
        div.innerHTML += '<i style="background:#00FF00"></i> 1000m<br />';
        return div;
    };
    legend.addTo(map);

    // locate button
    var locateButton = L.control({position: 'bottomright'});
    locateButton.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'mapButton');
        div.innerHTML += 'Lokalisieren';

        L.DomEvent
                .addListener(div, 'click', L.DomEvent.stopPropagation)
                .addListener(div, 'click', L.DomEvent.preventDefault)
                .addListener(div, 'click', function() {
                    if (currentLocation !== null) {
                        map.setView(currentLocation, 16);
                    } else {
                        control.showMessage("Keine Koordinaten verfügbar");
                    }
                });
        return div;
    };
    locateButton.addTo(map);

    // image button
    var captureButton = L.control({position: 'bottomright'});
    captureButton.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'mapButton');
        div.innerHTML += 'Screenshot';

        L.DomEvent
                .addListener(div, 'click', L.DomEvent.stopPropagation)
                .addListener(div, 'click', L.DomEvent.preventDefault)
                .addListener(div, 'click', function() {
                    control.createScreencapture();
                });
        return div;
    };
    captureButton.addTo(map);
    
    // show map
    map.setView(new L.LatLng(47.61, 13.782778), 9);    // Bad Aussee - Mittelpunkt Österreich
    map.addLayer(osm);

    // event listeners
    map.on('click', onMapClick);
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    // start locating
    map.locate({timeout: 60000, maximumAge: 60000, enableHighAccuracy: true, watch: true});
}


/** extract gps data and move to current position, set marker */
function onLocationFound(e) {
    currentLocation = e.latlng;

    if (currentLocationMarker === null) {
        // create new marker
        currentLocationMarker = L.marker(currentLocation);
        currentLocationMarker.on('click', onMapClick);
        currentLocationMarker.addTo(map);

        map.setView(currentLocation, 16);
    } else {
        // change marker position
        currentLocationMarker.setLatLng(currentLocation);
    }
}

/** error while accessing gps location 
 * 
 * @param {type} error
 */
function onLocationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            stopGPSWatch();
            control.showMessage("Keine Berechtigung für GPS");
            break;
        case error.POSITION_UNAVAILABLE:
            control.showMessage("Keine GPS Position verfügbar");
            break;
        case error.TIMEOUT:
            control.showMessage("Keine GPS Position verfügbar");
            break;
        default:
            control.showMessage("GPS Fehler");
            //control.showMessage("Unbekannter GPS Fehler: " + error.message);
            break;
    }
}

/** place new oder change overlays */
function onMapClick(e) {
    if (overlays.length === 0) {

        overlays[0] = L.circle(e.latlng, 30, {
            color: '#FF0000',
            weight: 2,
            opacity: 0.8,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });
        overlays[0].addTo(map);

        overlays[1] = L.circle(e.latlng, 60, {
            color: '#FF7700',
            weight: 2,
            opacity: 0.8,
            fillColor: '#FF7700',
            fillOpacity: 0.35
        });
        overlays[1].addTo(map);

        overlays[2] = L.circle(e.latlng, 300, {
            color: '#FFFF00',
            weight: 2,
            opacity: 0.8,
            fillColor: '#FFFF00',
            fillOpacity: 0.25
        });
        overlays[2].addTo(map);

        overlays[3] = L.circle(e.latlng, 1000, {
            color: '#00FF00',
            weight: 2,
            opacity: 0.8,
            fillColor: '#00FF00',
            fillOpacity: 0.25
        });
        overlays[3].addTo(map);

    } else {
        // reposition overlays
        overlays[0].setLatLng(e.latlng);
        overlays[1].setLatLng(e.latlng);
        overlays[2].setLatLng(e.latlng);
        overlays[3].setLatLng(e.latlng);
    }
}

/**
 * stop watching for gps positions
 */
function stopGPSWatch() {
    if (map !== null) {
        map.stopLocate();
    }
}

$(document).on('pageshow', '#mappage', function() {
    // height fix on tablets...
    var h = $(window).height();
    $("#mappage").height(h-42);
    $("#map").height(h-42);
    
    initializeMap();
    map.invalidateSize(false);
});

$(document).on('pagehide', '#mappage', function() {
    stopGPSWatch();

    if (map !== null) {
        map.remove();
    }
});