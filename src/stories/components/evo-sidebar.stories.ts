import { storiesOf, moduleMetadata } from '@storybook/angular';
import { EvoSidebarWrapperComponent } from './evo-sidebar-wrapper/evo-sidebar-wrapper.component';
import { EvoUiKitModule, EvoSidebarService } from 'evo-ui-kit';

storiesOf('Components/Sidebar', module)
    .addDecorator(moduleMetadata({
        imports: [
            EvoUiKitModule,
        ],
        providers: [
            EvoSidebarService,
        ],
    }))
    .add('default', () => ({
        component: EvoSidebarWrapperComponent,
        props: {
            id: 'basket',
            header: 'Заголовок сайдбара',
            content: 'Контент сайдбара',
            footer: 'Футер сайдбара',
        },
    }))
    .add('with relativeFooter', () => ({
        component: EvoSidebarWrapperComponent,
        props: {
            id: 'basket',
            header: 'Заголовок сайдбара',
            content: 'Контент сайдбара',
            footer: 'Футер сайдбара',
            relativeFooter: true,
        },
    }));
