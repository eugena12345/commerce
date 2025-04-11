import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = '_value';

export default class SearchValueStore {
    private _value: string = '';

    constructor({valueDefault}: {valueDefault:string}) {
        this._value = valueDefault;
        makeObservable<SearchValueStore, PrivateFields>(this, {
            _value: observable,
            value: computed,
            setValue: action,
        })
    }

    get value() {
        return this._value;
    }

    setValue = (newValue: string) => {
        this._value = newValue;
    }

    reset(): void {
        this._value = '';
    }

    destroy(): void {
        this.reset();
    }
}