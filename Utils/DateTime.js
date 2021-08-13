class DateTime {
    static getDateTimeAsString {
        const dt = new DateTime();
        return dt.toUTCString();
    }
}

module.exports = DateTime;