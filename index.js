var ejs = require('ejs');
var fs = require('fs');
var pdf = require('html-pdf');
 var contents = fs.readFileSync('./views/index.ejs', 'utf8');
var express=require('express')
var app=express();
app.set('view engine', 'ejs');
var appointmentObj={
    "firstName":"sam",
    "lastName":"winchester"
}


app.get('/pdf',function(req,res,next){

   
    var html = ejs.render(contents, appointmentObj);
    
    function createPDFFile (htmlString, fileName, callback) {
        var options = {
            format: 'Letter',
            header: {
                "height": "15mm",
                "contents": "<img alt='Clintek logo' height='100'  width='100' src='http://52.207.115.173:9191/files/5a6597eb7a67600c64ce52cf/?api_key=25BDD8EC59070421FDDE3C571182F6F12F5AAF99FF821A285884E979F3783B23'>"
            },
            "timeout": 600000,
            "footer": {
                "height": "15mm",
                "contents": {
                    first: '<div>  <span>1</span></div>',
                    2: '<div> <span>2</span>  </div>', // Any page number is working. 1-based index
                    3: '<div><span>3</span> </div>',
                    4: '<div>  <span>4</span>     </div>',
                    5: '<div><span>6</span> </div>',
                    6: '<div> <span>7</span>   </div>',
                    default: '<div> <span>Appointment Report</span> </div>', // fallback value
                    last: '<div><span>Last Page</span></div>',
                }
            }
        };
       
        pdf.create(htmlString, options).toFile('./pdf/' + fileName, function (err, data) {
            if (err) return console.log(err);
           
        });
    }

   createPDFFile(html, 'sam.pdf', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('PDF URL ADDED.');
            console.log(result);
        }
    });

})


app.listen(4000);