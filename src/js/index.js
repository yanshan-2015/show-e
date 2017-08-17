import './page'
import '../less/index.less'
console.log(dd.version)

let matrix = [350, 200, 210, 50];
let chart = dd.select('#chart');
chart.on('click',function () {
    alert('hahha,dd可以点击了')
});

chart.text('i like huafei');
chart.style('color', 'red');

let allLi = dd.select('ul').selectAll('li')
allLi.data(matrix).enter().append('li')
    .style('width',function (d) {
        return d + 'px';
    })
    .text(function (d, i) {
        return d
    });
let ul = dd.select('ul');
ul.append('li').text('100%')
ul.insert('li',ul.lastChild).text('375')
console.log()
//ul.remove()