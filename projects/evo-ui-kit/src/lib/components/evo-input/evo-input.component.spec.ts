import { EvoInputComponent,  } from './index';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EvoUiClassDirective } from '../../directives';
import { IMaskModule } from 'angular-imask';
import { EvoControlErrorComponent } from '../evo-control-error';
import { EvoButtonComponent } from '../evo-button';

describe('EvoButtonComponent', () => {
    let component: EvoInputComponent;
    let fixture: ComponentFixture<EvoInputComponent>;
    let inputEl: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EvoInputComponent,
                EvoUiClassDirective,
                EvoControlErrorComponent,
            ],
            imports: [
                IMaskModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EvoInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        inputEl = fixture.nativeElement.querySelector('.evo-input');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should pass functions to registerOnChange and registerOnTouched when init', () => {
        expect(component.onChange).toBeDefined();
        expect(component.onTouched).toBeDefined();
        expect(typeof component.onChange === 'function').toBeTruthy();
        expect(typeof component.onTouched === 'function').toBeTruthy();
    });

    it('should be disabled if set disabled attribute to true', fakeAsync(() => {
        expect(inputEl.classList.contains('evo-input_disabled')).toBeFalsy();
        expect(component.disabled).toBeFalsy();
        component.disabled = true;
        fixture.detectChanges();
        tick();
        expect(component.disabled).toBeTruthy();
        expect(component.isDisabled).toBeTruthy();
        expect(inputEl.classList.contains('evo-input_disabled')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.evo-input input').disabled).toBeTruthy();
    }));

    it('should show placeholder passed as attribute', () => {
        const placeholder = 'some placeholder';
        component.placeholder = placeholder;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.evo-input input').placeholder).toEqual(placeholder);
    });

    it('should has icon it passed as attribute', () => {
        component.icon = 'some src';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.evo-input .evo-input__additional .evo-input__icon')).toBeTruthy();
    });

    it('should has tooltip when it passed as attribute', () => {
        component.tooltip = 'some tooltip';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.evo-input .evo-input__additional .evo-input__tooltip')).toBeTruthy();
    });

    it('should show tooltip container when mouseenter event', fakeAsync(() => {
        const tooltip = 'some tooltip';
        component.tooltip = tooltip;
        fixture.detectChanges();
        fixture.nativeElement.querySelector('.evo-input .evo-input__additional .evo-input__tooltip').dispatchEvent(new MouseEvent('mouseenter'));

        expect(component.uiStates.isTooltipVisible).toBeTruthy();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.evo-input .evo-input__tooltip-container')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.evo-input .evo-input__tooltip-container').textContent.trim()).toEqual(tooltip);
    }));

    it('should set correct input type', () => {
        const type = 'number';
        component.type = type;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.evo-input input').type).toEqual(type);
    });

    it('should show passed prefix', () => {
        const prefix = 'prefix';
        component.prefix = prefix;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.evo-input .evo-input__prefix')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.evo-input .evo-input__prefix').textContent).toEqual(prefix);
    });

    it('should set autocomplete to input input element when it passed', () => {
        const autocomplete = 'on';
        component.autocomplete = autocomplete;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.evo-input input').autocomplete).toEqual(autocomplete);
    });

    it('triggers onChange call when set new value', () => {
        spyOn(component, 'onChange');
        const text = 'something to say';
        component.value = text;
        fixture.detectChanges();
        expect(component.onChange).toHaveBeenCalledWith(text);
    });

    it('should show loading state when passing loading attribute', () => {
        expect(fixture.nativeElement.querySelector('.evo-input .evo-input__loading-spinner')).toBeFalsy();
        component.loading = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.evo-input .evo-input__loading-spinner')).toBeTruthy();
    });

    it('should set isDisabled state when passing loading attribute', fakeAsync(() => {
        expect(component.isDisabled).toBeFalsy();
        component.loading = true;
        fixture.detectChanges();
        tick();
        expect(component.isDisabled).toBeTruthy();
        expect(inputEl.classList.contains('evo-input_disabled')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.evo-input input').disabled).toBeTruthy();
    }));

    it('should not hide additional elements when passing loading attribute', () => {
        component.tooltip = 'some tooltip';
        component.loading = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.evo-input .evo-input__additional .evo-input__tooltip')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.evo-input .evo-input__loading-spinner')).toBeTruthy();
    });

    it('should set value without prefix', () => {
        component.prefix = 'PRE-';
        const val = 'dator';
        component.value = `${component.prefix}${val}`;
        fixture.detectChanges();
        expect(component.value).toEqual(val);
    });

    it('should call onChange when set value', () => {
        spyOn(component, 'onChange');
        component.value = 'something';
        expect(component.onChange).toHaveBeenCalledWith(component.value);
    });

    it('should call onChange with prefix+value', () => {
        spyOn(component, 'onChange');
        component.prefix = 'PRE-';
        const val = 'dator';
        component.value = `${component.prefix}${val}`;
        expect(component.onChange).toHaveBeenCalledWith(`${component.prefix}${val}`);
    });

    it('should call focus on native input if autofocus attr set', () => {
        spyOn(component.inputElement.nativeElement, 'focus');
        component.autoFocus = true;
        component.ngAfterViewInit();
        expect(component.inputElement.nativeElement.focus).toHaveBeenCalled();
    });

    it('should set new value when writeValue called', () => {
        const val = 'something';
        component.writeValue(val);
        expect(component._value).toEqual(val);
        expect(component.value).toEqual(val);
    });

    it('should not rewrite value when it is the same', () => {
        const sameVal = 'something';
        component.value = sameVal;
        spyOn(component, 'onChange');
        component.writeValue(sameVal);
        expect(component.onChange).not.toHaveBeenCalled();
    });

    it('should set disable prop to true when call setDisabledState', () => {
        expect(component.disabled).toBeFalsy();
        component.setDisabledState(true);
        expect(component.disabled).toBeTruthy();
    });

    it('should set uiStates.isFocused to true when call onFocus', () => {
        expect(component.uiStates.isFocused).toBeFalsy();
        component.onFocus();
        expect(component.uiStates.isFocused).toBeTruthy();
    });

    it('should set uiStates.isFocused to false when call onBlur', () => {
        component.onFocus();
        expect(component.uiStates.isFocused).toBeTruthy();
        component.onBlur();
        expect(component.uiStates.isFocused).toBeFalsy();
    });

    it('should set call onTouched and blur.emit when call onBlur', () => {
        spyOn(component, 'onTouched');
        spyOn(component.blur, 'emit');
        component.onFocus();
        component.onBlur();
        expect(component.onTouched).toHaveBeenCalled();
        expect(component.blur.emit).toHaveBeenCalled();
    });

    it('should call onTooltipClick when click to tooltip', () => {
        component.tooltip = 'some tooltip';
        fixture.detectChanges();

        spyOn(component, 'onTooltipClick');
        const event = new MouseEvent('click');
        fixture.nativeElement.querySelector('.evo-input .evo-input__additional .evo-input__tooltip').dispatchEvent(event);
        expect(component.onTooltipClick).toHaveBeenCalled();
    });

    it('should call hideTooltip when mouseleave event triggered', () => {
        component.tooltip = 'some tooltip';
        fixture.detectChanges();

        spyOn(component, 'hideTooltip');
        fixture.nativeElement.querySelector('.evo-input .evo-input__additional .evo-input__tooltip').dispatchEvent(new MouseEvent('mouseenter'));
        fixture.nativeElement.querySelector('.evo-input .evo-input__additional .evo-input__tooltip').dispatchEvent(new MouseEvent('mouseleave'));
        expect(component.hideTooltip).toHaveBeenCalled();
    });

    it('should set isTooltipVisible to false after mouseleave', fakeAsync(() => {
        component.tooltip = 'some tooltip';
        fixture.detectChanges();

        fixture.nativeElement.querySelector('.evo-input .evo-input__additional .evo-input__tooltip').dispatchEvent(new MouseEvent('mouseenter'));
        fixture.nativeElement.querySelector('.evo-input .evo-input__additional .evo-input__tooltip').dispatchEvent(new MouseEvent('mouseleave'));
        expect(component.uiStates.isTooltipVisible).toBeTruthy();
        tick(25);
        expect(component.uiStates.isTooltipVisible).toBeFalsy();
    }));

    it('should call onChange when tooltip is passed', () => {
        spyOn(component, 'onChange');
        component.tooltip = 'some tooltip';
        fixture.detectChanges();

        component.ngAfterViewInit();
        expect(component.onChange).not.toHaveBeenCalled();
    });
});
