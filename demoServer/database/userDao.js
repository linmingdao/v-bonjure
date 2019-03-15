const uuid = require('uuid');

var users = [];
for (let i = 0; i < 300; ++i) {
    users.push({
        'id': uuid.v1(),
        'date': '2016-05-07',
        'name': `王小虎_${i+1}`,
        'province': '上海',
        'city': '普陀区',
        'state': i % 2 === 0,
        'address': '金沙江路 1518 弄',
        'zip': 200333
    });
}

module.exports = {
    total() {
        return this.queryList().length;
    },
    queryList(start, end, username = '', province = '') {
        return users.slice(start, end).filter(item => {
            return (item.name.indexOf(username) !== -1) &&
                (item.province.indexOf(province) !== -1);
        });
    },
    addUser(payload) {
        users.unshift({
            id: uuid.v1(),
            ...payload
        });
    },
    updateById(id, payload = {}) {
        for (let i = 0; i < users.length; ++i) {
            let user = users[i];
            if (user.id === id) {
                users[i] = {
                    ...users[i],
                    ...payload,
                    id
                };
                break;
            }
        }
    },
    deleteById(id = '') {
        users = users.filter(item => item.id !== id);
    },
    deleteByIdList(idList = []) {
        users = users.filter(item => idList.indexOf(item.id) === -1);
    }
};