var global = require('./core/global');
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}
if (!Array.isArray) {
    Array.isArray = function (vArg) {
        return Object.prototype.toString.call(vArg) === "[object Array]";
    };
}
if (!Object.keys) {
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'), dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ], dontEnumsLength = dontEnums.length;
        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }
            var result = [], prop, i;
            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }
            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}
if ('ab'.substr(-1) !== 'b') {
    String.prototype.substr = function (substr) {
        return function (start, length) {
            if (start < 0)
                start = this.length + start;
            return substr.call(this, start, length);
        };
    }(String.prototype.substr);
}
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        for (var i = 0; i < this.length; ++i) {
            if (i in this) {
                fn.call(scope, this[i], i, this);
            }
        }
    };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun) {
        'use strict';
        if (this === void 0 || this === null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }
        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }
        return res;
    };
}
if (typeof setImmediate === 'undefined') {
    var gScope = global;
    var timeouts = [];
    var messageName = "zero-timeout-message";
    var canUsePostMessage = function () {
        if (typeof gScope.importScripts !== 'undefined' || !gScope.postMessage) {
            return false;
        }
        var postMessageIsAsync = true;
        var oldOnMessage = gScope.onmessage;
        gScope.onmessage = function () {
            postMessageIsAsync = false;
        };
        gScope.postMessage('', '*');
        gScope.onmessage = oldOnMessage;
        return postMessageIsAsync;
    };
    if (canUsePostMessage()) {
        gScope.setImmediate = function (fn) {
            timeouts.push(fn);
            gScope.postMessage(messageName, "*");
        };
        var handleMessage = function (event) {
            if (event.source === self && event.data === messageName) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else {
                    event.cancelBubble = true;
                }
                if (timeouts.length > 0) {
                    var fn = timeouts.shift();
                    return fn();
                }
            }
        };
        if (gScope.addEventListener) {
            gScope.addEventListener('message', handleMessage, true);
        }
        else {
            gScope.attachEvent('onmessage', handleMessage);
        }
    }
    else if (gScope.MessageChannel) {
        var channel = new gScope.MessageChannel();
        channel.port1.onmessage = function (event) {
            if (timeouts.length > 0) {
                return timeouts.shift()();
            }
        };
        gScope.setImmediate = function (fn) {
            timeouts.push(fn);
            channel.port2.postMessage('');
        };
    }
    else {
        gScope.setImmediate = function (fn) {
            return setTimeout(fn, 0);
        };
    }
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        if (fromIndex === void 0) { fromIndex = 0; }
        if (!this) {
            throw new TypeError();
        }
        var length = this.length;
        if (length === 0 || pivot >= length) {
            return -1;
        }
        var pivot = fromIndex;
        if (pivot < 0) {
            pivot = length + pivot;
        }
        for (var i = pivot; i < length; i++) {
            if (this[i] === searchElement) {
                return i;
            }
        }
        return -1;
    };
}
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        var i, len;
        for (i = 0, len = this.length; i < len; ++i) {
            if (i in this) {
                fn.call(scope, this[i], i, this);
            }
        }
    };
}
if (!Array.prototype.map) {
    Array.prototype.map = function (callback, thisArg) {
        var T, A, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        A = new Array(len);
        k = 0;
        while (k < len) {
            var kValue, mappedValue;
            if (k in O) {
                kValue = O[k];
                mappedValue = callback.call(T, kValue, k, O);
                A[k] = mappedValue;
            }
            k++;
        }
        return A;
    };
}
if (typeof (document) !== 'undefined' && typeof (window) !== 'undefined' && window['chrome'] === undefined) {
    document.write("<!-- IEBinaryToArray_ByteStr -->\r\n" +
        "<script type='text/vbscript'>\r\n" +
        "Function IEBinaryToArray_ByteStr(Binary)\r\n" +
        " IEBinaryToArray_ByteStr = CStr(Binary)\r\n" +
        "End Function\r\n" +
        "Function IEBinaryToArray_ByteStr_Last(Binary)\r\n" +
        " Dim lastIndex\r\n" +
        " lastIndex = LenB(Binary)\r\n" +
        " if lastIndex mod 2 Then\r\n" +
        " IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n" +
        " Else\r\n" +
        " IEBinaryToArray_ByteStr_Last = " + '""' + "\r\n" +
        " End If\r\n" +
        "End Function\r\n" +
        "</script>\r\n");
}
var bfs = require('./core/browserfs');
module.exports = bfs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbIm5vdyJdLCJtYXBwaW5ncyI6IkFBSUEsSUFBTyxNQUFNLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFHekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNkLElBQUksQ0FBQyxHQUFHLEdBQUc7UUFDVEEsTUFBTUEsQ0FBQ0EsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7SUFDOUJBLENBQUNBLENBQUM7QUFDSixDQUFDO0FBR0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsQixLQUFLLENBQUMsT0FBTyxHQUFHLFVBQVUsSUFBSTtRQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLGdCQUFnQixDQUFDO0lBQ25FLENBQUMsQ0FBQztBQUNKLENBQUM7QUFJRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNiLFlBQVksQ0FBQztRQUNiLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUNoRCxjQUFjLEdBQUcsQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLEVBQ3JFLFNBQVMsR0FBRztZQUNWLFVBQVU7WUFDVixnQkFBZ0I7WUFDaEIsU0FBUztZQUNULGdCQUFnQjtZQUNoQixlQUFlO1lBQ2Ysc0JBQXNCO1lBQ3RCLGFBQWE7U0FDZCxFQUNELGVBQWUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBRXZDLE1BQU0sQ0FBQyxVQUFVLEdBQVE7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QU8sR0FBRyxXQUFXLGtCQUFrQixDQUFDLENBQUM7QUFDekMsaUJBQVMsR0FBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCcm93c2VyRlMncyBtYWluIGVudHJ5IHBvaW50LlxuICogSXQgaW5zdGFsbHMgYWxsIG9mIHRoZSBuZWVkZWQgcG9seWZpbGxzLCBhbmQgcmVxdWlyZXMoKSB0aGUgbWFpbiBtb2R1bGUuXG4gKi9cbmltcG9ydCBnbG9iYWwgPSByZXF1aXJlKCcuL2NvcmUvZ2xvYmFsJyk7XG5cbi8vIElFIDwgOSBkb2VzIG5vdCBkZWZpbmUgdGhpcyBmdW5jdGlvbi5cbmlmICghRGF0ZS5ub3cpIHtcbiAgRGF0ZS5ub3cgPSBmdW5jdGlvbiBub3coKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9O1xufVxuXG4vLyBJRSA8IDkgZG9lcyBub3QgZGVmaW5lIHRoaXMgZnVuY3Rpb24uXG5pZighQXJyYXkuaXNBcnJheSkge1xuICBBcnJheS5pc0FycmF5ID0gZnVuY3Rpb24gKHZBcmcpOiB2QXJnIGlzIGFueVtdIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZBcmcpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gIH07XG59XG5cbi8vIElFIDwgOSBkb2VzIG5vdCBkZWZpbmUgdGhpcyBmdW5jdGlvbi5cbi8vIEZyb20gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2tleXNcbmlmICghT2JqZWN0LmtleXMpIHtcbiAgT2JqZWN0LmtleXMgPSAoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuICAgICAgICBoYXNEb250RW51bUJ1ZyA9ICEoe3RvU3RyaW5nOiBudWxsfSkucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyksXG4gICAgICAgIGRvbnRFbnVtcyA9IFtcbiAgICAgICAgICAndG9TdHJpbmcnLFxuICAgICAgICAgICd0b0xvY2FsZVN0cmluZycsXG4gICAgICAgICAgJ3ZhbHVlT2YnLFxuICAgICAgICAgICdoYXNPd25Qcm9wZXJ0eScsXG4gICAgICAgICAgJ2lzUHJvdG90eXBlT2YnLFxuICAgICAgICAgICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICAgICAgICAgJ2NvbnN0cnVjdG9yJ1xuICAgICAgICBdLFxuICAgICAgICBkb250RW51bXNMZW5ndGggPSBkb250RW51bXMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmo6IGFueSkge1xuICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnICYmICh0eXBlb2Ygb2JqICE9PSAnZnVuY3Rpb24nIHx8IG9iaiA9PT0gbnVsbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmtleXMgY2FsbGVkIG9uIG5vbi1vYmplY3QnKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlc3VsdDogc3RyaW5nW10gPSBbXSwgcHJvcDogc3RyaW5nLCBpOiBudW1iZXI7XG5cbiAgICAgIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHByb3ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNEb250RW51bUJ1Zykge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZG9udEVudW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGRvbnRFbnVtc1tpXSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGRvbnRFbnVtc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH0oKSk7XG59XG5cbi8vIElFIHN1YnN0ciBkb2VzIG5vdCBzdXBwb3J0IG5lZ2F0aXZlIGluZGljZXNcbmlmICgnYWInLnN1YnN0cigtMSkgIT09ICdiJykge1xuICBTdHJpbmcucHJvdG90eXBlLnN1YnN0ciA9IGZ1bmN0aW9uKHN1YnN0cjogKHN0YXJ0OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcikgPT4gc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0YXJ0OiBudW1iZXIsIGxlbmd0aD86IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAvLyBkaWQgd2UgZ2V0IGEgbmVnYXRpdmUgc3RhcnQsIGNhbGN1bGF0ZSBob3cgbXVjaCBpdCBpcyBmcm9tIHRoZVxuICAgICAgLy8gYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmdcbiAgICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gdGhpcy5sZW5ndGggKyBzdGFydDtcbiAgICAgIC8vIGNhbGwgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uXG4gICAgICByZXR1cm4gc3Vic3RyLmNhbGwodGhpcywgc3RhcnQsIGxlbmd0aCk7XG4gICAgfVxuICB9KFN0cmluZy5wcm90b3R5cGUuc3Vic3RyKTtcbn1cblxuLy8gSUUgPCA5IGRvZXMgbm90IHN1cHBvcnQgZm9yRWFjaFxuaWYgKCFBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkge1xuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGZuOiAodmFsdWU6IHN0cmluZywgaW5kZXg6IG51bWJlciwgYXJyYXk6IHN0cmluZ1tdKSA9PiB2b2lkLCBzY29wZT86IGFueSk6IHZvaWQge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKGkgaW4gdGhpcykge1xuICAgICAgICBmbi5jYWxsKHNjb3BlLCB0aGlzW2ldLCBpLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbi8vIElFIDwgOSBkb2VzIG5vdCBzdXBwb3J0IGZpbHRlclxuLy8gRnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9maWx0ZXJcbmlmICghQXJyYXkucHJvdG90eXBlLmZpbHRlcikge1xuICBBcnJheS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oZnVuLyosIHRoaXNBcmcqLykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGlmICh0aGlzID09PSB2b2lkIDAgfHwgdGhpcyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgIH1cblxuICAgIHZhciB0ID0gT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW4gPSB0Lmxlbmd0aCA+Pj4gMDtcbiAgICBpZiAodHlwZW9mIGZ1biAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgIH1cblxuICAgIHZhciByZXMgPSBbXTtcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50cy5sZW5ndGggPj0gMiA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoaSBpbiB0KSB7XG4gICAgICAgIHZhciB2YWwgPSB0W2ldO1xuXG4gICAgICAgIC8vIE5PVEU6IFRlY2huaWNhbGx5IHRoaXMgc2hvdWxkIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBhdFxuICAgICAgICAvLyAgICAgICB0aGUgbmV4dCBpbmRleCwgYXMgcHVzaCBjYW4gYmUgYWZmZWN0ZWQgYnlcbiAgICAgICAgLy8gICAgICAgcHJvcGVydGllcyBvbiBPYmplY3QucHJvdG90eXBlIGFuZCBBcnJheS5wcm90b3R5cGUuXG4gICAgICAgIC8vICAgICAgIEJ1dCB0aGF0IG1ldGhvZCdzIG5ldywgYW5kIGNvbGxpc2lvbnMgc2hvdWxkIGJlXG4gICAgICAgIC8vICAgICAgIHJhcmUsIHNvIHVzZSB0aGUgbW9yZS1jb21wYXRpYmxlIGFsdGVybmF0aXZlLlxuICAgICAgICBpZiAoZnVuLmNhbGwodGhpc0FyZywgdmFsLCBpLCB0KSkge1xuICAgICAgICAgIHJlcy5wdXNoKHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9O1xufVxuXG4vLyBPbmx5IElFMTAgaGFzIHNldEltbWVkaWF0ZS5cbi8vIEB0b2RvOiBEZXRlcm1pbmUgdmlhYmlsaXR5IG9mIHN3aXRjaGluZyB0byB0aGUgJ3Byb3BlcicgcG9seWZpbGwgZm9yIHRoaXMuXG5pZiAodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgdmFyIGdTY29wZSA9IGdsb2JhbDtcbiAgdmFyIHRpbWVvdXRzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuICB2YXIgbWVzc2FnZU5hbWUgPSBcInplcm8tdGltZW91dC1tZXNzYWdlXCI7XG4gIHZhciBjYW5Vc2VQb3N0TWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0eXBlb2YgZ1Njb3BlLmltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnIHx8ICFnU2NvcGUucG9zdE1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luYyA9IHRydWU7XG4gICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdTY29wZS5vbm1lc3NhZ2U7XG4gICAgZ1Njb3BlLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jID0gZmFsc2U7XG4gICAgfTtcbiAgICBnU2NvcGUucG9zdE1lc3NhZ2UoJycsICcqJyk7XG4gICAgZ1Njb3BlLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jO1xuICB9O1xuICBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgIGdTY29wZS5zZXRJbW1lZGlhdGUgPSBmdW5jdGlvbihmbjogKCkgPT4gdm9pZCkge1xuICAgICAgdGltZW91dHMucHVzaChmbik7XG4gICAgICBnU2NvcGUucG9zdE1lc3NhZ2UobWVzc2FnZU5hbWUsIFwiKlwiKTtcbiAgICB9O1xuICAgIHZhciBoYW5kbGVNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQ6IE1lc3NhZ2VFdmVudCkge1xuICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gc2VsZiAmJiBldmVudC5kYXRhID09PSBtZXNzYWdlTmFtZSkge1xuICAgICAgICBpZiAoZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZW91dHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBmbiA9IHRpbWVvdXRzLnNoaWZ0KCk7XG4gICAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGlmIChnU2NvcGUuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZ1Njb3BlLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ1Njb3BlLmF0dGFjaEV2ZW50KCdvbm1lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZ1Njb3BlLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgLy8gV2ViV29ya2VyIE1lc3NhZ2VDaGFubmVsXG4gICAgdmFyIGNoYW5uZWwgPSBuZXcgZ1Njb3BlLk1lc3NhZ2VDaGFubmVsKCk7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgaWYgKHRpbWVvdXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRpbWVvdXRzLnNoaWZ0KCkoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGdTY29wZS5zZXRJbW1lZGlhdGUgPSAoZm46ICgpID0+IHZvaWQpID0+IHtcbiAgICAgIHRpbWVvdXRzLnB1c2goZm4pO1xuICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgnJyk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBnU2NvcGUuc2V0SW1tZWRpYXRlID0gZnVuY3Rpb24oZm46ICgpID0+IHZvaWQpIHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xuICB9XG59XG5cbi8vIElFPDkgZG9lcyBub3QgZGVmaW5lIGluZGV4T2YuXG4vLyBGcm9tOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9pbmRleE9mXG5pZiAoIUFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gIEFycmF5LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24oc2VhcmNoRWxlbWVudDogYW55LCBmcm9tSW5kZXg6IG51bWJlciA9IDApOiBudW1iZXIge1xuICAgIGlmICghdGhpcykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgIH1cblxuICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICBpZiAobGVuZ3RoID09PSAwIHx8IHBpdm90ID49IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHZhciBwaXZvdCA9IGZyb21JbmRleDtcbiAgICBpZiAocGl2b3QgPCAwKSB7XG4gICAgICBwaXZvdCA9IGxlbmd0aCArIHBpdm90O1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSBwaXZvdDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpc1tpXSA9PT0gc2VhcmNoRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xufVxuXG4vLyBJRTw5IGRvZXMgbm90IHN1cHBvcnQgZm9yRWFjaFxuLy8gRnJvbTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZm9yRWFjaFxuaWYgKCFBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkge1xuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGZuOiAodmFsdWU6IHN0cmluZywgaW5kZXg6IG51bWJlciwgYXJyYXk6IHN0cmluZ1tdKSA9PiB2b2lkLCBzY29wZT86IGFueSkge1xuICAgIHZhciBpOiBudW1iZXIsIGxlbjogbnVtYmVyO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGlmIChpIGluIHRoaXMpIHtcbiAgICAgICAgZm4uY2FsbChzY29wZSwgdGhpc1tpXSwgaSwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG4vLyBJRTw5IGRvZXMgbm90IHN1cHBvcnQgbWFwXG4vLyBGcm9tOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9tYXBcbmlmICghQXJyYXkucHJvdG90eXBlLm1hcCkge1xuICBBcnJheS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24oY2FsbGJhY2s6ICh2YWx1ZTogc3RyaW5nLCBpbmRleDogbnVtYmVyLCBhcnJheTogc3RyaW5nW10pID0+IGFueSwgdGhpc0FyZz86IGFueSk6IGFueVtdIHtcbiAgICB2YXIgVDogYW55LCBBOiBhbnksIGs6IGFueTtcbiAgICBpZiAodGhpcyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiIHRoaXMgaXMgbnVsbCBvciBub3QgZGVmaW5lZFwiKTtcbiAgICB9XG4gICAgLy8gMS4gTGV0IE8gYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIFRvT2JqZWN0IHBhc3NpbmcgdGhlIHx0aGlzfCB2YWx1ZSBhcyB0aGUgYXJndW1lbnQuXG4gICAgdmFyIE8gPSBPYmplY3QodGhpcyk7XG4gICAgLy8gMi4gTGV0IGxlblZhbHVlIGJlIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgR2V0IGludGVybmFsIG1ldGhvZCBvZiBPIHdpdGggdGhlIGFyZ3VtZW50IFwibGVuZ3RoXCIuXG4gICAgLy8gMy4gTGV0IGxlbiBiZSBUb1VpbnQzMihsZW5WYWx1ZSkuXG4gICAgdmFyIGxlbiA9IE8ubGVuZ3RoID4+PiAwO1xuICAgIC8vIDQuIElmIElzQ2FsbGFibGUoY2FsbGJhY2spIGlzIGZhbHNlLCB0aHJvdyBhIFR5cGVFcnJvciBleGNlcHRpb24uXG4gICAgLy8gU2VlOiBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3g5LjExXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGNhbGxiYWNrICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG4gICAgfVxuICAgIC8vIDUuIElmIHRoaXNBcmcgd2FzIHN1cHBsaWVkLCBsZXQgVCBiZSB0aGlzQXJnOyBlbHNlIGxldCBUIGJlIHVuZGVmaW5lZC5cbiAgICBpZiAodGhpc0FyZykge1xuICAgICAgVCA9IHRoaXNBcmc7XG4gICAgfVxuICAgIC8vIDYuIExldCBBIGJlIGEgbmV3IGFycmF5IGNyZWF0ZWQgYXMgaWYgYnkgdGhlIGV4cHJlc3Npb24gbmV3IEFycmF5KGxlbikgd2hlcmUgQXJyYXkgaXNcbiAgICAvLyB0aGUgc3RhbmRhcmQgYnVpbHQtaW4gY29uc3RydWN0b3Igd2l0aCB0aGF0IG5hbWUgYW5kIGxlbiBpcyB0aGUgdmFsdWUgb2YgbGVuLlxuICAgIEEgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAvLyA3LiBMZXQgayBiZSAwXG4gICAgayA9IDA7XG4gICAgLy8gOC4gUmVwZWF0LCB3aGlsZSBrIDwgbGVuXG4gICAgd2hpbGUoayA8IGxlbikge1xuICAgICAgdmFyIGtWYWx1ZTogYW55LCBtYXBwZWRWYWx1ZTogYW55O1xuICAgICAgLy8gYS4gTGV0IFBrIGJlIFRvU3RyaW5nKGspLlxuICAgICAgLy8gICBUaGlzIGlzIGltcGxpY2l0IGZvciBMSFMgb3BlcmFuZHMgb2YgdGhlIGluIG9wZXJhdG9yXG4gICAgICAvLyBiLiBMZXQga1ByZXNlbnQgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBIYXNQcm9wZXJ0eSBpbnRlcm5hbCBtZXRob2Qgb2YgTyB3aXRoIGFyZ3VtZW50IFBrLlxuICAgICAgLy8gICBUaGlzIHN0ZXAgY2FuIGJlIGNvbWJpbmVkIHdpdGggY1xuICAgICAgLy8gYy4gSWYga1ByZXNlbnQgaXMgdHJ1ZSwgdGhlblxuICAgICAgaWYgKGsgaW4gTykge1xuICAgICAgICAvLyBpLiBMZXQga1ZhbHVlIGJlIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgR2V0IGludGVybmFsIG1ldGhvZCBvZiBPIHdpdGggYXJndW1lbnQgUGsuXG4gICAgICAgIGtWYWx1ZSA9IE9ba107XG4gICAgICAgIC8vIGlpLiBMZXQgbWFwcGVkVmFsdWUgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBDYWxsIGludGVybmFsIG1ldGhvZCBvZiBjYWxsYmFja1xuICAgICAgICAvLyB3aXRoIFQgYXMgdGhlIHRoaXMgdmFsdWUgYW5kIGFyZ3VtZW50IGxpc3QgY29udGFpbmluZyBrVmFsdWUsIGssIGFuZCBPLlxuICAgICAgICBtYXBwZWRWYWx1ZSA9IGNhbGxiYWNrLmNhbGwoVCwga1ZhbHVlLCBrLCBPKTtcbiAgICAgICAgLy8gaWlpLiBDYWxsIHRoZSBEZWZpbmVPd25Qcm9wZXJ0eSBpbnRlcm5hbCBtZXRob2Qgb2YgQSB3aXRoIGFyZ3VtZW50c1xuICAgICAgICAvLyBQaywgUHJvcGVydHkgRGVzY3JpcHRvciB7VmFsdWU6IG1hcHBlZFZhbHVlLCA6IHRydWUsIEVudW1lcmFibGU6IHRydWUsIENvbmZpZ3VyYWJsZTogdHJ1ZX0sXG4gICAgICAgIC8vIGFuZCBmYWxzZS5cbiAgICAgICAgLy8gSW4gYnJvd3NlcnMgdGhhdCBzdXBwb3J0IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSwgdXNlIHRoZSBmb2xsb3dpbmc6XG4gICAgICAgIC8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBLCBQaywgeyB2YWx1ZTogbWFwcGVkVmFsdWUsIHdyaXRhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgICAgIC8vIEZvciBiZXN0IGJyb3dzZXIgc3VwcG9ydCwgdXNlIHRoZSBmb2xsb3dpbmc6XG4gICAgICAgIEFba10gPSBtYXBwZWRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGQuIEluY3JlYXNlIGsgYnkgMS5cbiAgICAgIGsrKztcbiAgICB9XG4gICAgLy8gOS4gcmV0dXJuIEFcbiAgICByZXR1cm4gQTtcbiAgfTtcbn1cblxuLyoqXG4gKiBJRTkgYW5kIGJlbG93IG9ubHk6IEluamVjdHMgYSBWQlNjcmlwdCBmdW5jdGlvbiB0aGF0IGNvbnZlcnRzIHRoZVxuICogJ3Jlc3BvbnNlQm9keScgYXR0cmlidXRlIG9mIGFuIFhNTEh0dHBSZXF1ZXN0IGludG8gYSBieXRlc3RyaW5nLlxuICogRnJvbTogaHR0cDovL21pc2t1bi5jb20vamF2YXNjcmlwdC9pbnRlcm5ldC1leHBsb3Jlci1hbmQtYmluYXJ5LWZpbGVzLWRhdGEtYWNjZXNzLyNjb21tZW50LTE3XG4gKlxuICogVGhpcyBtdXN0IGJlIHBlcmZvcm1lZCAqYmVmb3JlKiB0aGUgcGFnZSBmaW5pc2hlcyBsb2FkaW5nLCBvdGhlcndpc2VcbiAqIGRvY3VtZW50LndyaXRlIHdpbGwgcmVmcmVzaCB0aGUgcGFnZS4gOihcbiAqXG4gKiBUaGlzIGlzIGhhcm1sZXNzIHRvIGluamVjdCBpbnRvIG5vbi1JRSBicm93c2Vycy5cbiAqL1xuaWYgKHR5cGVvZihkb2N1bWVudCkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZih3aW5kb3cpICE9PSAndW5kZWZpbmVkJyAmJiAoPGFueT4gd2luZG93KVsnY2hyb21lJ10gPT09IHVuZGVmaW5lZCkge1xuICBkb2N1bWVudC53cml0ZShcIjwhLS0gSUVCaW5hcnlUb0FycmF5X0J5dGVTdHIgLS0+XFxyXFxuXCIrXG4gICAgXCI8c2NyaXB0IHR5cGU9J3RleHQvdmJzY3JpcHQnPlxcclxcblwiK1xuICAgIFwiRnVuY3Rpb24gSUVCaW5hcnlUb0FycmF5X0J5dGVTdHIoQmluYXJ5KVxcclxcblwiK1xuICAgIFwiIElFQmluYXJ5VG9BcnJheV9CeXRlU3RyID0gQ1N0cihCaW5hcnkpXFxyXFxuXCIrXG4gICAgXCJFbmQgRnVuY3Rpb25cXHJcXG5cIitcbiAgICBcIkZ1bmN0aW9uIElFQmluYXJ5VG9BcnJheV9CeXRlU3RyX0xhc3QoQmluYXJ5KVxcclxcblwiK1xuICAgIFwiIERpbSBsYXN0SW5kZXhcXHJcXG5cIitcbiAgICBcIiBsYXN0SW5kZXggPSBMZW5CKEJpbmFyeSlcXHJcXG5cIitcbiAgICBcIiBpZiBsYXN0SW5kZXggbW9kIDIgVGhlblxcclxcblwiK1xuICAgIFwiIElFQmluYXJ5VG9BcnJheV9CeXRlU3RyX0xhc3QgPSBDaHIoIEFzY0IoIE1pZEIoIEJpbmFyeSwgbGFzdEluZGV4LCAxICkgKSApXFxyXFxuXCIrXG4gICAgXCIgRWxzZVxcclxcblwiK1xuICAgIFwiIElFQmluYXJ5VG9BcnJheV9CeXRlU3RyX0xhc3QgPSBcIisnXCJcIicrXCJcXHJcXG5cIitcbiAgICBcIiBFbmQgSWZcXHJcXG5cIitcbiAgICBcIkVuZCBGdW5jdGlvblxcclxcblwiK1xuICAgIFwiPC9zY3JpcHQ+XFxyXFxuXCIpO1xufVxuXG5pbXBvcnQgYmZzID0gcmVxdWlyZSgnLi9jb3JlL2Jyb3dzZXJmcycpO1xuZXhwb3J0ID0gYmZzOyJdfQ==