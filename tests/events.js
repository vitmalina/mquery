import $ from "../src/mquery.js"

$(function () {
    console.log('ready')

    $('button').on('click', function () {
        $('#log').html($(this).text())
    })

    $('.button1').on('click', () => {
        $('.span1').hide()
    })
    $('.button2').on('click', () => {
        $('.span1').show()
    })

    $('.span1').closest('div').on('click', { delegate: '.span1' }, (event) => {
        console.log('click', event.target, event)
    })
})
