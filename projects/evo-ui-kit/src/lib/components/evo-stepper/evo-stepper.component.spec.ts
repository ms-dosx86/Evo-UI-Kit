import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator';
import { async } from '@angular/core/testing';
import { EvoStepperComponent, EvoStepperItemComponent } from './index';
import { Component, ViewChild } from '@angular/core';
import { EvoUiClassDirective } from '../../directives/';

@Component({ selector: 'evo-host-component', template: `` })
class TestHostComponent {
    currentStepIndex = 0;
    clickableItems = false;
    @ViewChild(EvoStepperComponent)
    stepperComponent: EvoStepperComponent;
    handleClick(index: number): void {
        this.currentStepIndex = index;
    }
}

describe('EvoStepperComponent', () => {
    let host: SpectatorWithHost<EvoStepperComponent, TestHostComponent>;
    let hostComponent: TestHostComponent;

    const createHost = createHostComponentFactory({
        component: EvoStepperComponent,
        declarations: [
            EvoUiClassDirective,
            EvoStepperItemComponent,
        ],
        host: TestHostComponent,
    });

    beforeEach(async(() => {
        host = createHost(`
        <evo-stepper
            [currentStepIndex]="currentStepIndex"
            [clickableItems]="clickableItems"
            (clickItem)="handleClick($event)">
        <evo-stepper-item class="step-1" label="Step-1">
            <p class="step-content">Step content 1<p>
            <button class="btn-next" (click)="currentStepIndex = 1">Next</button>
        </evo-stepper-item>
        <evo-stepper-item label="Step-2">
            <p class="step-content">Step content 2<p>
        </evo-stepper-item>
        <evo-stepper-item label="Step-3">
            <p class="step-content">Step content 3<p>
        </evo-stepper-item>
        </evo-stepper>`);
        hostComponent = host.hostComponent;
    }));

    it('should have current step with index = 0, after construction', () => {
        host.detectChanges();
        expect(host.hostComponent.stepperComponent.currentStepIndex).toEqual(0);
        expect(host.query('.step-content').textContent).toEqual('Step content 1');
    });

    it('should have current step with index = 1, after click', () => {
        host.detectChanges();
        host.click('.btn-next');
        expect(hostComponent.stepperComponent.currentStepIndex).toEqual(1);
        expect(host.query('.step-content').textContent).toEqual('Step content 2');
    });

    it('should have indicator with step number = 3, after input change', () => {
        hostComponent.currentStepIndex = 2;
        host.detectChanges();
        expect(host.query('.evo-stepper__item_active .evo-stepper__item-number').textContent).toEqual('3');
        expect(host.query('.step-content').textContent).toEqual('Step content 3');
    });

    it('should emit step index on click if items clickable', () => {
        hostComponent.currentStepIndex = 2;
        hostComponent.clickableItems = true;
        host.detectChanges();
        host.click('.evo-stepper__item:nth-child(1) .evo-stepper__item-inner');
        host.detectChanges();
        expect(hostComponent.stepperComponent.currentStepIndex).toEqual(0);
        expect(host.query('.step-content').textContent).toEqual('Step content 1');
    });

});

