
(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if(resourceCache[url]) {
           
            return resourceCache[url];
        } else {
            
            var img = new Image();
            img.onload = function() {
                
                resourceCache[url] = img;

                
                if(Ready()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    
    function Ready() {
        var ready = true;
        for(var X in resourceCache) {
            if(resourceCache.hasOwnProperty(X) &&
               !resourceCache[X]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        Ready: Ready
    };
})();