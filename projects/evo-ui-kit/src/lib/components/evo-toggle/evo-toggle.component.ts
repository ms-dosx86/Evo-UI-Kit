import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export enum EvoToggleColors {
    green = 'green',
    orange = 'orange',
    purple = 'purple',
    blue = 'blue',
}

@Component({
    selector: 'evo-toggle',
    templateUrl: './evo-toggle.component.html',
    styleUrls: ['./evo-toggle.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EvoToggleComponent),
            multi: true,
        },
    ],
})
export class EvoToggleComponent implements ControlValueAccessor {
    @Input() color: EvoToggleColors = EvoToggleColors.green;

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        if (value !== this._value) {
            this._value = value;
            this.onChange(value);
        }
    }

    randomId = Math.random().toString(36).substr(2, 5);

    _value;

    constructor() {
    }

    onChange = (_value) => {};
    onTouched = () => {};

    writeValue(value: any): void {
        if (value !== this._value) {
            this._value = value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    get totalClasses(): string[] {
        const classes: string[] = [];

        if (this.color) {
            classes.push(this.color);
        }

        return classes;
    }

}
