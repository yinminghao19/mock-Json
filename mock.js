var getList = [];
var postList = [];
exports.jsonMock = function(port){
    const jsonServer = require('json-server')
    const server = jsonServer.create();
    const middlewares = jsonServer.defaults();

    server.use(middlewares);

    getList.forEach((getObj)=>{
        server.get(getObj.url, (req, res) => {
            res.jsonp(getObj.data);
        });
    });

    server.use(jsonServer.bodyParser)
    server.use((req, res, next) => {
        if (postList.length > 0) {
            postList.forEach((postObj)=>{
                if (postObj.url === req.url) {
                    res.jsonp(postObj.data);
                }
            });
        }
        next();
    });

    server.listen(port, () => {
        console.log('模拟后台服务已启动，端口为：' + port);
    });
}

exports.get = function(url, data){
    getList.push({url: url, data: data});
}

exports.post = function(url, data){
    postList.push({url: url, data: data});
}