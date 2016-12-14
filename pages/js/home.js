function testToRowCode(test){
	var res = "";
	res+="<tr><td>" + test.testname + 
		"</td><td>" + test.location + 
		"</td><td>" + test.date +
		"</td><td>Score:" + test.score + "</td></tr>";
	return res;
}

$(document).ready(function(){
	$("#buttontoggle").click(function(){
		$("#insertTest").toggle();
	});

	
	$.ajax({    
	type: "POST",
	url: "/tests/getUserTests",
	data: "",
	dataType: "json",
	success: function(response){
		if(response.tests.length != 0)
		{
			jQuery.each(response, function(i,data) {
				if(!!data)
				{	
					for(var i=0;i<data.length;i++)
					{
						var test = data[i];
				    	$("#tests").append(testToRowCode(test));
					}
				}
			});
		}
		else 
		{
			$("#tests").hide();
		}
	}
	});
});