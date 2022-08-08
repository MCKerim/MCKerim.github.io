function calculateYears(year)
{
    var currentDate = new Date();
    var sinceDate = new Date(year, 0, 0);
    var age = currentDate.getFullYear() - sinceDate.getFullYear();
    document.write("-" + age + " Years");
}

function calculateBirthDay(year, month, day)
{
    var currentDate = new Date();
    var sinceDate = new Date(year, month-1, day);

    var age = currentDate.getFullYear() - sinceDate.getFullYear();
    if(currentDate.getMonth() < sinceDate.getMonth())
    {
        age--;
    }
    else if(currentDate.getMonth() === sinceDate.getMonth() && currentDate.getDate() < sinceDate.getDate())
    {
        age--;
    }

    !(age > 0) ? console.log("ERRORe: cannot calculate age.") : document.write(age);
}