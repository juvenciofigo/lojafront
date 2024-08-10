import _objectSpread from "@/../node_modules/@babel/runtime/helpers/esm/objectSpread2.js";
import _toConsumableArray from "@/../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js";
import "core-js/modules/es.error.to-string.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.for-each.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.date.to-string.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/web.timers.js";
import { computed, ref } from "vue";

var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1000000;

var actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST",
};

var count = 0;

function genId() {
    count = (count + 1) % Number.MAX_VALUE;
    return count.toString();
}

var toastTimeouts = new Map();

function addToRemoveQueue(toastId) {
    if (toastTimeouts.has(toastId)) return;

    var timeout = setTimeout(function () {
        toastTimeouts["delete"](toastId);
        dispatch({
            type: actionTypes.REMOVE_TOAST,
            toastId: toastId,
        });
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(toastId, timeout);
}

var state = ref({
    toasts: [],
});

function dispatch(action) {
    switch (action.type) {
        case actionTypes.ADD_TOAST:
            state.value.toasts = [action.toast].concat(_toConsumableArray(state.value.toasts)).slice(0, TOAST_LIMIT);
            break;

        case actionTypes.UPDATE_TOAST:
            state.value.toasts = state.value.toasts.map(function (t) {
                return t.id === action.toast.id ? _objectSpread(_objectSpread({}, t), action.toast) : t;
            });
            break;

        case actionTypes.DISMISS_TOAST: {
            var toastId = action.toastId;

            if (toastId) {
                addToRemoveQueue(toastId);
            } else {
                state.value.toasts.forEach(function (toast) {
                    addToRemoveQueue(toast.id);
                });
            }

            state.value.toasts = state.value.toasts.map(function (t) {
                return t.id === toastId || toastId === undefined
                    ? _objectSpread(
                          _objectSpread({}, t),
                          {},
                          {
                              open: false,
                          }
                      )
                    : t;
            });
            break;
        }

        case actionTypes.REMOVE_TOAST:
            if (action.toastId === undefined) state.value.toasts = [];
            else
                state.value.toasts = state.value.toasts.filter(function (t) {
                    return t.id !== action.toastId;
                });

            break;
    }
}

function useToast() {
    return {
        toasts: computed(function () {
            return state.value.toasts;
        }),
        toast: toast,
        dismiss: function dismiss(toastId) {
            return dispatch({ type: actionTypes.DISMISS_TOAST, toastId: toastId });
        },
    };
}

function toast(props) {
    var id = genId();

    var update = function update(props) {
        return dispatch({
            type: actionTypes.UPDATE_TOAST,
            toast: _objectSpread(_objectSpread({}, props), {}, { id: id }),
        });
    };

    var dismiss = function dismiss() {
        return dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });
    };

    dispatch({
        type: actionTypes.ADD_TOAST,
        toast: _objectSpread(
            _objectSpread({}, props),
            {},
            {
                id: id,
                open: true,
                onOpenChange: function onOpenChange(open) {
                    if (!open) dismiss();
                },
            }
        ),
    });

    return {
        id: id,
        dismiss: dismiss,
        update: update,
    };
}

export { toast, useToast };
