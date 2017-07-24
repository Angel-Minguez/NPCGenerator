/********************************************************************************************************/
/* Module name: logger.js                                                                               */
/* Module description: Log creation and configuration                                                   */
/* Author: Angel Minguez Burillo                                                                        */
/* Date: 7-23-2017                                                                                      */
/* Options for the logger module input as a JSON object with these properties:                          */
/*      path:               (Path and file name for the log)                                            */
/*      timeStamp:          (Add timestap before each anotation)                                        */
/*      dateFormat:         (Format of the date in the timestamp)                                       */
/*      timeFormat:         (Format of the time in the timestamp)                                       */
/*      rotation:           (Enable rotation for the log)                                               */
/*      rotationPeriod:     (Period of rotation of the log file)                                        */
/*      silent:             (Enable HTTPS)                                                              */
/********************************************************************************************************/
const debug = require('debug')('logger');
const writeStream = require('stream').Writable;
const loggerConsole = require('console');
const fs = require('fs');
class logger extends writeStream {
    constructor(options) {
        super();
        this.fileWriteStreamOptions = {
            flags: 'a+',
            defaultEncoding: 'utf8',
            fd: null,
            mode: 0o666,
            autoClose: true
        };
        this.path = options.path || './log.txt';
        this.timeStamp = options.timeStamp || true;
        this.dateFormat = options.dateFormat || 'dd/mm/yyyy';
        this.timeFormat = options.timeFormat || 'hh:mm:ss:uuu';
        this.fileWriteStream = fs.createWriteStream(options.path, this.fileWriteStreamOptions);
        this.fileWriteStream.on('error', (_error) => {
            console.log('ERROR: %s', _error.message);
        });

    }
    createTimeStamp(format) {
        let time = new Date();
        if (this.dateFormat == 'dd/mm/yyyy' || this.dateFormat == 'mm/dd/yyyy') {
            format = format.replace('dd', time.getDate().toString(), "gi");
            format = format.replace('mm', (time.getMonth() + 1).toString(), "gi");
            format = format.replace('yyyy', time.getFullYear().toString(), "gi");
        }
        return format;
    }
    _write(data, encoding, callback) {
        if (this.timeStamp = true) {
            let line = this.createTimeStamp(this.dateTimeFormat) + data;
        }

        if (!this.fileWriteStream.write(line)) {
            this.fileWriteStream.once('drain', callback);
        }
        else process.nextTick(callback);
    }      
}


module.exports = function loggerFactory(options) {
    loggerInstance = new logger(options);
    return new console.Console(loggerInstance, process.stderr);

}