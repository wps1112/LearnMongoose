function loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=1hZ5gqOxBT8B5clwusZqwsO5&callback=init";
    document.body.appendChild(script);
}

function init() {
    var map = new BMap.Map("allmap");            // ����Mapʵ��
    var point = new BMap.Point(116.404, 39.915); // ����������
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom();                 //���ù��ַŴ���С
}
window.onload = loadJScript;  //�첽���ص�ͼ
