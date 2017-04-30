module.exports = function(note) {
    switch (note) {
        case 0:
            return 'À rejeter';
        case 1:
            return 'Insuffisant';
        case 2:
            return 'Passable';
        case 3:
            return 'Assez bien';
        case 4:
            return 'Bien';
        case 5:
            return 'Très bien';
        case 6:
            return 'Excellent';
    }
};
