export default {
    data() {
        return {
            selectValue1: '',
            remote: {
                url() {
                    return '/users';
                },
                headers() {
                    return {
                        token: 'ssssssss'
                    };
                },
                queryParams() {
                    return {
                        pageSize: 10,
                        pageNumber: 1
                    };
                }
            },
            filterParams({ filterText }) {
                return {
                    username: filterText
                };
            },
            dataSourceFormatter(response) {
                return response.data.userList;
            },
            textExtractor(data) {
                return data['name'];
            },
            valueExtractor(data) {
                return data['name'];
            },
            // 按钮色号
            availableButtonColors: [
                {
                    value: '#4D9FF0',
                    label: 'buttonBlue'
                },
                {
                    value: '#5796d4',
                    label: 'buttonDustyBlue'
                },
                {
                    value: '#2CBFBE',
                    label: 'buttonGreen'
                },
                {
                    value: '#28ACAB',
                    label: 'buttonDustyGreen'
                },
                {
                    value: '#E7EAED',
                    label: 'buttonGray'
                },
                {
                    value: '#D0D3D6',
                    label: 'buttonDustyGray'
                },
                {
                    value: '#f56c6c',
                    label: 'buttonRed'
                },
                {
                    value: '#DC6161',
                    label: 'buttonDustyRed'
                },
                {
                    value: '#FF9D02',
                    label: 'buttonYellow'
                },
                {
                    value: '#E68E02',
                    label: 'buttonDustyYellow'
                }
            ],
            // 按钮色号
            availableLabelColors: [
                {
                    value: '#88B7E2',
                    label: 'labelBlue'
                },
                {
                    value: '#EA9CBD',
                    label: 'labelPink'
                },
                {
                    value: '#79D3E0',
                    label: 'labelGreen'
                },
                {
                    value: '#8E94F9',
                    label: 'labelPurple'
                },
                {
                    value: '#FFBA57',
                    label: 'labelYellow'
                }
            ],
            // 图表可用色号
            availableDiagramColors: [
                {
                    value: '#FE6BBE',
                    label: 'diagramPink_1'
                },
                {
                    value: '#FE67BD',
                    label: 'diagramPink_2'
                },
                {
                    value: '#66C4EE',
                    label: 'diagramBlue_1'
                },
                {
                    value: '#6A9CE8',
                    label: 'diagramBlue_2'
                },
                {
                    value: '#0CEDE0',
                    label: 'diagramGreen_1'
                },
                {
                    value: '#1EEEE4',
                    label: 'diagramGreen_2'
                },
                {
                    value: '#00F6F5',
                    label: 'diagramGreen_3'
                },
                {
                    value: '#FCDD8F',
                    label: 'diagramYellow_1'
                },
                {
                    value: '#FBD03F',
                    label: 'diagramYellow_2'
                },
                {
                    value: '#CA85FE',
                    label: 'diagramPurple_1'
                },
                {
                    value: '#CA87FE',
                    label: 'diagramPurple_2'
                }
            ]
        };
    }
};
