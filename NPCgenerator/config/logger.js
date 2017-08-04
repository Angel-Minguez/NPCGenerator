/********************************************************************************************************************************************/
/* Module name: logger.js                                                                                                                   */
/* Module description: Log creation and configuration                                                                                       */
/* Author: Angel Minguez Burillo                                                                                                            */
/* Date: 7-23-2017                                                                                                                          */
/* Options for the logger module input as a JSON object with these properties:                                                              */
/*      path:               <String>: Path and file name for the log                                                                        */
/*                          Default: './log.txt'                                                                                            */
/*      dump:               <String>: Path and file name for the dump file                                                                  */
/*                          Default: './logDump.txt'                                                                                        */
/*      timeStamp:          <Boolean>: Add timestap before each anotation, it must be true for time based rotations                         */
/*                          Default: true                                                                                                   */
/*      dateFormat:         <String>: Format of the date in the timestamp, for time based rotations you cannot omit any token               */
/*                          Default: 'dd/mm/yyyy'                                                                                           */
/*      timeFormat:         <String>: Format of the time in the timestamp, for time based rotations you can only omit microseconds token    */
/*                          Default: 'hh:nn:ss'                                                                                             */
/*      rotation:           <String>: <'time'|'size'|'off'> Enable rotation for the log, off is the default option                          */
/*                          Default: 'off'                                                                                                  */
/*      rotationPeriod:     <Number>: Period of rotation of the log file measured in hours, only valid if rotation is set to 'time'         */
/*                          Default: '24'                                                                                                   */
/*      rotationSize:       <Number>: Size of the log file measured in kilobytes, only valid of rotation is set to 'size'                   */
/*                          Default: '100'                                                                                                  */
/*      silent:             <Boolean>:Echoes log lines in the stdout                                                                        */
/*                          Default: false                                                                                                  */
/* For performance reasons maximun recomended line size is 10kb. Beyond that time based rotation may fail                                   */
/********************************************************************************************************************************************/
/* Dependencies */
const debug = require('debug')('logger');                           //Debug message module
debug.enabled = true;                                               //process.env.DEBUG is not set yet, so we activate debug for the namespace 'logger' manually
const writeStream = require('stream').Writable;                     //Writable stream base class wich will be main file writer
const transformStream = require('stream').Transform;                //Transform stream base class wich will handle the rotations
const loggerConsole = require('console');                           //Nodejs console class wich logger class will be attached to
const fs = require('fs');                                           //File management module
/* Rotator class, it will handle stream level rotation */
class Rotator extends transformStream {
    constructor(options) {                                                          //Constructor
        super();                                                                    //Call to superclass constructor
        this.dumpStream = fs.createWriteStream(options.path,{ flags: 'a+' });       //Write stram for the dump file
        this.mode = options.mode || 'size';                                         //We pass the mode of the rotator as an option parameter
        this.sliced = 0;                                                            //Sliced will store the amount of bytes sliced from the buffer
        this.extraSize = options.extraSize;                                         //Extrasize represent the offset in bytes for the size mode rotation, to avoid rotation being triggered too often
		this.buffer = '';                                                           //Buffer will store the readstream input data into the rotator
        this.deleted = false;                                                       //Flag to signal the completion of the deletion of a line
    }
    _transform(data, encoding, callback) {                                          //Main method of the transform stream
        if (this.mode == 'time') {                                                  //Time rotation logic
            if (this.deleted == false) {                                            //If we dont have still deleted a line from the log file
                this.buffer += data.toString();                                     //Accumulate the read stream data into a buffer
                if (this.buffer.indexOf('\n') !== -1) {                             //We look for the first CR in the buffer, if there is a complete line in the buffer
                    this.dumpStream.write(this.buffer.split('\n')[0]+'\n');         //We slice it and write it in the write stream of the dump file
                    this.push(this.buffer.slice(this.buffer.indexOf('\n') + 1));    //The rest of the buffer is pushed into the write stream of the log file
                    this.buffer = '';                                               //Reset of the buffer
                    this.deleted = true;                                            //We set the signal flag
                }
            }
            else this.push(data);                                                   //If the line in the buffer has been deleted we simply pass the data through
            callback();                                                             //And we call the callback
        }
        else {                                                                      //Size rotation logic
            if (this.deleted == false) {                                            //If we dont have still deleted the extra chunk of the file
                this.buffer += data.toString();                                     //Accumulate the read stream data into a buffer
                while (this.sliced < this.extraSize) {                              //If the amount of bytes sliced is not enough we will keep slicing
                    if (this.buffer.indexOf('\n') !== -1) {                         //We search for the CR character, if it is in the buffer
                        this.sliced += this.buffer.indexOf('\n') + 1;                       //We count the amount of bytes to be sliced
                        this.dumpStream.write(this.buffer.split('\n')[0] + '\n');           //We slice it and write it in the write stream of the dump file
                        this.buffer = this.buffer.slice(this.buffer.indexOf('\n') + 1);     //And push to write stream the remaining bytes
                    }
                    else {                                                          //If there is not a CR character in the buffer
                        this.sliced += this.buffer.length;                          //We add the whole buffer lenght into the byte counter
                        this.dumpStream.write(this.buffer.split('\n')[0] + '\n');   //We dump the whole buffer in the dump file
                        this.buffer = '';                                           //Reset the storing buffer
                        this.push(this.buffer);                                     //And pass the buffer through untouched to the write stream
                        callback();                                                 //The transform operation is done executing the callback
                    }
                }
                this.push(this.buffer);                                             //If the extra bytes have been sliced we pass the remaining data through
                this.deleted = true;                                                //We signal the rotation job done
            }
            else this.push(data);                                                   //We pass through the rest of the file
            callback();                                                             //The transform operation is done executing the callback
        }
    }
}
/* Logger class, it will handle the line writing into the log file and will set the logic about when to rotate the log */
/* It is a child class of writeable stream because the class console needs a write stream to deliver the messages */
class logger extends writeStream {                                                  
    constructor(options) {                                                          //Constructor for the logger, a JSON object is passed as argument for options
        super();                                                                    //Call to the parent constructor
        this.fwStreamOpt = {                                                        //Options for the writeStream that will write into the log
            flags: 'a+',                                                            //Append mode, it creates a file if it doesnt exist
            defaultEncoding: 'utf-8',                                               //Encoding option, utf-8
            fd: null,                                                               //No file descriptor
            mode: 0o666,                                                            //Permissions for the file
            autoClose: true,                                                        //The stream will close if all the data have been writed
        };
        this.path = options.path || './log.txt';                                    //Path for the log file
        this.dumpPath = options.dump || './logDump.txt';                            //Path for the dump file
        this.timeStamp = options.timeStamp || true;                                 //Enable or disable timestamps for the log lines
        this.dateFormat = options.dateFormat || 'dd/mm/yyyy';                       //Timestamp date format string
        this.timeFormat = options.timeFormat || 'hh:nn:ss:uuu';                     //Timestamp time format string
        this.silent = options.silent || false;                                      //Silent mode, if set the log lines wont echo in the console 
        this.rotation = options.rotation || 'off';                                  //Rotation option, if disabled the lines will be added to the log file without conditions
        this.rotationPeriod = options.rotationPeriod || 24;                         //Rotation period, in hours
        this.rotationSize = options.rotationSize * 1024 || 100 * 1024;              //Rotation size, in bytes
        this.sizeOffset = this.rotationSize * 0.1;                                  //Offset to the rotation size to prevent constant rotations
        this.fileWriteStream = fs.createWriteStream(options.path, this.fwStreamOpt);//Creation of the write stream using the options declared above
        this.fileWriteStream.on('error', (_error) => {                              //Error event handler for the stream
            console.log('ERROR: %s', _error.message);                               //Inform the user in case of write error on the log
        });
        this.fd = fs.openSync(this.path, 'r+');                                         //Once the file is created by the write stream we open it to get its file descriptor
        this.timeStampOrder=this.setTimeStampOrder(this.dateFormat, this.timeFormat);   //Call to the method that establish the order of the timestamp tokens
    }
    validateOptions(options) {                                                                          
        if (options.rotation != 'off' && options.rotation != 'time' && options.rotation != 'size') {
            console.log('LOGGER: Invalid rotation option <time|size|off>.');
            return false;
        }
        if (options.rotation == 'time') {
            if (options.timeStamp == false) {
                console.log('LOGGER: Invalid option timeStam must be ON for time based rotation.');
                return false;
            }
            for (let elem of this.setTimeStampOrder(options.dateFormat, options.timeFormat)) {
                if (elem.position == -1) {
                    console.log('LOGGER: Invalid format in timeStamp string, missing %s', elem.token);
                    return false;
                }
            }
        }
        if (options.rotation == 'size') {
            if (this.rotationSize <= 0) {
                console.log('LOGGER: Size must be a positive value.')
                return false;
            }
        }
        if (options.path == '' || options.path == null) {
            console.log('LOGGER: Invalid path.');
            return false;
        }
        return true;
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
        this.timeStampSize = Buffer.byteLength(dateString + '-' + timeString + ' ', 'utf-8');
        return dateString + '-' + timeString + ' ';
    }
    setTimeStampOrder(dateFormat, timeFormat) {
        let _timeStampOrder = [];
        _timeStampOrder.push({ token: 'day', position: (dateFormat + timeFormat ).indexOf('dd', 0) });
        _timeStampOrder.push({ token: 'month', position: (dateFormat + timeFormat).indexOf('mm', 0) });
        _timeStampOrder.push({ token: 'year', position: (dateFormat + timeFormat).indexOf('yyyy', 0) });
        _timeStampOrder.push({ token: 'hours', position: (dateFormat + timeFormat).indexOf('hh', 0) });
        _timeStampOrder.push({ token: 'minutes', position:(dateFormat + timeFormat).indexOf('nn', 0) });
        _timeStampOrder.push({ token: 'seconds', position: (dateFormat + timeFormat).indexOf('ss', 0) });
        if ((dateFormat + timeFormat).indexOf('uuu', 0) >= 0) {
            _timeStampOrder.push({ token: 'u-seconds', position: (dateFormat + timeFormat).indexOf('uuu', 0) });
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
            let array = timeStampParser.exec(timeStamp);
            this.timeStampOrder[i].value = array[0];
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
    rotate(mode, extraSize) {
        this.rotator = new Rotator({ path:this.dumpPath ,mode: mode, extraSize: extraSize });
        this.rotator.fileReadStream = fs.createReadStream(this.path);
        this.rotator.fileReadStream.setEncoding('utf-8');
        this.rotator.fileReadStream.pipe(this.rotator);
        var rotationPromise = new Promise((resolve, reject) => {
            this.rotator.fileReadStream.once('close', () => {
                this.rotator.fileWriteStream = fs.createWriteStream(this.path, { flags: 'w' });
                this.rotator.pipe(this.rotator.fileWriteStream);
                this.rotator.fileWriteStream.once('finish', () => {
                    resolve('ROTATION_OK');
                });
            });
        });
        return rotationPromise;
    }
    _write(data, encoding, callback) {
        let line = this.createTimeStamp(this.timeFormat, this.dateFormat) + data;
        if (this.rotation == 'time') {
            this.writeLine(line, callback);
            let datePromise = new Promise((resolve, reject) => {
                let oldestTimeStamp = Buffer.alloc(this.timeStampSize, ' ', 'utf-8');
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
                            this.rotate('time').then((result) => debug('ROTATED!!'));
                            return;
                        }           
                    }
                    debug('NO ROTATION');
                },
                (err) => {
                    console.log('ERROR: %s', err.message);
                });
        }
        if (this.rotation == 'size') {
            this.writeLine(line, callback);        
            let sizePromise = new Promise((resolve, reject) => {
                fs.stat(this.path, (err, stats) => {
                    if (err) reject(err);
                    else resolve(stats);
                });
            });
            sizePromise.then(
                (stats) => {
                    debug(stats.size);
                    if (stats.size > this.rotationSize + this.sizeOffset) {
                        this.rotate('size', stats.size - this.rotationSize).then((result) => debug('ROTATED!!'));
                        return;
                    }
                    else debug('NO ROTATION');
                },
                (err) => {
                    console.log('ERROR: %s', err.message);
                });
        }
        if (this.rotation == 'off') this.writeLine(line, callback);
    }
    writeLine(line, callback) {
        if (!this.fileWriteStream.write(line)) {
            this.fileWriteStream.once('drain', callback);
        }
        else {
            if (!this.silent) console.log(line);
            process.nextTick(callback);
        }
    }
}
module.exports = function loggerFactory(options) {
    loggerInstance = new logger(options);
    if (!loggerInstance.validateOptions(options)) return null;
    return new console.Console(loggerInstance, process.stderr);
}