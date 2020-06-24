import Vue from 'vue';
import './style.css';
import template from './template.html';

export default Vue.extend({
    data() {
        return {
            visible: false,
            placeStyle: {}
        };
    },
    computed: {
        styleObj: function() {
            return {
                ...this.placeStyle
            };
        }
    },
    methods: {
        injectContext(context) {
            this.$context = context;
            this.$electricSelect = this.$context.$refs.electricSelect;
            return this;
        },
        handleClickMask() {
            this.visible = false;
        },
        hide() {
            this.visible = false;
        },
        show() {
            this.place();
            this.visible = true;
        },
        place() {
            const $electricSelect = this.$electricSelect;
            const { clientHeight, clientWidth } = $electricSelect;
            const boundingClientRect = $electricSelect.getBoundingClientRect();
            const { distanceTop, distanceBottom } = this.getVisibleDistanceInfo();
            if (distanceTop > distanceBottom) {
                this.placeStyle = {
                    bottom: `${document.documentElement.clientHeight - boundingClientRect.top + 5}px`,
                    left: `${boundingClientRect.left + clientWidth - 25}px`
                };
            } else {
                this.placeStyle = {
                    top: `${boundingClientRect.top + clientHeight + 5}px`,
                    left: `${boundingClientRect.left + clientWidth - 25}px`
                };
            }
        },
        getVisibleDistanceInfo() {
            const $electricSelect = this.$electricSelect;
            const boundingClientRect = $electricSelect.getBoundingClientRect();
            const distanceTop = boundingClientRect.top;
            const distanceBottom = document.documentElement.clientHeight - boundingClientRect.bottom;
            return { distanceTop, distanceBottom };
        }
    },
    template
});
