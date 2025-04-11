import { action, computed, makeObservable, observable } from "mobx";
import { Option } from "App/pages/components/MultiDropdown/MultiDropdown";

type PrivateFields = '_value';

export default class FilterValueStore {
    private _value: Option[] = [];

    constructor({valueDefault}: {valueDefault:[]}) {
        this._value = valueDefault;
        makeObservable<FilterValueStore, PrivateFields>(this, {
            _value: observable,
            value: computed,
            setValue: action,
        })
    }

    get value() {
        return this._value;
    }

    setValue = (newValue: Option[]) => {
        this._value = newValue;
    }

    reset(): void {
        this._value = [];
    }

    destroy(): void {
        this.reset();
    }
}