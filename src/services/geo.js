import L from "leaflet";
import "leaflet-geometryutil";

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