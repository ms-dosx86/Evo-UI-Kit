import { storiesOf } from '@storybook/angular';
import '!style-loader!css-loader!sass-loader!evo-ui-kit/styles/main.scss';

storiesOf('Components/EvoLink', module)
    .add('default', () => ({
        template: `
        <a class="evo-link" href='#'>Нажми меня</a>
        `,
    }))
    .add('dashed', () => ({
        template: `
        <a class="evo-link evo-link_dashed" href='#'>Нажми меня</a>
        `,
    }));
