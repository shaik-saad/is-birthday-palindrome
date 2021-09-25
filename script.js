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

    var formatsAndDatesArray = [{
        format: "ddmmyyyy",
        formattedDate: ddmmyyyy
    },
    {
        format: "mmddyyyy",
        formattedDate: mmddyyyy
    },
    {
        format: "yyyymmdd",
        formattedDate: yyyymmdd
    },{
        format: "ddmmyy",
        formattedDate: ddmmyy
    },
    {
        format: "mmddyy",
        formattedDate: mmddyy
    },
    {
        format: "yymmdd",
        formattedDate: yymmdd
    }]

    return formatsAndDatesArray
}

function checkPalindromeForAllDateFormats(date){
    var dateAllFormatsArray = getAllDateFormats(date)

    var foundPalindrome = false
    var dateFormat
    for(var i = 0; i < dateAllFormatsArray.length; i++){
        if(isPalindrome(dateAllFormatsArray[i].formattedDate)){
            foundPalindrome = true
            dateFormat = dateAllFormatsArray[i].format
            break
        }
    }

    return {
        foundPalindrome: foundPalindrome,
        dateFormat: dateFormat
    }
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

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

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
    var counter = 0

    while(1){
        counter++
        var dateStr = dateAsString(nextDate)
        var resultList = checkPalindromeForAllDateFormats(dateStr)


        if(resultList.foundPalindrome){
            console.log(resultList.dateFormat)
            return [counter, nextDate, resultList.dateFormat]
        }

        nextDate = getNextDate(nextDate)
    }
}

function getPreviousDate(date){
    var day = date.day - 1
    var month = date.month 
    var year = date.year

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if( day === 0){
        month = month - 1
        if( month === 0){
            year = year - 1
            month = 12
            day = daysInMonth[month - 1]
        } else if(month === 2){
            if(isLeapYear(year)){
                day = 29
            }else{
                day = 28
            }
        } else{
            day = daysInMonth[month - 1]
        }
    }
    
    return {
        day: day,
        month: month,
        year: year
    }

}

function getPreviousPalindromeDate(date){

    var previousDate = getPreviousDate(date)
    var counter = 0

    while(1){
        counter++
        var dateStr = dateAsString(previousDate)
        var resultList = checkPalindromeForAllDateFormats(dateStr)

        if(resultList.foundPalindrome){
            return [counter, previousDate, resultList.dateFormat]
        }
        previousDate = getPreviousDate(previousDate)
    }
}

// var date = {
//     day: 2,
//     month: 10,
//     year: 2001
// }

// console.log(getPreviousPalindromeDate(date))

const birthDayInput = document.querySelector("#birth-day-input")
const checkBtn = document.querySelector("#check-btn")
const output = document.querySelector("#output")
const errorMessage = document.querySelector("#error-message")

function checkClickHandler(){
    errorMessage.innerText = ""
    output.innerText = ""

    //input
    var birthday = birthDayInput.value
    if(birthday === ""){
       return errorMessage.innerText = "Please select your birth date."
    }

    //processing
    var date = birthday.split("-")
    var yyyy = date[0]
    var mm = date[1]
    var dd = date[2]

    var date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy)
    }

    var dateStr = dateAsString(date)
    var resultList = checkPalindromeForAllDateFormats(dateStr)

    if(!resultList.foundPalindrome){
        const [nextCounter, nextDate, formatOfNextDate] = getNextPalindromeDate(date)
        const [previousCounter, previousDate, formatOfPreviousDate] = getPreviousPalindromeDate(date)
        
        // output
        if(nextCounter > previousCounter){
            output.innerText = `Oops! Your Birthday is not a palindrome. The nearest palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year} in this ${formatOfPreviousDate} format, you missed by ${previousCounter} days 😏`
        } else{
            output.innerText = `Oops! Your Birthday is not a palindrome. The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} in this ${formatOfNextDate} format, you missed by ${nextCounter} days 😏`
        }
        
    } else{
        output.innerText = `Yay! Your birthday in ${resultList.dateFormat} format, is a palindrome ❤️🥳`
    }

}
checkBtn.addEventListener("click", checkClickHandler)