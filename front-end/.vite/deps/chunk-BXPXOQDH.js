import {
  _extends,
  init_extends
} from "./chunk-3RNH3RUA.js";

// node_modules/@mui/utils/exactProp/exactProp.js
init_extends();
var specialProperty = "exact-prop: ​";
function exactProp(propTypes) {
  if (false) {
    return propTypes;
  }
  return _extends({}, propTypes, {
    [specialProperty]: (props) => {
      const unsupportedProps = Object.keys(props).filter((prop) => !propTypes.hasOwnProperty(prop));
      if (unsupportedProps.length > 0) {
        return new Error(`The following props are not supported: ${unsupportedProps.map((prop) => `\`${prop}\``).join(", ")}. Please remove them.`);
      }
      return null;
    }
  });
}

export {
  exactProp
};
//# sourceMappingURL=chunk-BXPXOQDH.js.map
