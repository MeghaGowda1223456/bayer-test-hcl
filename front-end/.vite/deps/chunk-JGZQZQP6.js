import {
  formControlState
} from "./chunk-IBWUGY4Z.js";
import {
  useId_default
} from "./chunk-ERLNGPH6.js";
import {
  RadioGroupContext_default
} from "./chunk-N6EGGRPS.js";
import {
  useFormControl
} from "./chunk-JYUCHOTF.js";
import {
  useControlled_default
} from "./chunk-A6CU4HUJ.js";
import {
  useForkRef_default
} from "./chunk-QX2TD7FN.js";
import {
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  styled_default,
  useThemeProps
} from "./chunk-E7ADWVAN.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  init_extends,
  require_jsx_runtime
} from "./chunk-3RNH3RUA.js";
import {
  require_react
} from "./chunk-65KY755N.js";
import {
  require_prop_types
} from "./chunk-RB5TOXPS.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/@mui/material/RadioGroup/RadioGroup.js
init_extends();
var React2 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());

// node_modules/@mui/material/FormGroup/FormGroup.js
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/material/FormGroup/formGroupClasses.js
function getFormGroupUtilityClass(slot) {
  return generateUtilityClass("MuiFormGroup", slot);
}
var formGroupClasses = generateUtilityClasses("MuiFormGroup", ["root", "row", "error"]);
var formGroupClasses_default = formGroupClasses;

// node_modules/@mui/material/FormGroup/FormGroup.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["className", "row"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    row,
    error
  } = ownerState;
  const slots = {
    root: ["root", row && "row", error && "error"]
  };
  return composeClasses(slots, getFormGroupUtilityClass, classes);
};
var FormGroupRoot = styled_default("div", {
  name: "MuiFormGroup",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.row && styles.row];
  }
})(({
  ownerState
}) => _extends({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap"
}, ownerState.row && {
  flexDirection: "row"
}));
var FormGroup = React.forwardRef(function FormGroup2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiFormGroup"
  });
  const {
    className,
    row = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["error"]
  });
  const ownerState = _extends({}, props, {
    row,
    error: fcs.error
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(FormGroupRoot, _extends({
    className: clsx_default(classes.root, className),
    ownerState,
    ref
  }, other));
});
true ? FormGroup.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * Display group of elements in a compact row.
   * @default false
   */
  row: import_prop_types.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var FormGroup_default = FormGroup;

// node_modules/@mui/material/RadioGroup/radioGroupClasses.js
function getRadioGroupUtilityClass(slot) {
  return generateUtilityClass("MuiRadioGroup", slot);
}
var radioGroupClasses = generateUtilityClasses("MuiRadioGroup", ["root", "row", "error"]);
var radioGroupClasses_default = radioGroupClasses;

// node_modules/@mui/material/RadioGroup/RadioGroup.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded2 = ["actions", "children", "className", "defaultValue", "name", "onChange", "value"];
var useUtilityClasses2 = (props) => {
  const {
    classes,
    row,
    error
  } = props;
  const slots = {
    root: ["root", row && "row", error && "error"]
  };
  return composeClasses(slots, getRadioGroupUtilityClass, classes);
};
var RadioGroup = React2.forwardRef(function RadioGroup2(props, ref) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions,
    children,
    className,
    defaultValue,
    name: nameProp,
    onChange,
    value: valueProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const rootRef = React2.useRef(null);
  const classes = useUtilityClasses2(props);
  const [value, setValueState] = useControlled_default({
    controlled: valueProp,
    default: defaultValue,
    name: "RadioGroup"
  });
  React2.useImperativeHandle(actions, () => ({
    focus: () => {
      let input = rootRef.current.querySelector("input:not(:disabled):checked");
      if (!input) {
        input = rootRef.current.querySelector("input:not(:disabled)");
      }
      if (input) {
        input.focus();
      }
    }
  }), []);
  const handleRef = useForkRef_default(ref, rootRef);
  const name = useId_default(nameProp);
  const contextValue = React2.useMemo(() => ({
    name,
    onChange(event) {
      setValueState(event.target.value);
      if (onChange) {
        onChange(event, event.target.value);
      }
    },
    value
  }), [name, onChange, setValueState, value]);
  return (0, import_jsx_runtime2.jsx)(RadioGroupContext_default.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime2.jsx)(FormGroup_default, _extends({
      role: "radiogroup",
      ref: handleRef,
      className: clsx_default(classes.root, className)
    }, other, {
      children
    }))
  });
});
true ? RadioGroup.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types2.default.node,
  /**
   * @ignore
   */
  className: import_prop_types2.default.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: import_prop_types2.default.any,
  /**
   * The name used to reference the value of the control.
   * If you don't provide this prop, it falls back to a randomly generated name.
   */
  name: import_prop_types2.default.string,
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * @param {string} value The value of the selected radio button.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: import_prop_types2.default.func,
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value: import_prop_types2.default.any
} : void 0;
var RadioGroup_default = RadioGroup;

export {
  getFormGroupUtilityClass,
  formGroupClasses_default,
  FormGroup_default,
  getRadioGroupUtilityClass,
  radioGroupClasses_default,
  RadioGroup_default
};
//# sourceMappingURL=chunk-JGZQZQP6.js.map
