/****************************************************************************************************************************************/
/* Module name: logger.js                                                                                                               */
/* Module description: Log creation and configuration                                                                                   */
/* Author: Angel Minguez Burillo                                                                                                        */
/* Date: 7-23-2017                                                                                                                      */
/* Options for the logger module input as a JSON object with these properties:                                                          */
/*      path:               (String: Path and file name for the log)                                                                    */
/*      timeStamp:          (Boolean: Add timestap before each anotation, it must be true for time based rotations)                     */
/*      dateFormat:         (String: Format of the date in the timestamp, for time based rotations you cannot omit any token)           */
/*      timeFormat:         (String: Format of the time in the timestamp, for time based rotations you can only omit microseconds token)*/
/*      rotation:           (String: <'time'|'size'|'off'> Enable rotation for the log, off is the default option                       */
/*      rotationPeriod:     (Number: <time in hours| size in kilobytes> Period of rotation of the log file)                             */
/*      silent:             (Echoes log lines in the stdout)                                                                            */
/* For performance reasons maximun line size is 10kb. Beyond that time based rotation is disabled                                       */
/****************************************************************************************************************************************/
const debug = require('debug')('logger');
const writeStream = require('stream').Writable;
const transStream = require('stream').Transform;
const loggerConsole = require('console');
const fs = require('fs');

class timeRotator extends transStream {
    constructor(options) {
        super(options);
    }
    _transform(data, encoding, callback) {
        callback;
    }
}


