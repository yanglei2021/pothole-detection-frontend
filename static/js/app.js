$(function () {
    $('#submit').click(function () {
        event.preventDefault();
        var imgData = $('#file').val();
        console.log("type");
        console.log(typeof imgData);
        var reader = new FileReader();
        if(imgData){
            reader.readAsDataURL(imgData);
        }
        base64Img = reader.result;
        console.log("base64Img");
        console.log(base64Img);
        var data = {img: imgData};
        // var form_data = new FormData($('#upload-form')[0]);
        // console.log($('#upload-form')[0])
        // var reader = new FileReader();
        // reader.readAsBinaryString(form_data);
        // var fileEncoded = reader.result
        // console.log(typeof form_data)
        $.ajax({
            type: 'POST',
            // url: '/upload_file',
            url: 'https://pa6gu25ecf.execute-api.ap-southeast-2.amazonaws.com/prod',
            // headers: {"Access-Control-Allow-Origin": "*",},  
            data: JSON.stringify(data),
            crossDomain: true, 
            // headers: { "Content-Type": "application/json" },
            // data: JSON.stringify({
            //     data: fileEncoded
            // }),
            // contentType: false,
            // processData: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",

        }).done(function (data, textStatus, jqXHR) {
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
            if(data.status == 'Fail-Img'){
                $("#ahh").text("TestHahaha Please select a valid image to upload first.");
                $("#ahh").removeAttr("hidden");
            }
            else if(data.status == 'Fail-Endpoint'){
                $("#ahh").text("Unable to reach ML Endpoint. Please try again later.");
                $("#ahh").removeAttr("hidden");
            }
            else{
                console.log('Success!');
                $("#title").attr("hidden", true);
                $("#ahh").attr("hidden", true);
                $('#result').text(data.name);
                if(data.name === "Pothole Detected"){
                    $('#result').css({"color" : '#008000'});
                }
                else{
                    $('#result').css({"color" : '#e63946'});
                }
                $('#confidence').text("Confidence: " + data.confidence);
                $("#picture").attr("src", "data:image/png;base64," + data.img);
                $("#picture").removeAttr("hidden");
                $("#upload-title").text("Upload Another?");
            }
            
            // $("#resultFilename").text(data['name']);
            // $("#resultFilesize").text(data['size']);
        }).fail(function (data) {
            $("#ahh").removeAttr("hidden");
            $("#picture").attr("hidden", true);
            $('#result').attr("Unable to upload")
            // alert("Error: Select an image to upload");
        });
    });
});