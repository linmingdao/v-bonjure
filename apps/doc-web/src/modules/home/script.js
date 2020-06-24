import { goto } from '@core/router';
// icons
import core from '@app/assets/icons/core.png';
import widget from '@app/assets/icons/widget.png';
import summary from '@app/assets/icons/summary.png';

export default {
    data() {
        return {
            cards: [
                {
                    icon: core,
                    title: '前端工程化',
                    color: '#cdf9ff',
                    description: '基于Vue，以webpack 4.x为构建流，并且支持多项目并行开发的前端工程化方案。',
                    module: 'core'
                },
                {
                    icon: widget,
                    title: '基础组件',
                    color: '#fff1cd',
                    description: '基于框架开发生成的一些高可复用、易拓展的通用组件集合。',
                    module: 'widget'
                },
                {
                    icon: summary,
                    title: '项目总结',
                    color: '#ffcaca',
                    description:
                        '记录项目开发过程中的心得体会，比如一些疑难杂症的最终解决办法，避免其他开发人员重复踩坑...',
                    module: 'summary'
                }
            ]
        };
    },
    methods: {
        jumpTo(module) {
            if (module === 'core') {
                // window.open('http://23.91.98.88/linq/v-base-core', '“_blank”');
                goto(`/${module}`);
            } else {
                goto(`/${module}`);
            }
        }
    }
};
