const Ajv = require('ajv');

const ajv = new Ajv({ "allErrors": true });
const validate = ajv.compile({
    properties: {
        name: { type: 'string', minLength: 3, maxLength: 40 },
        visited_date: { type: 'string', format: 'regex', pattern: /^(|(\d{1,2}\.){2}\d{4}( \d{2}:\d{2})?)$/.source },
        rating: { type: 'string', format: 'regex', pattern: /^(1|2|3|4|5)$/.source },
        message: { type: 'string', minLength: 15 },
    },
    required: [ 'name', 'rating', 'message' ],
});
const formatDate = date => date.toLocaleString('de-DE', {
    hour12: false,
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
});
const ratingToString = rating =>
    rating === '1' ? 'Sehr gut' :
    rating === '2' ? 'Gut' :
    rating === '3' ? 'Befriedigend' :
    rating === '4' ? 'Ausreichend' :
    rating === '5' ? 'Mangelhaft' : 'Keine Bewertung';
const guestbook = (() => {
    const entries = [];
    const addEntry = ({ name, visited_date, rating, message }) => {
        validate({ name, visited_date, rating, message });
        const errors = (validate.errors || [])
            .reduce((errors, { dataPath, message }) => {
                errors[dataPath.substr(1)] = message;
                return errors;
            }, {});

        if (Object.keys(errors).length === 0) {
            entries.unshift({
                authored_date: formatDate(new Date()),
                rating_string: ratingToString(rating),
                name, visited_date, message,
            });
        }

        return errors;
    };
    const getEntries = () => entries;

    return { addEntry, getEntries };
})();

// Fixtures
guestbook.addEntry({
    name: 'Doreen Ackerman',
    visited_date: '19.09.2017 18:00',
    rating: '3',
    message: 'Essen war gut aber viel zu lange Wartezeiten'
});

guestbook.addEntry({
    name: 'Steffen Hahn',
    rating: '5',
    message: 'Alles toll! Essen war lecker!'
});

guestbook.addEntry({
    name: 'Robert Fürst',
    visited_date: '23.09.2017 21:20',
    rating: '4',
    message: 'Fast perfekt. Aber Austern waren aus!'
});

module.exports = guestbookPath => (req, res, next) => {
    const path = req.originalUrl.substr(1);
    if (path !== guestbookPath) {
        return next();
    }
    const formErrors = req.method === 'POST' ? guestbook.addEntry(req.body) : undefined;
    const recordWasAdded = req.method === 'POST' && Object.keys(formErrors).length === 0;

    res.variables = {
        ...res.variables,
        recordWasAdded,
        formErrors,
        formData: recordWasAdded ? undefined : { ...req.body },
        entries: guestbook.getEntries(),
    }

    console.log(res.variables);
    next();
}
