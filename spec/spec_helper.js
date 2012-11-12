beforeEach(function() {
    this.addMatchers({
        toContainBlock: function(expected) {
            for (var i = 0; i < this.actual.length; i++) {
                if (this.actual[i].isEqual(expected))
                    return true;
            }
            return false;
        }
    });

    this.addMatchers({
        toContainBlocks: function(expected) {
            var found = true;
            for (var i = 0; i < expected.length; i++) {
                if (this.toContainBlock(expected[i]))
                    found = false;
            }
            return found;
        }
    });

    this.addMatchers({
        blockEqual: function(expected) {
            return expected.isEqual(this.actual);
        }
    });

});
