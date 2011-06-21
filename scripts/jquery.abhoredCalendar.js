/// <reference path="jquery-1.4.1-vsdoc.js" />

(function ($) {
    $.fn.abhoredCalendar = function (options) {
        var today = new Date();

        var defaults = {
            calDate: today,
            isThemed: true,
            addButtonClicked: doAdd,
            monthChanged: doMonthChange
        };

        var options = $.extend(defaults, options);

        //wire up the button event handler
        $('.acAdd').live('click', options.addButtonClicked);

        return this.each(function () {
            var $this = $(this);
            buildCalendarHeader(options, $this);
            $this.append("<div id='calHolder'></div>");
            buildMonthCalendar(options, $this);
        });
    };

    function buildCalendarHeader(options, $this) {
        //The calendar header was inspired by and based off of a nettuts+ premium tutorial.
        //nettuts+ rocks
        //http://net.tutsplus.com/tutorials/html-css-techniques/how-to-build-a-beautiful-calendar-widget-new-premium-tutorial/
        var calHeader = '<div class="acHeader"><span class="left button" id="prev">< </span><span class="left hook"></span><span class="month-year" id="acMonthLabel"></span><span class="right hook" id=""></span><span class="right button" id="next">> </span></div>';
        $this.append(calHeader);

        var selectedMonth = options.calDate.getMonth();
        var selectedYear = options.calDate.getFullYear();

        $('#prev', $this).click(function () {
            if (selectedMonth === 0) {
                selectedMonth = 11;
                selectedYear--;
            }
            else {
                selectedMonth--;
            }

            options.calDate.setMonth(selectedMonth);
            options.calDate.setFullYear(selectedYear);
            options.monthChanged.call(this, new Date(options.calDate.getFullYear(), options.calDate.getMonth(), 1));
            buildMonthCalendar(options, $this);
        });

        $('#next', $this).click(function () {
            if (selectedMonth === 11) {
                selectedMonth = 0;
                selectedYear++;
            }
            else {
                selectedMonth++;
            }

            options.calDate.setMonth(selectedMonth);
            options.calDate.setFullYear(selectedYear);
            options.monthChanged.call(this, new Date(options.calDate.getFullYear(), options.calDate.getMonth(), 1));
            buildMonthCalendar(options, $this);
        });
        
    }

    function buildMonthCalendar(options, $this) {
        //broke down single variable into multiple for concatenations 
        //purposes. Source: http://www.softwaresecretweapons.com/jspwiki/javascriptstringconcatenation
        var currentMonth = new Date(options.calDate.getFullYear(), options.calDate.getMonth(), 1);
        var firstOfTheMonth = currentMonth.getDay();
        var numOfDaysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        var currentRow = 0, currentCol = 1;
        var dateIncr = 1;
        var currentDate;
        var firstTime = new Boolean(true);
        var tableHtml = "<table><tr class='acDays'><td>sun</td><td>mon</td><td>tue</td><td>wed</td><td>thu</td><td>fri</td><td>sat</td></tr><tr>";
        var emptyTDs = '';
        var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

        $('#acMonthLabel', $this).empty().html(months[currentMonth.getMonth()] + ' ' + currentMonth.getFullYear());
        $('#calHolder', $this).empty();

        for (var i = 0; i < firstOfTheMonth; i++) {
            emptyTDs += "<td></td>";
        }

        tableHtml += emptyTDs;

        for (var i = firstOfTheMonth; i < numOfDaysInMonth + firstOfTheMonth; i++) {
            var tdsWithDates = '';

            currentDate = new Date(options.calDate.getFullYear(), options.calDate.getMonth(), dateIncr);
            currentCol = i % 7;
            if (currentCol == 0 && !firstTime) {
                currentRow++;
                tdsWithDates += "</tr>";
            }

            if (firstTime) {
                firstTime = false;
            }

            var buttonID = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
            tdsWithDates += "<td><div>" + dateIncr + "</div><div>0</div><div><button id='" + buttonID + "' class='acAdd'>+</button></div></td>";
            tableHtml += tdsWithDates;
            dateIncr++;
        }

        tableHtml += "</table>";
        $('#calHolder',$this).empty().html(tableHtml);
    }

    function doAdd() {
        alert('Hey, you clicked on ' + $(this).attr("id") + ' !!!');
    }

    function doMonthChange(something) {
        
    }
})(jQuery);


