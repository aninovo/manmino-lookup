
function plainLookup(word, index) {
    if (word in index) {
        return word;
    }
    return null;
}

function substringLookup(word, index) {
    const CAP = 255;
    var results = [];
    for (var i = 0; i < word.length && i < CAP; i++)
        for (var j = i + 1; j < word.length+1 && j < CAP; j++) {
            var sub = word.substring(i, j);
            if (sub in index && /* prevent duplicates */ results.indexOf(sub) < 0) {
                results.push(sub);
            }
        }
    return results;
}