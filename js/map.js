var mymap = L.map('mapid').setView([47.218371, -1.553621], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OSM France',
    minZoom: 13,
    maxZoom: 16
}).addTo(mymap);
