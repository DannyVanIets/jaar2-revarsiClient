const equel = (function (){
    return function () {
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    }
})();