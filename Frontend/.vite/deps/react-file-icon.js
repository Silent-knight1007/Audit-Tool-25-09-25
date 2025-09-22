import {
  require_react_is
} from "./chunk-Q6DFBYTI.js";
import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __commonJS,
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i2 = 0; i2 < 10; i2++) {
          test2["_" + String.fromCharCode(i2)] = i2;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
          return test2[n2];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s2 = 1; s2 < arguments.length; s2++) {
        from = Object(arguments[s2]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i2 = 0; i2 < symbols.length; i2++) {
            if (propIsEnumerable.call(from, symbols[i2])) {
              to[symbols[i2]] = from[symbols[i2]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x2) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error(
                  (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                );
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning(
                "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
              );
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x2) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x2, y2) {
        if (x2 === y2) {
          return x2 !== 0 || 1 / x2 === 1 / y2;
        } else {
          return x2 !== x2 && y2 !== y2;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
              );
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3) {
                printWarning(
                  "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
              { expectedType }
            );
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i2 = 0; i2 < propValue.length; i2++) {
            var error = typeChecker(propValue, i2, componentName, location, propFullName + "[" + i2 + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning(
                "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
              );
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i2 = 0; i2 < expectedValues.length; i2++) {
            if (is(propValue, expectedValues[i2])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
          var checker = arrayOfTypeCheckers[i2];
          if (typeof checker !== "function") {
            printWarning(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i2 + "."
            );
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i3 = 0; i3 < arrayOfTypeCheckers.length; i3++) {
            var checker2 = arrayOfTypeCheckers[i3];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError(
          (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
        );
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/react-file-icon/dist/react-file-icon.esm.js
var import_react = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/colord/index.mjs
var r = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) };
var t = function(r2) {
  return "string" == typeof r2 ? r2.length > 0 : "number" == typeof r2;
};
var n = function(r2, t2, n2) {
  return void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = Math.pow(10, t2)), Math.round(n2 * r2) / n2 + 0;
};
var e = function(r2, t2, n2) {
  return void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = 1), r2 > n2 ? n2 : r2 > t2 ? r2 : t2;
};
var u = function(r2) {
  return (r2 = isFinite(r2) ? r2 % 360 : 0) > 0 ? r2 : r2 + 360;
};
var a = function(r2) {
  return { r: e(r2.r, 0, 255), g: e(r2.g, 0, 255), b: e(r2.b, 0, 255), a: e(r2.a) };
};
var o = function(r2) {
  return { r: n(r2.r), g: n(r2.g), b: n(r2.b), a: n(r2.a, 3) };
};
var i = /^#([0-9a-f]{3,8})$/i;
var s = function(r2) {
  var t2 = r2.toString(16);
  return t2.length < 2 ? "0" + t2 : t2;
};
var h = function(r2) {
  var t2 = r2.r, n2 = r2.g, e2 = r2.b, u2 = r2.a, a2 = Math.max(t2, n2, e2), o2 = a2 - Math.min(t2, n2, e2), i2 = o2 ? a2 === t2 ? (n2 - e2) / o2 : a2 === n2 ? 2 + (e2 - t2) / o2 : 4 + (t2 - n2) / o2 : 0;
  return { h: 60 * (i2 < 0 ? i2 + 6 : i2), s: a2 ? o2 / a2 * 100 : 0, v: a2 / 255 * 100, a: u2 };
};
var b = function(r2) {
  var t2 = r2.h, n2 = r2.s, e2 = r2.v, u2 = r2.a;
  t2 = t2 / 360 * 6, n2 /= 100, e2 /= 100;
  var a2 = Math.floor(t2), o2 = e2 * (1 - n2), i2 = e2 * (1 - (t2 - a2) * n2), s2 = e2 * (1 - (1 - t2 + a2) * n2), h2 = a2 % 6;
  return { r: 255 * [e2, i2, o2, o2, s2, e2][h2], g: 255 * [s2, e2, e2, i2, o2, o2][h2], b: 255 * [o2, o2, s2, e2, e2, i2][h2], a: u2 };
};
var g = function(r2) {
  return { h: u(r2.h), s: e(r2.s, 0, 100), l: e(r2.l, 0, 100), a: e(r2.a) };
};
var d = function(r2) {
  return { h: n(r2.h), s: n(r2.s), l: n(r2.l), a: n(r2.a, 3) };
};
var f = function(r2) {
  return b((n2 = (t2 = r2).s, { h: t2.h, s: (n2 *= ((e2 = t2.l) < 50 ? e2 : 100 - e2) / 100) > 0 ? 2 * n2 / (e2 + n2) * 100 : 0, v: e2 + n2, a: t2.a }));
  var t2, n2, e2;
};
var c = function(r2) {
  return { h: (t2 = h(r2)).h, s: (u2 = (200 - (n2 = t2.s)) * (e2 = t2.v) / 100) > 0 && u2 < 200 ? n2 * e2 / 100 / (u2 <= 100 ? u2 : 200 - u2) * 100 : 0, l: u2 / 2, a: t2.a };
  var t2, n2, e2, u2;
};
var l = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
var p = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
var v = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
var m = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
var y = { string: [[function(r2) {
  var t2 = i.exec(r2);
  return t2 ? (r2 = t2[1]).length <= 4 ? { r: parseInt(r2[0] + r2[0], 16), g: parseInt(r2[1] + r2[1], 16), b: parseInt(r2[2] + r2[2], 16), a: 4 === r2.length ? n(parseInt(r2[3] + r2[3], 16) / 255, 2) : 1 } : 6 === r2.length || 8 === r2.length ? { r: parseInt(r2.substr(0, 2), 16), g: parseInt(r2.substr(2, 2), 16), b: parseInt(r2.substr(4, 2), 16), a: 8 === r2.length ? n(parseInt(r2.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(r2) {
  var t2 = v.exec(r2) || m.exec(r2);
  return t2 ? t2[2] !== t2[4] || t2[4] !== t2[6] ? null : a({ r: Number(t2[1]) / (t2[2] ? 100 / 255 : 1), g: Number(t2[3]) / (t2[4] ? 100 / 255 : 1), b: Number(t2[5]) / (t2[6] ? 100 / 255 : 1), a: void 0 === t2[7] ? 1 : Number(t2[7]) / (t2[8] ? 100 : 1) }) : null;
}, "rgb"], [function(t2) {
  var n2 = l.exec(t2) || p.exec(t2);
  if (!n2) return null;
  var e2, u2, a2 = g({ h: (e2 = n2[1], u2 = n2[2], void 0 === u2 && (u2 = "deg"), Number(e2) * (r[u2] || 1)), s: Number(n2[3]), l: Number(n2[4]), a: void 0 === n2[5] ? 1 : Number(n2[5]) / (n2[6] ? 100 : 1) });
  return f(a2);
}, "hsl"]], object: [[function(r2) {
  var n2 = r2.r, e2 = r2.g, u2 = r2.b, o2 = r2.a, i2 = void 0 === o2 ? 1 : o2;
  return t(n2) && t(e2) && t(u2) ? a({ r: Number(n2), g: Number(e2), b: Number(u2), a: Number(i2) }) : null;
}, "rgb"], [function(r2) {
  var n2 = r2.h, e2 = r2.s, u2 = r2.l, a2 = r2.a, o2 = void 0 === a2 ? 1 : a2;
  if (!t(n2) || !t(e2) || !t(u2)) return null;
  var i2 = g({ h: Number(n2), s: Number(e2), l: Number(u2), a: Number(o2) });
  return f(i2);
}, "hsl"], [function(r2) {
  var n2 = r2.h, a2 = r2.s, o2 = r2.v, i2 = r2.a, s2 = void 0 === i2 ? 1 : i2;
  if (!t(n2) || !t(a2) || !t(o2)) return null;
  var h2 = function(r3) {
    return { h: u(r3.h), s: e(r3.s, 0, 100), v: e(r3.v, 0, 100), a: e(r3.a) };
  }({ h: Number(n2), s: Number(a2), v: Number(o2), a: Number(s2) });
  return b(h2);
}, "hsv"]] };
var N = function(r2, t2) {
  for (var n2 = 0; n2 < t2.length; n2++) {
    var e2 = t2[n2][0](r2);
    if (e2) return [e2, t2[n2][1]];
  }
  return [null, void 0];
};
var x = function(r2) {
  return "string" == typeof r2 ? N(r2.trim(), y.string) : "object" == typeof r2 && null !== r2 ? N(r2, y.object) : [null, void 0];
};
var M = function(r2, t2) {
  var n2 = c(r2);
  return { h: n2.h, s: e(n2.s + 100 * t2, 0, 100), l: n2.l, a: n2.a };
};
var H = function(r2) {
  return (299 * r2.r + 587 * r2.g + 114 * r2.b) / 1e3 / 255;
};
var $ = function(r2, t2) {
  var n2 = c(r2);
  return { h: n2.h, s: n2.s, l: e(n2.l + 100 * t2, 0, 100), a: n2.a };
};
var j = function() {
  function r2(r3) {
    this.parsed = x(r3)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return r2.prototype.isValid = function() {
    return null !== this.parsed;
  }, r2.prototype.brightness = function() {
    return n(H(this.rgba), 2);
  }, r2.prototype.isDark = function() {
    return H(this.rgba) < 0.5;
  }, r2.prototype.isLight = function() {
    return H(this.rgba) >= 0.5;
  }, r2.prototype.toHex = function() {
    return r3 = o(this.rgba), t2 = r3.r, e2 = r3.g, u2 = r3.b, i2 = (a2 = r3.a) < 1 ? s(n(255 * a2)) : "", "#" + s(t2) + s(e2) + s(u2) + i2;
    var r3, t2, e2, u2, a2, i2;
  }, r2.prototype.toRgb = function() {
    return o(this.rgba);
  }, r2.prototype.toRgbString = function() {
    return r3 = o(this.rgba), t2 = r3.r, n2 = r3.g, e2 = r3.b, (u2 = r3.a) < 1 ? "rgba(" + t2 + ", " + n2 + ", " + e2 + ", " + u2 + ")" : "rgb(" + t2 + ", " + n2 + ", " + e2 + ")";
    var r3, t2, n2, e2, u2;
  }, r2.prototype.toHsl = function() {
    return d(c(this.rgba));
  }, r2.prototype.toHslString = function() {
    return r3 = d(c(this.rgba)), t2 = r3.h, n2 = r3.s, e2 = r3.l, (u2 = r3.a) < 1 ? "hsla(" + t2 + ", " + n2 + "%, " + e2 + "%, " + u2 + ")" : "hsl(" + t2 + ", " + n2 + "%, " + e2 + "%)";
    var r3, t2, n2, e2, u2;
  }, r2.prototype.toHsv = function() {
    return r3 = h(this.rgba), { h: n(r3.h), s: n(r3.s), v: n(r3.v), a: n(r3.a, 3) };
    var r3;
  }, r2.prototype.invert = function() {
    return w({ r: 255 - (r3 = this.rgba).r, g: 255 - r3.g, b: 255 - r3.b, a: r3.a });
    var r3;
  }, r2.prototype.saturate = function(r3) {
    return void 0 === r3 && (r3 = 0.1), w(M(this.rgba, r3));
  }, r2.prototype.desaturate = function(r3) {
    return void 0 === r3 && (r3 = 0.1), w(M(this.rgba, -r3));
  }, r2.prototype.grayscale = function() {
    return w(M(this.rgba, -1));
  }, r2.prototype.lighten = function(r3) {
    return void 0 === r3 && (r3 = 0.1), w($(this.rgba, r3));
  }, r2.prototype.darken = function(r3) {
    return void 0 === r3 && (r3 = 0.1), w($(this.rgba, -r3));
  }, r2.prototype.rotate = function(r3) {
    return void 0 === r3 && (r3 = 15), this.hue(this.hue() + r3);
  }, r2.prototype.alpha = function(r3) {
    return "number" == typeof r3 ? w({ r: (t2 = this.rgba).r, g: t2.g, b: t2.b, a: r3 }) : n(this.rgba.a, 3);
    var t2;
  }, r2.prototype.hue = function(r3) {
    var t2 = c(this.rgba);
    return "number" == typeof r3 ? w({ h: r3, s: t2.s, l: t2.l, a: t2.a }) : n(t2.h);
  }, r2.prototype.isEqual = function(r3) {
    return this.toHex() === w(r3).toHex();
  }, r2;
}();
var w = function(r2) {
  return r2 instanceof j ? r2 : new j(r2);
};
var S = [];
var k = function(r2) {
  r2.forEach(function(r3) {
    S.indexOf(r3) < 0 && (r3(j, y), S.push(r3));
  });
};

// node_modules/colord/plugins/names.mjs
function names_default(e2, f2) {
  var a2 = { white: "#ffffff", bisque: "#ffe4c4", blue: "#0000ff", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", antiquewhite: "#faebd7", aqua: "#00ffff", azure: "#f0ffff", whitesmoke: "#f5f5f5", papayawhip: "#ffefd5", plum: "#dda0dd", blanchedalmond: "#ffebcd", black: "#000000", gold: "#ffd700", goldenrod: "#daa520", gainsboro: "#dcdcdc", cornsilk: "#fff8dc", cornflowerblue: "#6495ed", burlywood: "#deb887", aquamarine: "#7fffd4", beige: "#f5f5dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkkhaki: "#bdb76b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", peachpuff: "#ffdab9", darkmagenta: "#8b008b", darkred: "#8b0000", darkorchid: "#9932cc", darkorange: "#ff8c00", darkslateblue: "#483d8b", gray: "#808080", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", deeppink: "#ff1493", deepskyblue: "#00bfff", wheat: "#f5deb3", firebrick: "#b22222", floralwhite: "#fffaf0", ghostwhite: "#f8f8ff", darkviolet: "#9400d3", magenta: "#ff00ff", green: "#008000", dodgerblue: "#1e90ff", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", blueviolet: "#8a2be2", forestgreen: "#228b22", lawngreen: "#7cfc00", indianred: "#cd5c5c", indigo: "#4b0082", fuchsia: "#ff00ff", brown: "#a52a2a", maroon: "#800000", mediumblue: "#0000cd", lightcoral: "#f08080", darkturquoise: "#00ced1", lightcyan: "#e0ffff", ivory: "#fffff0", lightyellow: "#ffffe0", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", linen: "#faf0e6", mediumaquamarine: "#66cdaa", lemonchiffon: "#fffacd", lime: "#00ff00", khaki: "#f0e68c", mediumseagreen: "#3cb371", limegreen: "#32cd32", mediumspringgreen: "#00fa9a", lightskyblue: "#87cefa", lightblue: "#add8e6", midnightblue: "#191970", lightpink: "#ffb6c1", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", mintcream: "#f5fffa", lightslategray: "#778899", lightslategrey: "#778899", navajowhite: "#ffdead", navy: "#000080", mediumvioletred: "#c71585", powderblue: "#b0e0e6", palegoldenrod: "#eee8aa", oldlace: "#fdf5e6", paleturquoise: "#afeeee", mediumturquoise: "#48d1cc", mediumorchid: "#ba55d3", rebeccapurple: "#663399", lightsteelblue: "#b0c4de", mediumslateblue: "#7b68ee", thistle: "#d8bfd8", tan: "#d2b48c", orchid: "#da70d6", mediumpurple: "#9370db", purple: "#800080", pink: "#ffc0cb", skyblue: "#87ceeb", springgreen: "#00ff7f", palegreen: "#98fb98", red: "#ff0000", yellow: "#ffff00", slateblue: "#6a5acd", lavenderblush: "#fff0f5", peru: "#cd853f", palevioletred: "#db7093", violet: "#ee82ee", teal: "#008080", slategray: "#708090", slategrey: "#708090", aliceblue: "#f0f8ff", darkseagreen: "#8fbc8f", darkolivegreen: "#556b2f", greenyellow: "#adff2f", seagreen: "#2e8b57", seashell: "#fff5ee", tomato: "#ff6347", silver: "#c0c0c0", sienna: "#a0522d", lavender: "#e6e6fa", lightgreen: "#90ee90", orange: "#ffa500", orangered: "#ff4500", steelblue: "#4682b4", royalblue: "#4169e1", turquoise: "#40e0d0", yellowgreen: "#9acd32", salmon: "#fa8072", saddlebrown: "#8b4513", sandybrown: "#f4a460", rosybrown: "#bc8f8f", darksalmon: "#e9967a", lightgoldenrodyellow: "#fafad2", snow: "#fffafa", lightgrey: "#d3d3d3", lightgray: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969", olivedrab: "#6b8e23", olive: "#808000" }, r2 = {};
  for (var d2 in a2) r2[a2[d2]] = d2;
  var l2 = {};
  e2.prototype.toName = function(f3) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b)) return "transparent";
    var d3, i2, n2 = r2[this.toHex()];
    if (n2) return n2;
    if (null == f3 ? void 0 : f3.closest) {
      var o2 = this.toRgb(), t2 = 1 / 0, b2 = "black";
      if (!l2.length) for (var c2 in a2) l2[c2] = new e2(a2[c2]).toRgb();
      for (var g2 in a2) {
        var u2 = (d3 = o2, i2 = l2[g2], Math.pow(d3.r - i2.r, 2) + Math.pow(d3.g - i2.g, 2) + Math.pow(d3.b - i2.b, 2));
        u2 < t2 && (t2 = u2, b2 = g2);
      }
      return b2;
    }
  };
  f2.string.push([function(f3) {
    var r3 = f3.toLowerCase(), d3 = "transparent" === r3 ? "#0000" : a2[r3];
    return d3 ? new e2(d3).toRgb() : null;
  }, "name"]);
}

// node_modules/react-file-icon/dist/react-file-icon.esm.js
var glyphs = {
  "3d": import_react.default.createElement("path", {
    d: "M18 14.625V3.375L9 0 0 3.375v11.25L9 18l9-3.375zM9 2.136l5.918 2.22-5.98 2.242-5.919-2.22L9 2.137zM2 13.239V5.065l6.438 2.414v8.174L2 13.24zM9.438 15.7L16 13.239V5.018l-6.563 2.46V15.7z",
    transform: "translate(15 10)",
    fillRule: "evenodd"
  }),
  acrobat: import_react.default.createElement("path", {
    d: "M10.15 1.095C9.938.33 9.42-.051 8.984.005c-.528.068-1.09.382-1.314.876-.63 1.416.685 5.582.887 6.279-1.28 3.863-5.66 11.5-7.806 12.017-.045-.505.225-1.965 3.055-3.785.146-.157.315-.348.393-.472-2.392 1.168-5.492 3.044-3.628 4.448.102.079.259.146.439.213 1.426.528 3.425-1.201 5.435-5.121 2.213-.73 3.999-1.28 6.526-1.662 2.762 1.875 4.616 2.257 5.874 1.774.348-.135.898-.573 1.055-1.145-1.022 1.258-3.414.382-5.323-.82 1.763-.191 3.582-.303 4.369-.056 1 .314.965.808.954.876.079-.27.191-.708-.022-1.056-.842-1.37-4.706-.573-6.11-.427-2.212-1.336-3.74-3.717-4.358-5.436.573-2.212 1.19-3.818.742-5.413zm-.954 4.638C8.826 4.42 8.309 1.5 9.14.556c1.628.932.618 3.144.056 5.177zm3.044 6.514c-2.134.393-3.583.944-5.66 1.764.617-1.202 1.785-4.268 2.346-6.29.787 1.573 1.741 3.111 3.314 4.526z",
    transform: "translate(14 9)",
    fillRule: "evenodd"
  }),
  android: import_react.default.createElement("path", {
    d: "M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.87-0.2C4.5,5.65,4.41,6.01,4.56,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25S8.25,13.31,8.25,14C8.25,14.69,7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25C18.25,14.69,17.69,15.25,17,15.25z",
    transform: "translate(12 8)"
  }),
  audio: import_react.default.createElement("path", {
    d: "M.25 4.75v4.5h3L7 13V1L3.25 4.75h-3zM10.375 7A3.375 3.375 0 0 0 8.5 3.977v6.037A3.355 3.355 0 0 0 10.375 7zM8.5.421v1.545A5.254 5.254 0 0 1 12.25 7a5.254 5.254 0 0 1-3.75 5.032v1.545A6.747 6.747 0 0 0 13.75 7 6.747 6.747 0 0 0 8.5.421z",
    transform: "translate(17 12)",
    fillRule: "evenodd"
  }),
  binary: import_react.default.createElement("path", {
    d: "M2.338 6.112c1.192 0 1.928-1.072 1.928-2.68 0-1.56-.576-2.504-1.8-2.504C1.274.928.538 2 .538 3.608c0 1.56.576 2.504 1.8 2.504zM1.61 3.408c0-1.008.24-1.568.776-1.568.376 0 .616.336.728.888l-1.504.776v-.096zM2.418 5.2c-.368 0-.608-.32-.72-.856l1.496-.768v.056c0 1.008-.24 1.568-.776 1.568zm7.03.8l.088-.944H8.36V.896L7.272.984v.592l-1.184.112.024.824h1.16v2.544h-1.32V6zm5.199 0l.088-.944h-1.176V.896L12.47.984v.592l-1.184.112.024.824h1.16v2.544h-1.32V6zM4.25 14l.088-.944H3.162v-4.16l-1.088.088v.592L.89 9.688l.024.824h1.16v2.544H.754V14zm5.198 0l.088-.944H8.36v-4.16l-1.088.088v.592l-1.184.112.024.824h1.16v2.544h-1.32V14zm3.287.112c1.192 0 1.928-1.072 1.928-2.68 0-1.56-.576-2.504-1.8-2.504-1.192 0-1.928 1.072-1.928 2.68 0 1.56.576 2.504 1.8 2.504zm-.728-2.704c0-1.008.24-1.568.776-1.568.376 0 .616.336.728.888l-1.504.776v-.096zm.808 1.792c-.368 0-.608-.32-.72-.856l1.496-.768v.056c0 1.008-.24 1.568-.776 1.568z",
    transform: "translate(16 11)",
    fillRule: "evenodd"
  }),
  code: import_react.default.createElement("path", {
    d: "M4.078 13.67c-1.875-.527-2.812-1.738-2.812-3.634V9.49C1.266 8.437.844 7.911 0 7.911V6.138c.844 0 1.266-.529 1.266-1.586v-.64c.015-.938.257-1.696.726-2.274C2.466 1.06 3.162.64 4.078.38l.492 1.375c-.656.25-.997.95-1.023 2.102v.695c0 1.167-.482 1.99-1.445 2.469.963.479 1.445 1.304 1.445 2.476v.688c.026 1.15.367 1.851 1.023 2.101l-.492 1.383zm7.844 0c1.875-.527 2.812-1.738 2.812-3.634V9.49c0-1.052.422-1.578 1.266-1.578V6.138c-.844 0-1.266-.529-1.266-1.586v-.64c-.015-.938-.257-1.696-.726-2.274-.474-.578-1.17-.998-2.086-1.258l-.492 1.375c.656.25.997.95 1.023 2.102v.695c0 1.167.482 1.99 1.445 2.469-.963.479-1.445 1.304-1.445 2.476v.688c-.026 1.15-.367 1.851-1.023 2.101l.492 1.383z",
    transform: "translate(16 13)",
    fillRule: "evenodd"
  }),
  code2: import_react.default.createElement("path", {
    d: "M7.4 10.6L2.8 6l4.6-4.6L6 0 0 6l6 6 1.4-1.4zm5.2 0L17.2 6l-4.6-4.6L14 0l6 6-6 6-1.4-1.4z",
    transform: "translate(14 14)",
    fillRule: "evenodd"
  }),
  compressed: import_react.default.createElement("path", {
    d: "M.25 0A.25.25 0 0 0 0 .25v1.5c0 .138.112.25.25.25h1.5A.25.25 0 0 0 2 1.75V.25A.25.25 0 0 0 1.75 0H.25zM1 17a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H1zm0 4v3h2v-3H1zM2 2.25A.25.25 0 0 1 2.25 2h1.5a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 3.75v-1.5zM.25 4a.25.25 0 0 0-.25.25v1.5c0 .138.112.25.25.25h1.5A.25.25 0 0 0 2 5.75v-1.5A.25.25 0 0 0 1.75 4H.25zM2 6.25A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 7.75v-1.5zM.25 8a.25.25 0 0 0-.25.25v1.5c0 .138.112.25.25.25h1.5A.25.25 0 0 0 2 9.75v-1.5A.25.25 0 0 0 1.75 8H.25zM2 10.25a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-1.5zM.25 12a.25.25 0 0 0-.25.25v1.5c0 .138.112.25.25.25h1.5a.25.25 0 0 0 .25-.25v-1.5a.25.25 0 0 0-.25-.25H.25zM2 14.25a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-1.5z",
    transform: "translate(15 1)",
    fillRule: "evenodd"
  }),
  document: import_react.default.createElement("path", {
    d: "M12 4H0v2h12V4zM0 10h18V8H0v2zM0 0v2h18V0H0z",
    transform: "translate(15 15)",
    fillRule: "evenodd"
  }),
  drive: import_react.default.createElement("path", {
    d: "M2.199.289A.5.5 0 0 1 2.652 0h8.696a.5.5 0 0 1 .453.289l1.867 4a.5.5 0 0 1-.453.711H.785a.5.5 0 0 1-.453-.711l1.867-4zM13 6H1a.752.752 0 0 0-.75.75v4.5c0 .412.338.75.75.75h12c.412 0 .75-.338.75-.75v-4.5A.752.752 0 0 0 13 6zm-9.75 4.5c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5z",
    transform: "translate(17 13)",
    fillRule: "evenodd"
  }),
  font: import_react.default.createElement("path", {
    d: "M3.722 8.702l-.686 1.89c-.053.14-.094.28-.123.421-.03.135-.044.252-.044.352 0 .304.097.527.29.668.2.14.501.21.905.21h.414V13H.083v-.756h.343c.176 0 .325-.018.448-.053a.81.81 0 0 0 .334-.22c.1-.105.193-.249.281-.43.094-.182.197-.416.308-.704L5.787.15h1.406l4.07 11.136c.07.187.14.343.21.466.077.123.165.222.264.298.1.07.214.12.343.15.129.03.281.044.457.044h.237V13H7.826v-.756h.413c.72 0 1.081-.287 1.081-.862 0-.1-.014-.202-.044-.307a3.274 3.274 0 0 0-.105-.36l-.72-2.013H3.72zM7.009 4.65c-.188-.533-.36-1.031-.519-1.494a15.92 15.92 0 0 1-.378-1.354 7.12 7.12 0 0 1-.15.633 16.95 16.95 0 0 1-.395 1.283c-.082.229-.175.484-.28.765L4.063 7.796h4.061L7.009 4.65zm8.411 5.74c0 .562.117.984.351 1.265.24.275.61.413 1.108.413.363 0 .691-.059.984-.176.3-.117.551-.284.756-.5.211-.218.372-.481.483-.792.112-.31.168-.656.168-1.037V8.104l-1.152.053c-.51.023-.937.088-1.283.193-.34.1-.615.243-.826.43a1.546 1.546 0 0 0-.457.678c-.088.27-.132.58-.132.931zm2.18-6.32c-.346 0-.627.05-.844.15a1.182 1.182 0 0 0-.501.404 1.594 1.594 0 0 0-.237.624c-.041.24-.062.5-.062.782-.498 0-.879-.085-1.143-.255-.257-.17-.386-.463-.386-.879 0-.31.085-.574.255-.79.17-.218.401-.393.694-.528.299-.14.644-.243 1.037-.308a7.76 7.76 0 0 1 1.257-.097c.55 0 1.031.056 1.441.167.41.106.753.282 1.029.528.275.246.48.568.615.967.14.392.21.876.21 1.45v4.667c0 .252.021.46.062.624a.928.928 0 0 0 .194.395c.088.1.202.17.343.211.146.041.319.062.518.062h.053V13H19.7l-.281-1.547h-.15c-.187.252-.369.483-.544.694-.176.211-.37.393-.58.545-.211.152-.452.27-.721.352a3.053 3.053 0 0 1-.958.131c-.399 0-.77-.058-1.116-.175a2.369 2.369 0 0 1-.888-.519 2.516 2.516 0 0 1-.58-.896c-.14-.364-.211-.791-.211-1.284 0-.955.34-1.664 1.02-2.127.68-.462 1.707-.714 3.084-.755l1.495-.053V6.285a6.93 6.93 0 0 0-.053-.888 1.778 1.778 0 0 0-.229-.703 1.14 1.14 0 0 0-.51-.457c-.216-.111-.51-.167-.878-.167z",
    transform: "translate(13 12)",
    fillRule: "evenodd"
  }),
  image: import_react.default.createElement("path", {
    d: "M13 0L9.25 5l2.85 3.8-1.6 1.2C8.81 7.75 6 4 6 4l-6 8h22L13 0z",
    transform: "translate(13 14)",
    fillRule: "evenodd"
  }),
  presentation: import_react.default.createElement("path", {
    d: "M2 4H0v10c0 1.1.9 2 2 2h14v-2H2V4zm16-4H6C4.9 0 4 .9 4 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 10H6V2h12v8z",
    transform: "matrix(-1 0 0 1 34 12)",
    fillRule: "evenodd"
  }),
  settings: import_react.default.createElement("path", {
    d: "M13.572 8.735c.03-.24.053-.48.053-.735s-.023-.495-.053-.735l1.583-1.237a.378.378 0 0 0 .09-.48l-1.5-2.595a.377.377 0 0 0-.457-.165l-1.868.75a5.48 5.48 0 0 0-1.268-.735L9.868.815A.366.366 0 0 0 9.5.5h-3a.366.366 0 0 0-.367.315l-.285 1.988a5.762 5.762 0 0 0-1.268.735l-1.868-.75a.366.366 0 0 0-.457.165l-1.5 2.595a.37.37 0 0 0 .09.48l1.583 1.237c-.03.24-.053.488-.053.735 0 .248.022.495.053.735L.845 9.973a.378.378 0 0 0-.09.48l1.5 2.595c.09.165.292.225.458.165l1.867-.75c.39.3.81.547 1.268.735l.285 1.987c.022.18.18.315.367.315h3a.366.366 0 0 0 .367-.315l.285-1.988a5.762 5.762 0 0 0 1.268-.734l1.867.75c.173.067.368 0 .458-.165l1.5-2.595a.378.378 0 0 0-.09-.48l-1.582-1.238zM8 10.625A2.628 2.628 0 0 1 5.375 8 2.628 2.628 0 0 1 8 5.375 2.628 2.628 0 0 1 10.625 8 2.628 2.628 0 0 1 8 10.625z",
    transform: "translate(16 11)",
    fillRule: "evenodd"
  }),
  spreadsheet: import_react.default.createElement("path", {
    d: "M0 8h6V5H0v3zm0 5h6v-3H0v3zM0 3h6V0H0v3zm8 5h12V5H8v3zm0 5h12v-3H8v3zM8 0v3h12V0H8z",
    transform: "translate(14 14)",
    fillRule: "evenodd"
  }),
  vector: import_react.default.createElement("path", {
    d: "M14.5 2V1a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v1H3.937a2 2 0 1 0 0 1h3.936A9 9 0 0 0 3 11v1h2v-1a7.003 7.003 0 0 1 4.594-6.576A1 1 0 0 0 10.5 5h3a1 1 0 0 0 .906-.576A7.003 7.003 0 0 1 19 11v1h2v-1a9 9 0 0 0-4.873-8h3.936a2 2 0 1 0 0-1H14.5zm-1-1h-3v3h3V1zM2 1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm19 1a1 1 0 1 0 2 0 1 1 0 0 0-2 0z",
    transform: "translate(12 14)",
    fillRule: "evenodd"
  }),
  video: import_react.default.createElement("path", {
    d: "M10.75 3.875V1.25A.752.752 0 0 0 10 .5H1a.752.752 0 0 0-.75.75v7.5c0 .412.338.75.75.75h9c.412 0 .75-.338.75-.75V6.125l3 3V.875l-3 3z",
    transform: "translate(17 14)"
  })
};
k([names_default]);
var propTypes = {
  /** Color of icon background */
  color: import_prop_types.default.string,
  /** Text to display in label */
  extension: import_prop_types.default.string,
  /** Displays the corner fold */
  fold: import_prop_types.default.bool,
  /** Color of the corner fold */
  foldColor: import_prop_types.default.string,
  /** Color of file type icon */
  glyphColor: import_prop_types.default.string,
  /** Color of page gradient */
  gradientColor: import_prop_types.default.string,
  /** Opacity of page gradient */
  gradientOpacity: import_prop_types.default.number,
  /** Color of label */
  labelColor: import_prop_types.default.string,
  /** Color of label text */
  labelTextColor: import_prop_types.default.string,
  /** Displays the label in all caps */
  labelUppercase: import_prop_types.default.bool,
  /** Corner radius of the file icon */
  radius: import_prop_types.default.number,
  /** Type of glyph icon to display */
  type: import_prop_types.default.oneOf(["3d", "acrobat", "android", "audio", "binary", "code", "code2", "compressed", "document", "drive", "font", "image", "presentation", "settings", "spreadsheet", "vector", "video"])
};
var VIEWBOX = {
  WIDTH: 40,
  HEIGHT: 48
};
var ICON = {
  WIDTH: VIEWBOX.WIDTH,
  HEIGHT: VIEWBOX.HEIGHT,
  X_OFFSET: 0
};
var FOLD = {
  HEIGHT: 12
};
var LABEL_HEIGHT = 14;
var useId = import_react.default.useId || /* @__PURE__ */ function() {
  var i2 = 0;
  return function() {
    return i2++;
  };
}();
var FileIcon = function FileIcon2(_ref) {
  var _ref$color = _ref.color, color = _ref$color === void 0 ? "whitesmoke" : _ref$color, extension = _ref.extension, _ref$fold = _ref.fold, fold = _ref$fold === void 0 ? true : _ref$fold, foldColor = _ref.foldColor, glyphColor = _ref.glyphColor, _ref$gradientColor = _ref.gradientColor, gradientColor = _ref$gradientColor === void 0 ? "white" : _ref$gradientColor, _ref$gradientOpacity = _ref.gradientOpacity, gradientOpacity = _ref$gradientOpacity === void 0 ? 0.25 : _ref$gradientOpacity, labelColor = _ref.labelColor, _ref$labelTextColor = _ref.labelTextColor, labelTextColor = _ref$labelTextColor === void 0 ? "white" : _ref$labelTextColor, _ref$labelUppercase = _ref.labelUppercase, labelUppercase = _ref$labelUppercase === void 0 ? false : _ref$labelUppercase, _ref$radius = _ref.radius, radius = _ref$radius === void 0 ? 4 : _ref$radius, type = _ref.type;
  var id = useId();
  var UNIQUE_ID = typeof jest === "undefined" ? id : "";
  return import_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 " + VIEWBOX.WIDTH + " " + VIEWBOX.HEIGHT,
    width: "100%",
    style: {
      maxWidth: "100%"
    }
  }, import_react.default.createElement("defs", null, import_react.default.createElement("clipPath", {
    id: "pageRadius" + UNIQUE_ID
  }, import_react.default.createElement("rect", {
    x: ICON.X_OFFSET,
    y: "0",
    rx: radius,
    ry: radius,
    width: ICON.WIDTH,
    height: ICON.HEIGHT
  })), import_react.default.createElement("clipPath", {
    id: "foldCrop" + UNIQUE_ID
  }, import_react.default.createElement("rect", {
    width: ICON.WIDTH,
    height: FOLD.HEIGHT,
    transform: "rotate(-45 0 " + FOLD.HEIGHT + ")"
  })), import_react.default.createElement("linearGradient", {
    x1: "100%",
    y1: "0%",
    y2: "100%",
    id: "pageGradient" + UNIQUE_ID
  }, import_react.default.createElement("stop", {
    stopColor: gradientColor,
    stopOpacity: gradientOpacity,
    offset: "0%"
  }), import_react.default.createElement("stop", {
    stopColor: gradientColor,
    stopOpacity: "0",
    offset: "66.67%"
  }))), import_react.default.createElement("g", {
    id: "file",
    clipPath: "url(#pageRadius" + UNIQUE_ID + ")"
  }, fold ? import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement("path", {
    d: "M" + ICON.X_OFFSET + " 0 h " + (ICON.WIDTH - FOLD.HEIGHT) + " L " + (ICON.WIDTH + ICON.X_OFFSET) + " " + FOLD.HEIGHT + " v " + (ICON.HEIGHT - FOLD.HEIGHT) + " H " + ICON.X_OFFSET + " Z",
    fill: color
  }), import_react.default.createElement("path", {
    d: "M" + ICON.X_OFFSET + " 0 h " + (ICON.WIDTH - FOLD.HEIGHT) + " L " + (ICON.WIDTH + ICON.X_OFFSET) + " " + FOLD.HEIGHT + " v " + (ICON.HEIGHT - FOLD.HEIGHT) + " H " + ICON.X_OFFSET + " Z",
    fill: "url(#pageGradient" + UNIQUE_ID + ")"
  })) : import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement("rect", {
    x: ICON.X_OFFSET,
    y: "0",
    width: ICON.WIDTH,
    height: ICON.HEIGHT,
    fill: color
  }), import_react.default.createElement("rect", {
    x: ICON.X_OFFSET,
    y: "0",
    width: ICON.WIDTH,
    height: ICON.HEIGHT,
    fill: "url(#pageGradient" + UNIQUE_ID + ")"
  }))), fold && import_react.default.createElement("g", {
    transform: "translate(28 " + FOLD.HEIGHT + ") rotate(-90)"
  }, import_react.default.createElement("rect", {
    width: ICON.WIDTH,
    height: ICON.HEIGHT,
    fill: foldColor || w(color).darken(0.1).toHex(),
    rx: radius,
    ry: radius,
    clipPath: "url(#foldCrop" + UNIQUE_ID + ")"
  })), extension && import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement("g", {
    id: "label" + UNIQUE_ID
  }, import_react.default.createElement("rect", {
    fill: labelColor || w(color).darken(0.3).toHex(),
    x: ICON.X_OFFSET,
    y: ICON.HEIGHT - LABEL_HEIGHT,
    width: ICON.WIDTH,
    height: LABEL_HEIGHT,
    clipPath: "url(#pageRadius" + UNIQUE_ID + ")"
  })), import_react.default.createElement("g", {
    id: "labelText" + UNIQUE_ID,
    transform: "translate(" + ICON.X_OFFSET + " 34)"
  }, import_react.default.createElement("text", {
    x: ICON.WIDTH / 2,
    y: "10",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontSize: "9",
    fill: labelTextColor,
    textAnchor: "middle",
    style: {
      fontWeight: "bold",
      textAlign: "center",
      pointerEvents: "none",
      textTransform: labelUppercase ? "uppercase" : "none",
      userSelect: "none"
    }
  }, extension))), type && import_react.default.createElement("g", {
    transform: "translate(-4 " + (!extension ? 6 : 0) + ")",
    fill: glyphColor || w(color).darken(0.15).toHex()
  }, glyphs[type]));
};
FileIcon.propTypes = propTypes;
var defaultStyles = {
  "3dm": {
    labelColor: "#8D1A11",
    type: "3d"
  },
  "3ds": {
    labelColor: "#5FB9AD",
    type: "3d"
  },
  "3g2": {
    type: "video"
  },
  "3gp": {
    type: "video"
  },
  "7zip": {
    type: "compressed"
  },
  aab: {
    type: "android",
    labelColor: "#3DDC84"
  },
  aac: {
    type: "audio"
  },
  aep: {
    type: "video"
  },
  ai: {
    color: "#423325",
    gradientOpacity: 0,
    labelColor: "#423325",
    labelTextColor: "#FF7F18",
    labelUppercase: true,
    foldColor: "#FF7F18",
    radius: 2
  },
  aif: {
    type: "audio"
  },
  aiff: {
    type: "audio"
  },
  apk: {
    type: "android",
    labelColor: "#3DDC84"
  },
  apkm: {
    type: "android",
    labelColor: "#3DDC84"
  },
  apks: {
    type: "android",
    labelColor: "#3DDC84"
  },
  asf: {
    type: "video"
  },
  asp: {
    type: "code"
  },
  aspx: {
    type: "code"
  },
  avi: {
    type: "video"
  },
  bin: {
    type: "binary"
  },
  bmp: {
    type: "image"
  },
  c: {
    type: "code"
  },
  cpp: {
    type: "code"
  },
  cs: {
    type: "code"
  },
  css: {
    type: "code"
  },
  csv: {
    type: "spreadsheet"
  },
  cue: {
    type: "document"
  },
  dll: {
    type: "settings"
  },
  dmg: {
    type: "drive"
  },
  doc: {
    color: "#2C5898",
    foldColor: "#254A80",
    glyphColor: "rgba(255,255,255,0.4)",
    labelColor: "#2C5898",
    labelUppercase: true,
    type: "document"
  },
  docx: {
    color: "#2C5898",
    foldColor: "#254A80",
    glyphColor: "rgba(255,255,255,0.4)",
    labelColor: "#2C5898",
    labelUppercase: true,
    type: "document"
  },
  dwg: {
    type: "vector"
  },
  dxf: {
    type: "vector"
  },
  eot: {
    type: "font"
  },
  eps: {
    type: "vector"
  },
  exe: {
    type: "settings"
  },
  flac: {
    type: "audio"
  },
  flv: {
    type: "video"
  },
  fnt: {
    type: "font"
  },
  fodp: {
    type: "presentation"
  },
  fods: {
    type: "spreadsheet"
  },
  fodt: {
    type: "document"
  },
  fon: {
    type: "font"
  },
  gif: {
    type: "image"
  },
  gz: {
    type: "compressed"
  },
  heic: {
    type: "image"
  },
  htm: {
    type: "code"
  },
  html: {
    type: "code"
  },
  indd: {
    color: "#4B2B36",
    gradientOpacity: 0,
    labelColor: "#4B2B36",
    labelTextColor: "#FF408C",
    labelUppercase: true,
    foldColor: "#FF408C",
    radius: 2
  },
  ini: {
    type: "settings"
  },
  java: {
    type: "code"
  },
  jpeg: {
    type: "image"
  },
  jpg: {
    type: "image"
  },
  js: {
    labelColor: "#F7DF1E",
    type: "code"
  },
  json: {
    type: "code"
  },
  jsx: {
    labelColor: "#00D8FF",
    type: "code"
  },
  m4a: {
    type: "audio"
  },
  m4v: {
    type: "video"
  },
  max: {
    labelColor: "#5FB9AD",
    type: "3d"
  },
  md: {
    type: "document"
  },
  mid: {
    type: "audio"
  },
  mkv: {
    type: "video"
  },
  mov: {
    type: "video"
  },
  mp3: {
    type: "audio"
  },
  mp4: {
    type: "video"
  },
  mpeg: {
    type: "video"
  },
  mpg: {
    type: "video"
  },
  obj: {
    type: "3d"
  },
  odp: {
    type: "presentation"
  },
  ods: {
    type: "spreadsheet"
  },
  odt: {
    type: "document"
  },
  ogg: {
    type: "audio"
  },
  ogv: {
    type: "video"
  },
  otf: {
    type: "font"
  },
  pdf: {
    labelColor: "#D93831",
    type: "acrobat"
  },
  php: {
    labelColor: "#8892BE",
    type: "code"
  },
  pkg: {
    type: "3d"
  },
  plist: {
    type: "settings"
  },
  png: {
    type: "image"
  },
  ppt: {
    color: "#D14423",
    foldColor: "#AB381D",
    glyphColor: "rgba(255,255,255,0.4)",
    labelColor: "#D14423",
    labelUppercase: true,
    type: "presentation"
  },
  pptx: {
    color: "#D14423",
    foldColor: "#AB381D",
    glyphColor: "rgba(255,255,255,0.4)",
    labelColor: "#D14423",
    labelUppercase: true,
    type: "presentation"
  },
  pr: {
    type: "video"
  },
  ps: {
    type: "vector"
  },
  psd: {
    color: "#34364E",
    gradientOpacity: 0,
    labelColor: "#34364E",
    labelTextColor: "#31C5F0",
    labelUppercase: true,
    foldColor: "#31C5F0",
    radius: 2
  },
  py: {
    labelColor: "#FFDE57",
    type: "code"
  },
  rar: {
    type: "compressed"
  },
  rb: {
    labelColor: "#BB271A",
    type: "code"
  },
  rm: {
    type: "video"
  },
  rtf: {
    type: "document"
  },
  scss: {
    labelColor: "#C16A98",
    type: "code"
  },
  sitx: {
    type: "compressed"
  },
  skp: {
    type: "3d"
  },
  svg: {
    type: "vector"
  },
  swf: {
    type: "video"
  },
  sys: {
    type: "settings"
  },
  tar: {
    type: "compressed"
  },
  tex: {
    type: "document"
  },
  tif: {
    type: "image"
  },
  tiff: {
    type: "image"
  },
  ts: {
    labelColor: "#3478C7",
    type: "code"
  },
  ttf: {
    type: "font"
  },
  txt: {
    type: "document"
  },
  wav: {
    type: "audio"
  },
  webm: {
    type: "video"
  },
  wmv: {
    type: "video"
  },
  woff: {
    type: "font"
  },
  wpd: {
    type: "document"
  },
  wps: {
    type: "document"
  },
  xapk: {
    type: "android",
    labelColor: "#3DDC84"
  },
  xlr: {
    type: "spreadsheet"
  },
  xls: {
    color: "#1A754C",
    foldColor: "#16613F",
    glyphColor: "rgba(255,255,255,0.4)",
    labelColor: "#1A754C",
    labelUppercase: true,
    type: "spreadsheet"
  },
  xlsx: {
    color: "#1A754C",
    foldColor: "#16613F",
    glyphColor: "rgba(255,255,255,0.4)",
    labelColor: "#1A754C",
    labelUppercase: true,
    type: "spreadsheet"
  },
  yml: {
    type: "code"
  },
  zip: {
    type: "compressed"
  },
  zipx: {
    type: "compressed"
  }
};
export {
  FileIcon,
  defaultStyles
};
/*! Bundled license information:

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)
*/
//# sourceMappingURL=react-file-icon.js.map
