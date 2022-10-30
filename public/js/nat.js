
var t=setInterval(update,1000);

function update()
{
    const secInYear = 31536000;
    const secInMonth = 2592000;
    const secInDays = 86400;
    const secInHour = 3600;
    const secInMinute = 60;



    var date = new Date("2021-02-26");
    var seconds = Math.floor((new Date() - date) / 1000);
    var years = Math.floor(seconds/secInYear);
    seconds = seconds - (years * secInYear);
    var months = Math.floor(seconds/secInMonth);
    seconds = seconds - (months * secInMonth);
    var days = Math.floor(seconds/secInDays);
    seconds = seconds - (days * secInDays);
    var hours = Math.floor(seconds/secInHour);
    seconds = seconds - (hours * secInHour);
    var minutes = Math.floor(seconds/secInMinute);
    seconds = seconds - (minutes * secInMinute);
    document.getElementById("timeX").textContent = years + " year, " + months + " months, " + days + " days, " + hours + " hours,  " + minutes + " minutes & " + seconds + " seconds.";
}