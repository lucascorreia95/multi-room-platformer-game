Array.prototype.parse2D = function() {
    const rows = [];

    for (let i = 0; i < this.length; i += 16) {
        rows.push(this.slice(i, i + 16));
    };

    return rows;
};

Array.prototype.createObjectsFrom2D = function(Object) {
    const objects = [];

    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 292) {
                objects.push(new Object({
                    position: {
                        x: x * 64,
                        y: y * 64,
                    }
                }));
            };
        });
    });

    return objects;
}