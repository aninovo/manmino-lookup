var remoteDataFilename = "data.csv";

var dictionaryData = null;
var indexManmino = null;

function loadDataRemote(filename = remoteDataFilename) {
    console.log("requesting remote data");
    try {
        $.ajax({
            type: "GET",
            url: filename,
            async: true,
            done: function () {
                console.log('done');
            },
            success: function (data) {
                console.log('success');
                var csv = data;
                dictionaryData = $.csv.toObjects(csv);
                indexManmino = formIndex(dictionaryData);
            },
            error: function (e) {
                alert('Request Status: ' + e.status + ' Status Text: ' + e.statusText + ' ' + e.responseText);
            },
        });
    }
    catch (e) {
        console.log('failed ' + e.message);
    }
}

var dummyCSV = `Manmino,Old Word,Type,Hanji Spelling,Definition
o,o,,五,(n) five
a,a,,,(prn) I; me
ekek,aa,,啞啞,(exclamative) ah
aa,aa,,餓餓,(adj) hungry (formal)
aca,aca,,,(n) morning
losia,,,,(n) russia
agwi,akuy,,餓鬼,(n) demon (Buddhist)`;

function loadData() {
    var csv = dummyCSV; // for local testing
    dictionaryData = $.csv.toObjects(csv);
    indexManmino = formIndex(dictionaryData);

    loadDataRemote();
    // TODO saving locally

}

// index is headword->[entry, entry, entry]
function formIndex(data) {
    var index = {};
    for (const entry of data) {
        var headword = entry.Manmino;
        if (headword != null) {
            if (!(headword in index))
                index[headword] = [];
            index[headword].push(entry);
        }
    }
    return index;
}