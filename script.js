function reverseString(str){
    var stringList = str.split("")
    var reversedList = stringList.reverse()
    var reversedString = reversedList.join("")
    return reversedString
}

function isPalindrome(str){
    var reversedString = reverseString(str)

    return str === reversedString
}

function dateAsString(date){
    var dateInStringObject = {day: "",
    month: "",
    year: ""}

    if(date.day < 10){
        dateInStringObject.day = "0" + date.day
    } else {
        dateInStringObject.day = date.day.toString()
    }
    
    if(date.month < 10){
        dateInStringObject.month = "0" + date.month
    } else {
        dateInStringObject.month = date.month.toString()
    }

    dateInStringObject.year = date.year.toString()

    return dateInStringObject
}

function getAllDateFormats(date){

    var ddmmyyyy = date.day + date.month + date.year
    var mmddyyyy = date.month + date.day + date.year
    var yyyymmdd = date.year + date.month + date.day
    var ddmmyy = date.day + date.month + date.year.slice(-2)
    var mmddyy = date.month + date.day + date.year.slice(-2)
    var yymmdd = date.year.slice(-2) + date.month + date.day

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindromeForAllDateFormats(date){
    var dateAllFormatsArray = getAllDateFormats(date)

    var foundPalindrome = false
    for(var i = 0; i < dateAllFormatsArray.length; i++){
        if(isPalindrome(dateAllFormatsArray[i])){
            foundPalindrome = true
            break
        }
    }

    return foundPalindrome
}

function isLeapYear(year){

    if(year%400 === 0){
        return true
    }
    if(year%100 === 0){
        return false
    }
    if(year%4 === 0){
        return true
    }
    return false
}

function getNextDate(date){
    var day = date.day +1
    var month = date.month
    var year = date.year

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30]

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1
                month = 3
            }
        }
        else{
            if( day > 28){
                day = 1
                month = 3
            }
        }
    }
    else {
        if(day > daysInMonth[month - 1]){
            day = 1 
            month = month + 1
        }
    }

    if(month > 12){
        month = 1
        year = year + 1
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date){

    var nextDate = getNextDate(date)
    console.log(nextDate)
    var counter = 0

    while(1){
        counter++
        var dateStr = dateAsString(nextDate)
        console.log(dateStr)
        var resultList = checkPalindromeForAllDateFormats(dateStr)
        console.log(resultList)

        if(resultList){
            return [counter, nextDate]
        }

        nextDate = getNextDate(nextDate)
    }
}

var date = {
    day: 5,
    month: 1,
    year: 2020
}


console.log(getNextPalindromeDate(date))
