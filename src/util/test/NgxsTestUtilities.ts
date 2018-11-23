import { Observable } from 'rxjs';

export class NgxsTestUtilities {
    static mockSelectors(selectorFn: any, mockSelectors: MockSelector[]): any {
        const memoizedSelector = selectorFn.NGXS_SELECTOR_META;
        const selector = this.memoizedSelectorToDotNotation(memoizedSelector);
        const mockSelector = mockSelectors.find(s => s.selector === selector);

        if (mockSelector) {
            return mockSelector.useValue;
        }

        fail(`Selector '${selector}' was called but was not found in the list of mock selectors`);
        return;
    }

    static mockDecoratedSelectors(component: any, mockSelectors: MockDecoratedSelector[]) {
        for (let i = 0; i < mockSelectors.length; i++) {
            const selector = mockSelectors[i];
            Object.defineProperty(component, selector.variableName, { writable: true });
            component[selector.variableName] = selector.useValue;
        }
    }

    static memoizedSelectorToDotNotation(memoizedSelector: any): string {
        const stateName = memoizedSelector.containerClass.name;
        const selectorName = memoizedSelector.selectorName;
        return stateName + '.' + selectorName;
    }

}

class MockSelector {
    selector: string;
    useValue: any;
}

class MockDecoratedSelector {
    variableName: string;
    useValue: Observable<any>;
}
