export default {
    data() {
        return {
            descStyle: {}
        };
    },
    mounted() {
        const size = `${this.$refs.formbox.clientHeight}px`;
        this.$set(this, 'descStyle', {
            height: size,
            'line-height': size
        });
    },
    props: {
        desc: String,
        formWidth: Number
    }
};
