import $ from "../src/mquery.js"

$('.div').data('my', 1)
$('.div1').data('my', 2)
$('.div2').data('my', null)
$('.div3').data('obj', { a: 1, b: 'bb' })
$('.div3').data('arr', [1,2,3,"a"])
console.log($('.div3').data())