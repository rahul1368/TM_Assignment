
 function constructView(){
		arr.map((item)=>{
			let range_slider = '<input style="width:62%" type="range" min="'+item.low+'" max="'+item.high+'" value="'+item.current+'" class="slider" step="0.005" name="myRange">';
			let output = '<output for="myRange" value ='+item.current+'"></output>';
    		let table = "<table class='table'><thead>"+
						    '<tr><th scope="col" style="width:30%">price</th>'+'<th scope="col" style="width:30%">change</th>'+'<th scope="col" style="width:40%">position on 52wk</th>'+
						    "</tr></thead><tbody>"+
    '<tr>'+'<td>'+item.current+'</td>'+'<td>+'+item.absolutechange+" (+"+item.percentagechange+'%)</td>'+'<td>'+range_slider+"<p><span><b>"+item.low+"</b></span><span style='margin-left:48%'><b>"+item.high+'</b></span></p></td>'+
    '</tr></tbody></table>';
    		let li_container = "<li class='list-group-item'>"+"<p>"+item.asiancercticker+"</p>"+table+item.companyShortName+"</li>";
    		$("#company_lists_container").append(li_container);
    	});
	}

  	function SortBy(a, b){
  		var aN = parseFloat(a.current);
  		var bN = parseFloat(b.current); 
  		return ((aN < bN) ? -1 : ((aN > bN) ? 1 : 0));
	}  	


var arr = [],apiResponse=[];
  var appliedFilter = -1;
  $.get("http://json.bselivefeeds.indiatimes.com/ET_Community/Gain?pagesize=100", function(data, status){
      console.log(data.searchresult);
      arr = data.searchresult;
      apiResponse = data.searchresult;
      constructView();
    });

  function companySearch(){
      document.getElementById('company_lists_container').innerHTML="";
      let q = $("#cmpName").val();
      if(q!==""){
        q = q.toLowerCase();
        arr = arr.filter((item)=>{
          return item.companyShortName.toLowerCase().indexOf(q)!==-1;
        });
        constructView();    
      }
      else{
        arr = apiResponse;
        constructView();
      }

    }

    function sortFilter(){
      document.getElementById('company_lists_container').innerHTML="";
      let current = $("#bestBuyPrice").val();
      appliedFilter = parseFloat(current);
      arr = arr.filter(item => parseFloat(item.current) >= parseFloat(current)).sort(SortBy);
      constructView();
      
    }

    function sortByPrice(order){
    document.getElementById('company_lists_container').innerHTML="";
      if(appliedFilter===-1)
        arr = arr.map((item)=> item).sort(SortBy);
      else
        arr = arr.map((item)=>item).filter( item => parseFloat(item.current) >= parseFloat(appliedFilter)).sort(SortBy);

      if(order==="desc") arr = arr.reverse();
      constructView();
    }

  	