// for showing the change in the appearance of a button on clicking it
var btn_all = document.getElementsByClassName("btn");

function clickeffect() 
{
    var button = this;
    button.style.border = "2px inset rgba(255, 255, 255, 0.4)";
    button.style.transform = "scale(0.95)";
    setTimeout(cleareffect, 400, button);
}
  
function cleareffect(button) 
{
    button.style.border = "2px outset rgb(255, 255, 255, 0.3)";
    button.style.transform = "scale(1)";
}

for(var i=0; i<btn_all.length; i++)
    btn_all[i].addEventListener("click", clickeffect);

// for the calculation part
var calc = document.getElementById("calcdisp");
var res = document.getElementById("resdisp");
var hist = document.getElementById("histspace");
var result = "", key_prev, index = 0;
var histdiv = document.getElementById("history");
histdiv.style.display = "none";

function calculation()
{
    var current = this;
    var key = current.innerHTML;
    if(result == "" || key_prev == "=")
        res.innerText = "";
    if(key == "AC")
    {
        result = "";
        calc.innerHTML = "0";
        res.innerHTML = "";
    }
    else if(key == "OFF")
    {
        result = "";
        calc.innerHTML = "";
        res.innerHTML = "";
        histdiv.style.display = "none";
        index = 0;
    }
    else if(parseInt(key)>=0 && parseInt(key)<=9)
    {
        result += key;
        calc.innerHTML = result;
    }
    else if(key == '+' || key == '-' || key == '*' || key == '/' || key == '%')
    {
        if((key_prev == '+')||(key_prev == '-')||(key_prev == '*')||(key_prev == '/')||(key_prev == '%'))
            result = result.slice(0, result.length-1);
        result += key;
        calc.innerHTML = result;
    }
    else if(key == '.')
    {
        if(key_prev == '.')
            result = result.slice(0, result.length-1);
        result += key;
        calc.innerHTML = result;
    }
    else if(key == '(')
    {
        result += key;
        calc.innerHTML = result;
    }
    else if(key == ')')
    {
        result += key;
        calc.innerHTML = result;
    }
    else if(key == '=')
    {
        var answer = "SYNTAX ERROR";
        try
        {
            var answer = eval(result);
            var h = result + " = ";
            result = answer;
            if(answer > 999999999 && answer != 'Infinity')
            {
                var x = answer, coeff = 1, len = 0;
                while(x>1)
                {
                    console.log(x, coeff);
                    coeff *= 10; len++;
                    x = x/10;
                }
                coeff = coeff/10;
                answer = answer/coeff;
                var y = parseFloat(answer).toFixed(5);
                answer = y+"*10^"+len;
            }
            else
            {
                var ans1 = parseFloat(answer);
                var ans2 = parseInt(answer);
                console.log(ans1, ans2);
                if(ans1 == ans2)
                    answer = ans1;
                else
                {
                    answer = ans1.toFixed(5);
                    result = answer;
                }
            }
            h = h + answer;
            console.log(h); 
        }
        catch(error)
        {
            console.error(error);
        }
        res.innerHTML = answer;
        if(index == 0)
        {
            histdiv.style.display = "block";
            hist.innerHTML = "";
        }
        hist.innerHTML += "<br>" + h + "<br>";
        index++;
        if(result == 'Infinity' || result == 'NaN')
            result = "";
    }
    else
    {   
        result = result.slice(0, result.length-1);
        calc.innerHTML = result;
    }
    key_prev = key;
    console.log(result);
    if(result.length > 25)
    {
        result = "";
        res.innerText = "OUT OF SCOPE";
    }
}

for(var i=0; i<btn_all.length; i++)
{
    btn_all[i].addEventListener("click", calculation);
}