class logger extends writeStream {
    constructor(options) {
        super();
        this.fileWriteStreamOptions = {
            flags: 'a+',
            defaultEncoding: 'utf-8',
            fd: null,
            mode: 0o666,
            autoClose: true,
        };
        this.fileReadStreamOptions = {
            flags: 'r',
            defaultEncoding: 'utf-8',
            fd: null,
            mode: 0o666,
            autoClose: true,
            highWaterMark: 1024*10
        };
        this.path = options.path || './log.txt';
        this.timeStamp = options.timeStamp || true;
        this.dateFormat = options.dateFormat || 'dd/mm/yyyy';
        this.timeFormat = options.timeFormat || 'hh:nn:ss:uuu';
		this.silent = options.silent || false;
		this.rotation = options.rotation || 'off';
        this.rotationPeriod = options.rotationPeriod || 24;
        this.fileWriteStream = fs.createWriteStream(options.path, this.fileWriteStreamOptions);
        this.fileWriteStream.on('error', (_error) => {
            console.log('ERROR: %s', _error.message);
        });
        this.fileReadStream = fs.createReadStream(options.path, this.fileReadStreamOptions);
        this.fileReadStream.setEncoding('utf-8');
        this.fd = fs.openSync(this.path, 'r');
        this.timeStampOrder = this.setTimeStampOrder();
        if (options.rotation == 'time') this.rotator = new timeRotator();
    }
    createTimeStamp(timeString, dateString) {
        let currentTime = new Date();
        dateString = dateString.replace('dd', currentTime.getDate().toString().length < 2 ?
            '0' + currentTime.getDate().toString() : currentTime.getDate().toString(), "gi");
        dateString = dateString.replace('mm', (currentTime.getMonth() + 1).toString().length < 2 ?
            '0' + (currentTime.getMonth() + 1).toString() : (currentTime.getMonth() + 1).toString(), "gi");
        timeString = timeString.replace('hh', currentTime.getHours().toString().length < 2 ?
            '0' + currentTime.getHours().toString() : currentTime.getHours().toString(), "gi");
        timeString = timeString.replace('nn', currentTime.getMinutes().toString().length < 2 ?
            '0' + currentTime.getMinutes().toString() : currentTime.getMinutes().toString(), "gi");
        timeString = timeString.replace('ss', currentTime.getSeconds().toString().length < 2 ?
            '0' + currentTime.getSeconds().toString() : currentTime.getSeconds().toString(), "gi");
        timeString = timeString.replace('uuu', currentTime.getMilliseconds().toString(), "gi");
        dateString = dateString.replace('yyyy', currentTime.getFullYear().toString(), "gi");
        this.timeStampSize = Buffer.byteLength(dateString + '-' + timeString + ' ', 'utf-8')-2;
        return dateString + '-' + timeString + ' ';
    }
    setTimeStampOrder() {
        let _timeStampOrder = [];
        _timeStampOrder.push({ token: 'day', position: (this.dateFormat + this.timeFormat ).indexOf('dd', 0) });
        _timeStampOrder.push({ token: 'month', position: (this.dateFormat + this.timeFormat).indexOf('mm', 0) });
        _timeStampOrder.push({ token: 'year', position: (this.dateFormat + this.timeFormat).indexOf('yyyy', 0) });
        _timeStampOrder.push({ token: 'hours', position: (this.dateFormat + this.timeFormat).indexOf('hh', 0) });
        _timeStampOrder.push({ token: 'minutes', position:(this.dateFormat + this.timeFormat).indexOf('nn', 0) });
        _timeStampOrder.push({ token: 'seconds', position: (this.dateFormat + this.timeFormat).indexOf('ss', 0) });
        if ((this.dateFormat + this.timeFormat).indexOf('uuu', 0) >= 0) {
            _timeStampOrder.push({ token: 'u-seconds', position: (this.dateFormat + this.timeFormat).indexOf('uuu', 0) });
        }
        _timeStampOrder.sort((a, b) => { return a.position - b.position });
        return _timeStampOrder;
    }
    decodeTimeStamp(buffer) {
        function search(nameKey, myArray) {
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].token === nameKey) {
                    return myArray[i];
                }
            }
        }
        if (buffer.length == 0) return null;
        let timeStamp = buffer.toString();
        let timeStampParser = new RegExp('([0-9]+)', 'g');
        for (let i = 0; i < this.timeStampOrder.length; i++) {
            this.timeStampOrder[i].value = timeStampParser.exec(timeStamp)[0];
        }
        let decodedDate = new Date();
        decodedDate.setUTCDate(parseInt(search('day', this.timeStampOrder).value));
        decodedDate.setUTCMonth(parseInt(search('month', this.timeStampOrder).value)-1);
        decodedDate.setUTCFullYear(parseInt(search('year', this.timeStampOrder).value));
        decodedDate.setUTCHours(parseInt(search('hours', this.timeStampOrder).value));
        decodedDate.setUTCMinutes(parseInt(search('minutes', this.timeStampOrder).value));
        decodedDate.setUTCSeconds(parseInt(search('seconds', this.timeStampOrder).value));
        return decodedDate;
    }
    rotateTime() {
      //  rotationPromise = new Promise((resolve, reject) => {
           

      //  });
    }
    rotateSize() {

    }
    _write(data, encoding, callback) {
        let line = this.createTimeStamp(this.timeFormat, this.dateFormat) + data + '\r\n';
        if (this.rotation == 'time') {
            let datePromise = new Promise((resolve, reject) => {
                var oldestTimeStamp = Buffer.alloc(this.timeStampSize, ' ', 'utf-8');
                fs.read(this.fd, oldestTimeStamp, 0, this.timeStampSize, 0, (err, bytesRead, buffer) => {
                    if (err) reject(err);
                    if (bytesRead == 0) resolve('');
                    else resolve(buffer);
                });
            });
            datePromise.then(
                (buffer) => {
                    let oldestTimeStamp = this.decodeTimeStamp(buffer);
                    if (oldestTimeStamp != null) {
                        if (Date.now() > oldestTimeStamp.setUTCHours(oldestTimeStamp.getHours() + this.rotationPeriod)) {
                            console.log('ROTAMOS');
                            this.rotateTime();
                        }
                        else console.log('NO ROTAMOS');
                    }
                    if (!this.fileWriteStream.write(line)) {
                        this.fileWriteStream.once('drain', callback);
                    }
                    else {
                        if (!this.silent) console.log(data.toString());
                        // console.log(size);
                        // if (this.rotation == 'time') this.rotateTime();
                        // if (this.rotation == 'size') this.rotateSize();
                        process.nextTick(callback);
                    }
                },
                (err) => {
                    console.log('ERROR: %s', err.message);
                });
        }
    }      
}
module.exports = function loggerFactory(options) {
    loggerInstance = new logger(options);
    return new console.Console(loggerInstance, process.stderr);
}