function loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=1hZ5gqOxBT8B5clwusZqwsO5&callback=init";
    document.body.appendChild(script);
}

function init() {
    var map = new BMap.Map("allmap");            // 创建Map实例
    var point = new BMap.Point(116.404, 39.915); // 创建点坐标
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom();                 //启用滚轮放大缩小
}
window.onload = loadJScript;  //异步加载地图
