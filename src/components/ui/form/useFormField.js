import _objectSpread from "@/../node_modules/@babel/runtime/helpers/esm/objectSpread2.js";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.error.to-string.js";
import "core-js/modules/es.function.name.js";
import { FieldContextKey, useFieldError, useIsFieldDirty, useIsFieldTouched, useIsFieldValid } from "vee-validate";
import { inject } from "vue";
import { FORM_ITEM_INJECTION_KEY } from "./FormItem.vue";

export function useFormField() {
    var fieldContext = inject(FieldContextKey);
    var fieldItemContext = inject(FORM_ITEM_INJECTION_KEY);

    var fieldState = {
        valid: useIsFieldValid(),
        isDirty: useIsFieldDirty(),
        isTouched: useIsFieldTouched(),
        error: useFieldError(),
    };

    if (!fieldContext) throw new Error("useFormField should be used within <FormField>");

    var name = fieldContext.name;
    var id = fieldItemContext;

    return _objectSpread(
        {
            id: id,
            name: name,
            formItemId: "".concat(id, "-form-item"),
            formDescriptionId: "".concat(id, "-form-item-description"),
            formMessageId: "".concat(id, "-form-item-message"),
        },
        fieldState
    );
}
