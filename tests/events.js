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
})
