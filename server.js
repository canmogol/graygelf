var gelfserver = require('graygelf/server')
var port = process.env.PORT || 12201
var server = gelfserver()
var LOG_LEVELS = [
    "PANIC  ",
    "ALERT  ",
    "CRITIC ",
    "ERROR  ",
    "WARNING",
    "NOTICE ",
    "INFO   ",
    "DEBUG  ",
]
server.on('message', function (gelf) {
    if(gelf.level !== undefined){
        if (gelf.level === 3) {
            console.log(
                '[\x1b[32m' + gelf._hostname + '\x1b[0m]' +
                '[\x1b[33m' + gelf._facility + '\x1b[0m]' +
                '[\x1b[31m' + LOG_LEVELS[gelf.level] + '\x1b[0m]' +
                '[\x1b[35m' + gelf._thread_name + '\x1b[0m]' +
                '[\x1b[35m' + gelf._traceId + ":" + gelf._spanId + '\x1b[0m]' +
                '[\x1b[31m' + gelf._root_cause_class_name + '\x1b[0m]' +
                '[\x1b[32m' + gelf._source_class_name + ':' +
                '' + gelf._source_method_name + ':' +
                '' + gelf._source_line_number + '\x1b[0m]' +
                ': ' + gelf.full_message
            )
        } else {
            console.log(
                '[\x1b[32m' + gelf._hostname + '\x1b[0m]' +
                '[\x1b[33m' + gelf._facility + '\x1b[0m]' +
                '[\x1b[34m' + LOG_LEVELS[gelf.level] + '\x1b[0m]' +
                '[\x1b[35m' + gelf._thread_name + '\x1b[0m]' +
                '[\x1b[35m' + gelf._traceId + ":" + gelf._spanId + '\x1b[0m]' +
                '[\x1b[32m' + gelf._source_class_name + ':' +
                '' + gelf._source_method_name + ':' +
                '' + gelf._source_line_number + '\x1b[0m]' +
                ': ' + gelf.full_message
            )
        }
    }
})
process.on('SIGINT', function () {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    process.exit(0);
});
console.log('GELF server started on port ' + port);
server.listen(port)
