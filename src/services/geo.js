import L from "leaflet";
import "leaflet-geometryutil";
import { create, all } from 'mathjs'

const config = {
  matrix: 'Array'
}
const math = create(all, config)

export function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

export function radiansToDegrees(radians) {
    return (radians / Math.PI) * 180;
}

export function distance(first, second) {
    var earthRadius = 6371000;

    var dLat = degreesToRadians(second[0] - first[0]);
    var dLon = degreesToRadians(second[1] - first[1]);

    var lat1 = degreesToRadians(first[0]);
    var lat2 = degreesToRadians(second[0]);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var completeDist = earthRadius * c;
    return completeDist;
}

export function interpolation(first, second, completeDist, distance) {
    var diff = distance / completeDist;
    var lat = (second[0] - first[0]) * diff + first[0];
    var long = (second[1] - first[1]) * diff + first[1];
    return [lat, long];
}

export function rotation(point, center, angle) {
    var x = ((point[0] - center[0]) * Math.cos(angle)) - ((point[1] - center[1]) * Math.sin(angle)) + center[0];
    var y = ((point[0] - center[0]) * Math.sin(angle)) + ((point[1] - center[1]) * Math.cos(angle)) + center[1];
    return [x, y];
}

export function metersToPixels(meters, map) {
    var l2 = L.GeometryUtil.destination(map.getCenter(), 90, meters);
    var p1 = map.latLngToContainerPoint(map.getCenter())
    var p2 = map.latLngToContainerPoint(l2)
    return p1.distanceTo(p2)

    var centerLatLng = map.getCenter();
    var pointC = map.latLngToContainerPoint(centerLatLng);
    var point = [pointC.x + 1, pointC.y];
    var latLngC = map.containerPointToLatLng(pointC);
    var latLng = map.containerPointToLatLng(point);
    return meters / latLngC.distanceTo(latLng);
}

export function project(lat, lon, map) {
    return map.project([lat, lon], map.getMaxZoom());
}

export function unproject(point, map) {
    return map.unproject(point, map.getMaxZoom());
}

export function angle(first, second) {
    const y = Math.sin(second[1] - first[1]) * Math.cos(second[0]);
    const x = Math.cos(first[0]) * Math.sin(second[0]) -
        Math.sin(first[0]) * Math.cos(second[0]) * Math.cos(second[1] - first[1]);
    const θ = Math.atan2(y, x);
    return (radiansToDegrees(θ) + 360) % 360;
}

export function position(position, distance, angle) {
    var earthRadius = 6371000;
    let lat1 = degreesToRadians(position[0]);
    let lon1 = degreesToRadians(position[1]);

    let lat2 = Math.asin(Math.sin(lat1) * Math.cos(distance / earthRadius) +
        Math.cos(lat1) * Math.sin(distance / earthRadius) * Math.cos(degreesToRadians(angle)));

    let lon2 = lon1 + Math.atan2(Math.sin(degreesToRadians(angle)) * Math.sin(distance / earthRadius) * Math.cos(lat1),
        Math.cos((distance / earthRadius) - Math.sin(lat1)) * Math.sin(lat2));

    return [radiansToDegrees(lat2), radiansToDegrees(lon2)];
}


export function calibrateMap(width, height, realPoints, pixelPoints) {

    var latlng = tolatlng(1, height, realPoints, pixelPoints);
    var nw_lat = latlng[0];
    var nw_lng = latlng[1];

    var latlng = tolatlng(width, height, realPoints, pixelPoints);
    var ne_lat = latlng[0];
    var ne_lng = latlng[1];

    var latlng = tolatlng(1, 1, realPoints, pixelPoints);
    var sw_lat = latlng[0];
    var sw_lng = latlng[1];

    var latlng = tolatlng(width, 1, realPoints, pixelPoints);
    var se_lat = latlng[0];
    var se_lng = latlng[1];

    var ww = (nw_lng + sw_lng) / 2;
    var ee = (ne_lng + se_lng) / 2;
    var nn = (ne_lat + nw_lat) / 2;
    var ss = (se_lat + sw_lat) / 2;
    var rr = (Math.atan((nw_lng - sw_lng) / (sw_lat - nw_lat) / 2)) / Math.PI * 180;

    var pos = {
        corners: [{lat: nw_lat,lon: nw_lng},{lat: ne_lat,lon: ne_lng},{lat: sw_lat,lon: sw_lng},{lat: se_lat,lon: se_lng}],
        west: ww,
        east: ee,
        north: nn,
        south: ss,
        rotation: rr        
    };
    return pos;
}

function sortCorners(corners){
    corners.sort(function (a, b) { return a.lat - b.lat });
    var top,bottom;
    if (corners[3].lon < corners[2].lon) {
      top = [corners[3], corners[2]];
    }
    else {
      top = [corners[2], corners[3]];
    }

    if (corners[1].lon < corners[0].lon) {
      bottom = [corners[0], corners[1]];
    }
    else {
      bottom = [corners[1], corners[0]];
    }
    return top.concat(bottom);
}

function tolatlng(x, y, realPoints, pixelPoints) {
    var A = math.matrix([
        [pixelPoints[0].lng, 0, pixelPoints[0].lat, 0, 1, 0],
        [0, pixelPoints[0].lng, 0, pixelPoints[0].lat, 0, 1],
        [pixelPoints[1].lng, 0, pixelPoints[1].lat, 0, 1, 0],
        [0, pixelPoints[1].lng, 0, pixelPoints[1].lat, 0, 1],
        [pixelPoints[2].lng, 0, pixelPoints[2].lat, 0, 1, 0],
        [0, pixelPoints[2].lng, 0, pixelPoints[2].lat, 0, 1]
    ]);
    var b = math.matrix([realPoints[0].lng, realPoints[0].lat, realPoints[1].lng, realPoints[1].lat, realPoints[2].lng, realPoints[2].lat]);
    var Ainv = math.inv(A);
    var c = math.multiply(Ainv, b);
    var c1 = c.get([0]);
    var c2 = c.get([2]);
    var c3 = c.get([4]);
    var c4 = c.get([1]);
    var c5 = c.get([3]);
    var c6 = c.get([5]);

    var lng = c1 * x + c2 * y + c3;
    var lat = c4 * x + c5 * y + c6;

    var latlng = new Array();
    latlng[0] = lat;
    latlng[1] = lng;

    return latlng;
}