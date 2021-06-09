document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'interaction', 'dayGrid' ],
        defaultDate: '2019-10-06',
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: '$251',
                start: '2019-10-05'
            },
            {
                title: '$261',
                start: '2019-10-06'
            },
            {
                title: '$251',
                start: '2019-10-07'
            },
            {
                title: '$261',
                start: '2019-10-08'
            },
            {
                title: '$251',
                start: '2019-10-09'
            },
            {
                title: '$261',
                start: '2019-10-10'
            },
            {
                title: '$251',
                start: '2019-10-11'
            },
            {
                title: '$261',
                start: '2019-10-12'
            },
            {
                title: '$251',
                start: '2019-10-13'
            },
            {
                title: '$261',
                start: '2019-10-14'
            },
            {
                title: '$251',
                start: '2019-10-15'
            },
            {
                title: '$261',
                start: '2019-10-16'
            },
            {
                title: '$251',
                start: '2019-10-17'
            },
            {
                title: '$261',
                start: '2019-10-18'
            },
            {
                title: '$251',
                start: '2019-10-19'
            },
            {
                title: '$261',
                start: '2019-10-20'
            },
            {
                title: '$251',
                start: '2019-10-21'
            },
            {
                title: '$261',
                start: '2019-10-22'
            },
            {
                title: '$251',
                start: '2019-10-23'
            },
            {
                title: '$261',
                start: '2019-10-24'
            },
            {
                title: '$251',
                start: '2019-10-25'
            },
            {
                title: '$261',
                start: '2019-10-26'
            },
            {
                title: '$251',
                start: '2019-10-27'
            },
            {
                title: '$261',
                start: '2019-10-28'
            },
            {
                title: '$251',
                start: '2019-10-29'
            },
            {
                title: '$261',
                start: '2019-10-30'
            },
            {
                title: '$251',
                start: '2019-10-31'
            },
            {
                title: '$261',
                start: '2019-11-01'
            },
            {
                title: '$251',
                start: '2019-11-02'
            },
            {
                title: '$261',
                start: '2019-11-03'
            }
        ]
    });

    calendar.render();
});
