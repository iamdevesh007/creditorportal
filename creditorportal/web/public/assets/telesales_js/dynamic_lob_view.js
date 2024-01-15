function ajaxindicatorstart(text) {
	text =
	  typeof text !== "undefined"
		? text
		: "We are quickly gathering your information to get you started";
  
	var res = "";
  
	if ($("body").find("#resultLoading").attr("id") != "resultLoading") {
	  res += "<div id='resultLoading' style='display: none'>";
	  res += "<div id='resultcontent'>";
	  res += "<div id='ajaxloader' class='txt'>";
	  res +=
		'<svg class="lds-curve-bars" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="translate(50,50)"><circle cx="0" cy="0" r="8.333333333333334" fill="none" stroke="#861F41" stroke-width="4" stroke-dasharray="26.179938779914945 26.179938779914945" transform="rotate(2.72337)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="0" repeatCount="indefinite"></animateTransform></circle><circle cx="0" cy="0" r="16.666666666666668" fill="none" stroke="#861F41" stroke-width="4" stroke-dasharray="52.35987755982989 52.35987755982989" transform="rotate(64.7343)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.2" repeatCount="indefinite"></animateTransform></circle><circle cx="0" cy="0" r="25" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="78.53981633974483 78.53981633974483" transform="rotate(150.07)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.4" repeatCount="indefinite"></animateTransform></circle><circle cx="0" cy="0" r="33.333333333333336" fill="none" stroke="#861F41" stroke-width="4" stroke-dasharray="104.71975511965978 104.71975511965978" transform="rotate(239.433)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.6" repeatCount="indefinite"></animateTransform></circle><circle cx="0" cy="0" r="41.666666666666664" fill="none" stroke="#861F41" stroke-width="4" stroke-dasharray="130.89969389957471 130.89969389957471" transform="rotate(320.34)"><animateTransform attributeName="transform" type="rotate" values="0 0 0;360 0 0" times="0;1" dur="1s" calcMode="spline" keySplines="0.2 0 0.8 1" begin="-0.8" repeatCount="indefinite"></animateTransform></circle></g></svg>';
	  res += "<br/>";
	  res += "<span id='loadingMsg'></span>";
	  res += "</div>";
	  res += "</div>";
	  res += "</div>";
  
	  $("body").append(res);
	}
  
	$("#loadingMsg").html(text);
  
	$("#resultLoading").find("#resultcontent > #ajaxloader").css({
	  position: "absolute",
	  width: "500px",
	  height: "75px",
	});
  
	$("#resultLoading").css({
	  width: "100%",
	  height: "100%",
	  position: "fixed",
	  "z-index": "10000000",
	  top: "0",
	  left: "0",
	  right: "0",
	  bottom: "0",
	  margin: "auto",
	});
  
	$("#resultLoading").find("#resultcontent").css({
	  background: "#ffffff",
	  opacity: "0.7",
	  width: "100%",
	  height: "100%",
	  "text-align": "center",
	  "vertical-align": "middle",
	  position: "fixed",
	  top: "0",
	  left: "0",
	  right: "0",
	  bottom: "0",
	  margin: "auto",
	  "font-size": "16px",
	  "z-index": "10",
	  color: "#000000",
	});
  
	$("#resultLoading").find(".txt").css({
	  position: "absolute",
	  top: "-25%",
	  bottom: "0",
	  left: "0",
	  right: "0",
	  margin: "auto",
	});
  
	$("#resultLoading").fadeIn(300);
  
	$("body").css("cursor", "wait");
  }
  
  function ajaxindicatorstop() {
	$("#resultLoading").fadeOut(300);
  
	$("body").css("cursor", "default");
  }

  $(document).ready(function () {
	load_data();
	

	  $(".search_field").on("keyup change", function () {
		// alert('test');
		$("#employee_table").DataTable().destroy();
		$(this).attr("disabled", false);
		load_data();
	  });
	  
  });

  function get_current_dt() {
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	var hr = currentDate.getHours();
	var min = currentDate.getMinutes();
	var sec = currentDate.getSeconds();
	return day + "-" + month + "-" + year + " " + hr + "-" + min + "-" + sec;
  }


  function load_data(){
	var dataTable = $("#employee_table").DataTable({
		// "dom": '<f<t><"#df"<"pull-left" i><"pull-right"p><"pull-right"l>>>',
		paging: true,
		"ordering": false,
		lengthChange: true,
		lengthMenu: [
		  [10, 25, 100, -1],
		  [10, 25, 100, "All"],
		],
		pageLength: 10,
		processing: true,
		bServerSide: true,
		responsive: true,
		searching: true,
		columnDefs: [
		  {
			data: null,
			// "defaultContent": "default content",
			// "targets": ['_all']
		  },
		],
		dom: "lBfrtip",
	
		buttons: [
			/*
		  {
			extend: "excelHtml5",
			exportOptions: {
			  columns: [0, 1],
			},
			text: 'Export <i class="ti-export"></i>',
			title: get_current_dt(),
			init: function (dt, node, config) {
			},
		  },
		  */

		],
	
		order: [],
		ajax: {
		  url: "/dynamic_lob_load",
		  type: "POST",
		  data: {
			// product: $("#searchp").val(),
			// policy: $("#searchpp").val(),
			// epolicy: $("#searchep").val(),
			// occcenter: $("#occcenter").val(),
			lmdf: $("#lmdf").val(),
			lmdt: $("#lmdt").val(),
			// current_status: $("#current_status").val(),
		  },
		  complete: function (response) {
			// console.log(response);
		  },
		},
	  });
  }

  $(function () {
	var dateFormat = "yy-mm-dd",
	  from = $("#lmdf")
		.datepicker({
		  // defaultDate: "+1w",
		  dateFormat: "yy-mm-dd",
		  changeMonth: true,
		  changeYear: true,
		})
		.on("change", function () {
		  to.datepicker("option", "minDate", getDate(this));
		}),
	  to = $("#lmdt")
		.datepicker({
		  // defaultDate: "+1w",
		  dateFormat: "yy-mm-dd",
		  changeMonth: true,
		  changeYear: true,
		})
		.on("change", function () {
		  from.datepicker("option", "maxDate", getDate(this));
		});
  
	function getDate(element) {
	  var date;
	  try {
		date = $.datepicker.parseDate(dateFormat, element.value);
	  } catch (error) {
		date = null;
	  }
  
	  return date;
	}
  });

 


	function editLob(id,name){
				$("#myModalEdit").modal('show');
				$("#lob_name").val(name);
				$("#axis_lob_old_name").val(name);
				$("#ap_edit").val(id);
	}

	$('body').on('click', '.ed_status', function() {
			var id = $(this).attr("data-id");
			var journey_type = $(this).attr("data-type");
			var data_status = $(this).attr("data-status");

			changeStatus(id,journey_type,data_status);
	});

	function changeStatus(id,journey_type,data_status){
		swal({
			title: "Are you sure?",
			text: "You want to change status of this LOB?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			confirmButtonText: 'Yes',
			cancelButtonText: "No",
			closeOnConfirm: false,
			closeOnCancel: false
		 },
		 function(isConfirm){
		
		   if (isConfirm){

			ajaxindicatorstart('Please wait...');
			setTimeout(function () {
			   $.ajax({
						  url: "change_status_dynamic_lob",
						  type: "POST",
						  data: {
						  "id":id,
						  "journey_type":journey_type,
						  "data_status":data_status,
						  },
						  async: true,
						//   dataType: "json",
						  success: function (response) 
						  {	
							  ajaxindicatorstop();
							  swal(
								{
								  title: "Updated!",
								  text:'Status is Updated!',
								  type: "success",
								  showCancelButton: false,
								  confirmButtonText: "Ok!",
								  closeOnConfirm: true,
								},
								function () {
								  setTimeout(function(){
									window.location.reload();
								  });
								}
							  );
						  }
					  });
				  }, 1000);

			// swal("Shortlisted!", "Candidates are successfully shortlisted!", "success");
		
			} else {
			  swal("Cancelled", "Status did not change.", "error");
				 e.preventDefault();
			}
		 });
	}

	$(function(){
		$('.lob_name').keyup(function(){
		  var input_val = $(this).val();
		  var inputRGEX = /^[a-zA-Z0-9]*$/;
		  var inputResult = inputRGEX.test(input_val);
			if(!(inputResult))
			{     
			  this.value = this.value.replace(/[^a-z0-9\s]/gi, '');
			}
		 });
	  });

	$.validator.addMethod(
		"valid_mobile",
		function (value, element, param) {
		  var re = new RegExp("^[4-9][0-9]{9}$");
		  return this.optional(element) || re.test(value);
		},
		"Enter a valid 10 digit mobile number."
	  );


	  jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z]+$/i.test(value);
	  }, "Please enter only alphabets."); 

	  jQuery.validator.addMethod("alphanumeric", function(value, element) {
		return this.optional(element) || /^\w+$/i.test(value);
	}, "Special characters are not allowed");

	$("#submit_edit_data").validate({
		ignore: ".ignore",
		focusInvalid: true,
		rules: {
			lob_name: {
			required: true,
			// alphanumeric:true
		  },
		 
		},
	
		invalidHandler: function (form, validator) {
		  validator.focusInvalid();
		},
		submitHandler: function (form) {

				ajaxindicatorstart('Please wait...');
				setTimeout(function () {
				   $.ajax({
							  url: "/submit_edit_dynamic_lob",
							  type: "POST",
							  data: {
								lob_name : $("#lob_name").val().trim(),
								axis_lob_old_name : $("#axis_lob_old_name").val().trim(),
								ap_edit: $("#ap_edit").val().trim(),
							  },
							  async: true,
							  dataType: "json",
							  success: function (response) 
							  {	
								  ajaxindicatorstop();

								  if(response.status == 'success'){
									swal(
										{
										  title: "Updated!",
										  text:'LOB updated!',
										  type: "success",
										  showCancelButton: false,
										  confirmButtonText: "Ok!",
										  closeOnConfirm: true,
										},
										function () {
										  setTimeout(function(){
											window.location.reload();
										  });
										}
									  );
								}else if(response.status == 'duplicate'){
									swal(
										{
										  title: "Alert!",
										  text:'New LOB can not have the same name as Old LOB',
										  type: "warning",
										  showCancelButton: false,
										  confirmButtonText: "Ok!",
										  closeOnConfirm: true,
										},
										function () {
										 
										}
									  );
								}else{

									swal(
										{
										  title: "Alert!",
										  text:'Something went wrong! please try again.',
										  type: "warning",
										  showCancelButton: false,
										  confirmButtonText: "Ok!",
										  closeOnConfirm: true,
										},
										function () {
										 
										}
									  );

								}



							  }
						  });
					  }, 1000);


		},
	  });



	  $("#importData").validate({
		ignore: ".ignore",
		focusInvalid: true,
		rules: {
			lob_name: {
			required: true,
			// alphanumeric:true
		  },
		 
		},
	
		invalidHandler: function (form, validator) {
		  validator.focusInvalid();
		},
		submitHandler: function (form) {

				ajaxindicatorstart('Please wait...');
				setTimeout(function () {
				   $.ajax({
							  url: "/submit_add_dynamic_lob",
							  type: "POST",
							  data: {
								add_lob_name : $("#add_lob_name").val().trim(),
								add_lob_solo_journey : $("#add_lob_solo_journey").val().trim(),
								add_lob_dual_journey : $("#add_lob_dual_journey").val().trim(),
								add_lob_ap : $("#add_lob_ap").val().trim(),
							  },
							  async: true,
							  dataType: "json",
							  success: function (response) 
							  {	
								  ajaxindicatorstop();

								  if(response.status == 'success'){
									swal(
										{
										  title: "Added!",
										  text:'LOB added!',
										  type: "success",
										  showCancelButton: false,
										  confirmButtonText: "Ok!",
										  closeOnConfirm: true,
										},
										function () {
										  setTimeout(function(){
											window.location.reload();
										  });
										}
									  );
								}else if(response.status == 'duplicate'){
									swal(
										{
										  title: "Alert!",
										  text:'LOB name already exists!',
										  type: "warning",
										  showCancelButton: false,
										  confirmButtonText: "Ok!",
										  closeOnConfirm: true,
										},
										function () {
										 
										}
									  );
								}else{

									swal(
										{
										  title: "Alert!",
										  text:'Something went wrong! please try again.',
										  type: "warning",
										  showCancelButton: false,
										  confirmButtonText: "Ok!",
										  closeOnConfirm: true,
										},
										function () {
										 
										}
									  );

								}



							  }
						  });
					  }, 1000);


		},
	  });