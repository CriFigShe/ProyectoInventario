function getTimestampMinutesFromNow(minutes){
    let timestamp = Date.now() + minutes * 60 * 1000;
    return timestamp;
}

module.exports = {
    getTimestampMinutesFromNow
};