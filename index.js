
loadData(); // saves full dictionary in dictionaryData and the index in indexManmino

function formatEntry(headword, definition = "", hanji = "", tips = false) {
    if (hanji != "" && hanji != null)
        return `
            <div class="entry">
                <span class="entry-header">
                    <span class="headword">${headword} <span class="hanji">${hanji}</span></span>
                </span>
                <div class="definition">${definition}</div>
            </div>
            `;// version showing hanji
    else
        return `
            <div class="entry">
                <span class="entry-header">
                    <span class="headword">${headword}</span>
                </span>
                <div class="definition">${definition}</div>
            </div>
            `;//<a href="" class="tips">tips</a> TODO tip link
}

function updateContents(headwords) {
    var html = '';
    for (const hw of headwords) {
        var entries = indexManmino[hw];
        for (const entry of entries) {
            html += formatEntry(entry['Manmino'], entry['Definition'], entry['Hanji Spelling']);
        }
    }
    $('content').html(html);
}

function search() {
    var headwords = [];
    var line = $('#search-bar-input').val().toLowerCase();
    var plain = plainLookup(line, indexManmino);
    if (plain != null) headwords.push(plain);
    var substrings = substringLookup(line, indexManmino);
    var sorted = substrings.sort(function (a, b) { return b.length - a.length; });
    for (const i of sorted) if (i != plain) headwords.push(i);
    updateContents(headwords);
}