var remoteDataFilename = "data.csv";

var dictionaryData = null;
var indexManmino = null;

function loadDataRemote(filename = remoteDataFilename) {
    console.log("requesting remote data");
    try {
        $.ajax({
            type: "GET",
            url: filename,
            dataType: 'text/csv',
            success: function (data) {
                return dictionaryData;
            },
        });
    }
    catch (e) {
        console.log('failed');
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
    var csv = loadDataRemote();
    if (csv == null)
        csv = dummyCSV;

    dictionaryData = $.csv.toObjects(csv);
    indexManmino = formIndex(dictionaryData);
    // alert(indexManmino['o'][0]['Definition']);
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