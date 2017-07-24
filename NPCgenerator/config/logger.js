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
            autoClose: true,
        };
        this.path = options.path || './log.txt';
        this.timeStamp = options.timeStamp || true;
        this.dateFormat = options.dateFormat || 'dd/mm/yyyy';
        this.timeFormat = options.timeFormat || 'hh:mm:ss:uuu';
		this.silent = options.silent || false;
		this.rotation = options.rotation || true;
		this.rotationPeriod = options.rotationPeriod || '24h';
		fs.open(this.path, 'r+', (err, fd)=>{
			if(err) {
				console.log('ERROR: While opening %s', this.path);
				throw err;
			}
			else this.fd = fd;
		});
		this.fileReadStream = fs.createReadStream(options.path);
		this.fileWriteStream = fs.createWriteStream(options.path, this.fileWriteStreamOptions);
        this.fileWriteStream.on('error', (_error) => {
            console.log('ERROR: %s', _error.message);
        });
    }
    createTimeStamp(timeString, dateString) {
        let currentTime = new Date();
        dateString = dateString.replace('dd', currentTime.getDate().toString(), "gi");
        dateString = dateString.replace('mm', (currentTime.getMonth() + 1).toString(), "gi");
        dateString = dateString.replace('yyyy', currentTime.getFullYear().toString(), "gi");
        timeString = timeString.replace('hh', currentTime.getHours().toString(), "gi");
		timeString = timeString.replace('mm', currentTime.getMinutes().toString(), "gi");
		timeString = timeString.replace('ss', currentTime.getSeconds().toString(), "gi");
		timeString = timeString.replace('uuu', currentTime.getMilliseconds().toString(), "gi");
		return dateString+'-'+timeString+' ';
    }
    rotate(){
		var lastRotation = new Buffer(1000);
		fs.read(this.fd, lastRotation, 0,1000, 0);
		console.log(lastRotation.toString('utf8'));
		
		//si no hay last rotation cogemos el tiempo de creacion del archivo
		
		fs.stat(this.path, (_err, stats)=>{
			if (_err) console.log('ERROR: Accesing file: %s', this.path);
			else fs.write(this.fd,stats.birthtime+'\r\n',0,1000,0);
		});
		
		
	}
	_write(data, encoding, callback) {
        if (this.timeStamp = true) {
			var line = this.createTimeStamp(this.timeFormat, this.dateFormat) + data + '\r\n';
        }

        if (!this.fileWriteStream.write(line)) {
            this.fileWriteStream.once('drain', callback);
        }
        else {
			if(!this.silent) console.log(data.toString());
			fs.utimes(this.path,Date.now()/1000, Date.now()/1000, (_err)=>{
				if(!_err) {
					if(this.rotation) this.rotate();
					process.nextTick(callback);
				}
				else console.log('ERROR: While modifying file atime or ctime');
			});	
		}
    }      
}
module.exports = function loggerFactory(options) {
    loggerInstance = new logger(options);
    return new console.Console(loggerInstance, process.stderr);

}