import GpxParser from "gpxparser";
import FitParser from "fit-file-parser";

export const parseGPX = (data) => {
    let gpx = new GpxParser();
    gpx.parse(data);
    let points = [];
    gpx.tracks.forEach((track) => {
        points = [...points, ...track.points.map(point => [point.lat, point.lon, point.time])];
    })
    return points;
}

export const parseFIT = (data, handleData) => {
    let fit = new FitParser({
        force: true,
        speedUnit: 'km/h',
        lengthUnit: 'km',
        temperatureUnit: 'kelvin',
        elapsedRecordField: true,
        mode: 'list',
    });
    let points = [];
    fit.parse(data, function (error, data) {
        if (!error) {
            let points = data.records.map(record => [record.position_lat, record.position_long, record.timestamp]);
            handleData(points);
        }
    });
    return points.length > 0 ? points : null;
}

export const parseTCX = (data) => {

}
