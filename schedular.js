$(window).on("load", function() {
	function ride(){
		/*=== Draggable Box ===*/
		$(".resize").draggable({
			axis: "x,y",
			animate: true,
			grid: [ 102,91],
			containment:'.grids-body',
			scroll:true,
			revert: "valid",
			refreshPositions: true,
			start: function(event,ui) {
			},
			stop: function(event,ui) {

			}
		});

		/*=== Droppable ===*/
		$( ".ride" ).droppable({
			tolerance: "touch"
		});


		var targetPos = [];
		var sp = "";
		/*=== Resizable Box ===*/
		$(".resize").resizable({
			grid: [ 102, 0 ],
			animate: false,
			handles: 'e',
			containment:'.grids-body',
			maxHeight:77,
			minHeight:77,
			start: function(event, ui){
				targetPos = [];
				$('.ride').each(function(){
					targetPos.push($(this).position());
				});
				sp = ui.position.left + ui.size.width;
			},
			stop: function(event, ui){
				var ep = ui.position.left + ui.size.width;
				var tp = ui.position.top;
				$.each(targetPos, function(i,e){
					if(targetPos[i].top == tp){
						if(targetPos[i].left > sp && targetPos[i].left < ep){
							ui.element.css(ui.originalSize);
							setTimeout(function(){
								detectShortRides();
							},100);
						}
					}
				});

			}

		});


		$( ".resize" ).on( "resizestop", function( event, ui ){
			if(ui.size.width <= 204){
				$(this).addClass("short-ride");
			}
			else{
				$(this).removeClass("short-ride");
			}
			setTimeout(function(){
				RideTime(ui.element[0]);
			},400);
		});


		function detectShortRides(){
			$(".ride").each(function(){
				if($(this).width() <=  204){
					$(this).addClass("short-ride");
				}
				else{
					$(this).removeClass("short-ride");
				}
			});
		}
		detectShortRides();


		$(".show-add").on("click",function(){
			$(this).parents('.ride').find('.complete-add').fadeIn();
		});

		$(".complete-add").on("click",function(){
			$(this).fadeOut();
		});
	}
	ride();

	/*=== New Ride Menu ===*/
	$("html").on("click",function(event){
		if($(event.target).is(".grids-body .timeslot")){
			$("#add-ride .modal-title h4").text('New Ride');
			$("#pass-name").val("");
			$("#pass-contact").val("");
			$("#pass-loc").val("");
			$("#add-ride .add-ride-btn").show();
			$("#add-ride .edit-ride-btn").hide();

			$(".ride-opts").removeClass("show");
			$(".new-ride").addClass("show");
			let left = $(event.target).offset().left;
			let top = $(event.target).offset().top;
			$(".new-ride").css({
				"left":left + 50,
				"top":top + 30
			});
		}
		else{
			$(".ride-opts").removeClass("show");
			$(".new-ride").removeClass("show");
			$(".new-ride").css({
				"left":0,
				"top":0
			});
		}
	});

	/*=== Menu On Right For Edit Or Delete A Ride ===*/
	document.oncontextmenu = function() { return false; };
	$("body").on("mousedown",".grids-body .ride",function(e){
		if( e.button == 2 ) {
			$(".new-ride").removeClass("show");
			$(".ride").removeClass("selected");
			$(this).addClass("selected");
			$(".ride-opts").addClass("show");
			let left = $(this).offset().left;
			let top = $(this).offset().top;
			$(".ride-opts").css({
				"left":left + 50,
				"top":top + 30
			});
			return false;
		}
		return true;
	});

	/*=== Delete Ride ===*/
	$(".delete-ride").on("click",function(){
		$(".ride.selected").detach();
	});

	/*=== Edit Ride Popup Open ===*/
	$(".edit-ride").on("click",function(){
		if($(".ride.selected").hasClass('maintenance') || $(".ride.selected").hasClass('preparation') || $(".ride.selected").hasClass('return') || $(".ride.selected").hasClass('service')){
			$("#change-ride").modal('show');
			$('.change-ride').val('service').trigger('change');
		}
		else{
			$("#add-new").modal('show');
			let name = $(".ride.selected .passenger-info .pass-name").text();
			let contact = $(".ride.selected .passenger-info .pass-contact").text();
			let loc = $(".ride.selected .passenger-info .pass-loc").text();
			$("#add-ride #pass-name").val(name);
			$("#add-ride #pass-contact").val(contact);
			$("#add-ride #pass-loc").val(loc);
			$("#add-ride .modal-title h4").text('Edit Ride');
			$("#add-ride .add-ride-btn").hide();
			$("#add-ride .edit-ride-btn").show();
		}
	});



	/*=== Ride Changer ===*/
	$("#ride-changer .modal-footer button.custom-btn").on("click", function(){
		let changedRide = $('.change-ride').select2('data')[0].element.value;
		let rideName = $('.change-ride').select2('data')[0].text;
		$(".ride.selected .other-info span").html(rideName);
		if(rideName == 'Return'){
			$(".ride.selected .other-info i").attr('class','ion-arrow-return-left');
		}
		if(rideName == 'Maintenance'){
			$(".ride.selected .other-info i").attr('class','ion-settings');
		}
		if(rideName == 'Preparation'){
			$(".ride.selected .other-info i").attr('class','ion-pinpoint');
		}
		if(rideName == 'Service'){
			$(".ride.selected .other-info i").attr('class','ion-pull-request');
		}
		$(".ride.selected").attr('class',"ride resize butNotHere " + changedRide);
		$("#change-ride").modal('hide');
		return false;
	});

	/*=== New Ride Menu Open Position ===*/
	var myposleft;
	var mypostop;
	$("body").on("click",".timeslot",function(){
		myposleft = $(this).offset().left - $(".grids-body").offset().left - 1;
		mypostop = $(this).offset().top - $(".grids-body").offset().top + 2;
	});

	/*=== Add New Ride On Submit Popup Form ===*/
	$('#add-ride  .modal-footer .custom-btn').on("click", function(){
		if($("#pass-name").val().length < 1 || $("#pass-contact").val().length < 1 || $("#pass-loc").val().length < 1){
			if($("#add-ride .modal-body .alert").length <  1){
				$("#add-ride .modal-body").prepend(`<div class="alert alert-danger hidden error-msg" style="display:none"> <strong>Error!</strong> Please Fill All Fields </div>`);
			}
			$(".error-msg").slideDown().delay(1500).slideUp();

		}else{
			// Get Values Filled in the Form
			let name = $("#pass-name").val();
			let contact = $("#pass-contact").val();
			let loc = $("#pass-loc").val();
			// If New Ride
			if($(".custom-btn:focus").hasClass("add-ride-btn")){
				$(".grids-body").prepend(`
					<div class="ride resize butNotHere" style="left:${myposleft}px; top:${mypostop}px">
					<div class="passenger-info complete-add scrolly">
					<ul>
					<li><i class="ion-ios-location-outline"></i>${loc}</li>
					</ul>
					</div>
					<div class="passenger-info scrolly">
					<ul>
					<li><i class="ion-android-person"></i> <strong class="pass-name">${name}</strong></li>
					<li><i class="ion-ios-telephone-outline"></i> <span class="pass-contact">${contact}</span></li>
					<li><a class="show-add" href="#" title=""> <i class="ion-ios-location-outline"></i> <span class="pass-loc"> ${loc}</span></a></li>
					</ul>
					</div>
					<div class="assign-driver">
					<span>Driver Not Assigned</span>
					<span><i class="hr">02</i>:<i class="mins">02</i>Hours</span>
					<a class="custom-btn" data-toggle="modal" data-target="#assign-driver"  href="#" title=""><i class="ion-android-person-add"></i> Assign Driver</a>
					</div>
					<div class="short-ride-info">
					<ul>
					<li><i class="ion-android-person"></i> <strong class="pass-name">${name}</strong></li>
					<li><i class="ion-ios-telephone-outline"></i> <span class="pass-contact">${contact}</span></li>
					<li><a class="show-add" href="#" title=""> <i class="ion-ios-location-outline"></i> <span  class="pass-loc">${loc}</span></a></li>
					</ul>
					</div>
					</div>
					`);
					ride();
					customScroll();

					$("#add-new").modal('hide');
					return false;
				}
				// If Edit Ride
				else if($(".custom-btn:focus").hasClass("edit-ride-btn")){
					$(".ride.selected .pass-name").text(name);
					$(".ride.selected .pass-contact").text(contact);
					$(".ride.selected .pass-loc").text(loc);

					$(".ride.selected").removeClass('selected');
					$("#pass-name").val("");
					$("#pass-contact").val("");
					$("#pass-loc").val("");
					$("#add-new").modal('hide');
					$("#add-ride .edit-ride-btn").hide();
					$("#add-ride .add-ride-btn").show();
					$("#add-ride .modal-title h4").text('New Ride');
					return false;
				}
			}
		});

		/*=== Ride Cancel ===*/
		$(".ride-cancel").on("click",function(){
			$(".ride.selected").removeClass('selected');
			$("#pass-name").val("");
			$("#pass-contact").val("");
			$("#pass-loc").val("");
			$("#add-new").modal('hide');
		});


		/*=== Return To Base ===*/
		$(".other-info-btn").on("click",function(){
			let iconClass = $(this).find('i').attr("class");
			let text = $(this).find('span').text();
			let rideClass = $(this).attr('data-rideclass');
			$(".grids-body").prepend(`
				<div class="ride resize butNotHere ${rideClass}" style="left:${myposleft}px; top:${mypostop}px">
				<div class="other-info">
				<i class="${iconClass}"></i>
				<span>${text}</span>
				</div>
				</div>`);
				ride();
				$(".new-ride").removeClass("show");
				return false;
			});



			/*=== Select Ride To Assign Driver ===*/
			$('body').on("click",'a[data-target="#assign-driver"]',function(){
				$(this).parents('.ride').addClass('assign-to-me');
				$(".driver-selector tr").removeClass('selected');
			});


			$("body").on("click",".driver-selector tr",function(){
				$(this).addClass('selected').siblings().removeClass('selected');
			});

			/*=== Select Driver ===*/
			$('#select-driver  .modal-footer button.custom-btn').on("click", function(){
				// let selectedDriver = $('.all-driver').select2('data')[0].text;
				// let selectedDriver = $("#new-driver").val();
				// let driverImage = $(".inputpicker-wrapped-list .table>tbody>tr>td img").attr('src');
				let selectedDriver = $(".driver-selector tr.selected td.limo-driver").text();
				let driverImage =  $(".driver-selector tr.selected td.limo-driver-img img").attr('src');
				$(".assign-to-me .assign-driver").detach();
				$(".assign-to-me").append(`
					<div class="driver-info">
					<ul>
					<li><img src="${driverImage}"> <i class="ion-android-person"></i> <strong class="driver-name">${selectedDriver}</strong></li>
					<li><i class="ion-ios-clock-outline"></i> <span><i class="hr">02</i>:<i class="mins">02</i>Hours</span></li>
					</ul>
					</div>`);

					RideTime(".assign-to-me");

					$(".assign-to-me").addClass('assigned').removeClass('assign-to-me');

					if($('.ride').hasClass('change-driver')){
						$(".change-driver .driver-info .driver-name").html(selectedDriver);
						$(".change-driver .driver-info ul li img").attr('src',driverImage);
						$(".change-driver").removeClass('change-driver');
						$("#assign-driver .modal-header .modal-title h4").text('Assign A Driver');
					}

					$("#assign-driver").modal('hide');
					return false;
				});


				/*=== Cancel Popup ===*/
				$(".cancel-popup").on("click",function(){
					$(".change-driver").removeClass('change-driver');
				});


				/*=== Change Driver ===*/
				$("body").on("click" , ".driver-info" , function(){
					$(this).parents('.ride').addClass('change-driver');
					let thisDriver = $(this).find('.driver-name').text();
					$("#assign-driver .modal-header .modal-title h4").text('Change The Driver');
					$("#assign-driver").modal('show');
					$(".driver-selector tr").removeClass('selected');
					console.log($(`td[drivername='${thisDriver}']`));
					$("td[drivername='" + thisDriver + "']").parents('tr').addClass('selected');
				});


				/* ===  Add Short Ride Info To Each Ride === */
				$(".ride").each(function(){
					if($(this).hasClass('return') || $(this).hasClass('maintenance') || $(this).hasClass('preparation') || $(this).hasClass('service')){
						return true
					}
					else{
						// Add Short Ride Info To Each Ride
						let name = $(this).find(".passenger-info .pass-name").text();
						let contact = $(this).find(".passenger-info .pass-contact").text();
						let loc = $(this).find(".passenger-info .pass-loc").text();
						$(this).append(`<div class="short-ride-info">
						<ul>
						<li><i class="ion-android-person"></i> <strong class="pass-name">${name}</strong></li>
						<li><i class="ion-ios-telephone-outline"></i> <span  class="pass-contact">${contact}</span></li>
						<li><i class="ion-ios-location-outline"></i> <span class="pass-loc">${loc}</span></li>
						</ul>
						</div>`);
						RideTime(this);
					}
				});


				// Update Driver Time For the Assigned Drive
				function RideTime(thisRide){
					let rideWidth  = $(thisRide).width();
					let updateTime = convertPixelToTime(rideWidth);

					function pad2(number) {
						return (number < 10 ? '0' : '') + number
					}



					$(thisRide).find(".driver-info .hr").text(pad2(updateTime.h));
					$(thisRide).find(".driver-info .mins").text(pad2(updateTime.m));
					$(thisRide).find(".assign-driver .hr").text(pad2(updateTime.h));
					$(thisRide).find(".assign-driver .mins").text(pad2(updateTime.m));
				}




				/* ===  Convert Mili Seconds Hours === */
				function convertMiliseconds(miliseconds, format) {
					var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

					total_seconds = parseInt(Math.floor(miliseconds / 1000));
					total_minutes = parseInt(Math.floor(total_seconds / 60));
					total_hours = parseInt(Math.floor(total_minutes / 60));
					days = parseInt(Math.floor(total_hours / 24));

					seconds = parseInt(total_seconds % 60);
					minutes = parseInt(total_minutes % 60);
					hours = parseInt(total_hours % 24);

					//KazimTimeFix-Start
					var KazimTimeFix = new Date(0, 0, 0, hours, minutes, seconds, 0);
					KazimTimeFix.setMinutes( KazimTimeFix.getMinutes() + 1 );
					hours = KazimTimeFix.getHours();
					minutes = KazimTimeFix.getMinutes();
					//KazimTimeFix-End

					switch(format) {
						case 's':
						return total_seconds;
						break;
						case 'm':
						return total_minutes;
						break;
						case 'h':
						return total_hours;
						break;
						case 'd':
						return days;
						break;
						default:
						return { d: days, h: hours, m: minutes, s: seconds };
						//return { h: hours, m: minutes}
					}
				};

				function convertPixelToTime(pixels){
					let onePx = 17647.05882352941;
					return convertMiliseconds(pixels * onePx);
				}





				$('#txtdatetime').datetimepicker({
					timeFormat: 'hh:mm tt',
					hourMin: 00,
					hourMax: 23,
					stepMinute: 30,
					showButtonPanel: true,
					alwaysSetTime: true,
					onSelect: function (selectedDateTime) {
						console.log(selectedDateTime)
						getTimeslots(selectedDateTime);
					}
				});
				$("#txtdatetime").datepicker("setDate", new Date());

				var month = new Array();
				month[0] = "Jan";
				month[1] = "Feb";
				month[2] = "Mar";
				month[3] = "Apr";
				month[4] = "May";
				month[5] = "Jun";
				month[6] = "Jul";
				month[7] = "Aug";
				month[8] = "Sep";
				month[9] = "Oct";
				month[10] = "Nov";
				month[11] = "Dec";



				var getTimeslots = function getTimeslots(start_time){
					let date = new Date(start_time);
					let timeSlotArray = [];

					/* === Add Minutes To Time ==== */
					function addMinutesToTime(time, minsAdd) {
						function z(n){
							return (n<10? '0':'') + n;
						};
						var bits = time.split(':');
						var mins = bits[0]*60 + +bits[1] + +minsAdd;
						return z(mins%(24*60)/60 | 0) + ':' + z(mins%60);
					}

					/* === Create Slots Array ==== */
					function createSlotsArray(){
						let hours = date.getHours();
						let mins = date.getMinutes();
						hours < 10 ?  hours = "0" + hours:'';
						mins < 10 ?  mins = "0" + mins:'';
						let nowtime = hours + ":" +  mins;
						for (i = 0; i <= 47; i++){
							timeSlotArray.push(nowtime);
							nowtime =  addMinutesToTime(nowtime,30)

						}
					}

					/* === Create Time Slots ==== */
					function createTimeSlots(){
						createSlotsArray();
						let suffix = '';
						let selectedDate = date.getDate()  + ' ' + month[date.getMonth()]
						let myclass = "timeslot";
						$(".grids-head").html('');
						$(".grids-row").html('');
						$.each(timeSlotArray, function(i,e){
							let hr = e.split(':')[0];
							hr >= 12 ?  suffix = "PM": suffix = "AM"
							hr > 12 ?  hr = hr - 12:'';
							let mins = e.split(':')[1];

							if(hr == 00 &&  mins == 00 && suffix == "AM"){
								date = new Date(new Date(date).getTime()+(1*24*60*60*1000));
								selectedDate = date.getDate()  + ' ' + month[date.getMonth()]
								myclass = "timeslot nxt-day"
							}

							$(".grids-head").append(`<div class="${myclass}"> ${hr}:${mins} ${suffix} <i>${selectedDate}</i> </div> `);
							$(".grids-row").each(function(){
								$(this).append(`<div class="timeslot"> + </div>`);
							});
						});
					}
					createTimeSlots();


				}
				getTimeslots( new Date().setHours(08, 00));



				$('body').on("click","#divtime0",function () {
					$("#ctltime0").show();
				});
				$(document).mouseup(function (e) {
					var container = $("#ctltime0");

					// if the target of the click isn't the container nor a descendant of the container
					if (!container.is(e.target) && container.has(e.target).length === 0) {
						container.hide();
					}
				});
				$('#ctltime0').timepicker({
					timeFormat: 'hh:mm tt',
					hour:06,
					hourMin: 00,
					hourMax: 23,
					stepMinute: 30,
					showButtonPanel: false,
					onSelect: function (selectedDateTime) {
						let hr = selectedDateTime.split(':')[0];
						let mins = selectedDateTime.split(':')[1].split(' ')[0];
						let meridium = selectedDateTime.split(' ')[1];
						meridium == "pm" ? hr = parseInt(hr) + 12:'';
						getTimeslots( new Date().setHours(hr, mins));
					}
				});



				// function drawTime(start_time, meridium){
				// 	var month = new Array();
				// 	month[0] = "Jan";
				// 	month[1] = "Feb";
				// 	month[2] = "Mar";
				// 	month[3] = "Apr";
				// 	month[4] = "May";
				// 	month[5] = "Jun";
				// 	month[6] = "Jul";
				// 	month[7] = "Aug";
				// 	month[8] = "Sep";
				// 	month[9] = "Oct";
				// 	month[10] = "Nov";
				// 	month[11] = "Dec";
				// 	// Create Today's Date
				// 	let a = $(".new-datepicker").val();
				// 	let newDate = new Date(new Date(a));
				// 	let date = newDate.getDate();
				// 	let tempMonth = month[newDate.getMonth()];
				// 	let today = date + ' ' + tempMonth;
				//
				// 	// Tomorrows Today's Date
				// 	let nextDate = new Date(new Date(newDate).getTime()+(1*24*60*60*1000));
				// 	let nday = nextDate.getDate();
				// 	let nextMonth = month[nextDate.getMonth()];
				// 	let tomorrow = nday + ' ' + nextMonth;
				//
				// 	let nextday = false;
				// 	// Start Time Should Be Below 12
				// 	if(start_time <= 12){
				// 		// 24 Hours Loop
				// 		for (let i=0; i <= 23; i++){
				// 			start_time < 10 ? "0" + start_time : start_time;
				// 			// Change 12 to 00
				// 			if(start_time == 12){
				// 				start_time = 00;
				// 				// Change AM into PM or PM into AM
				// 				if(meridium == 'AM'){
				// 					meridium = 'PM'
				// 				}
				// 				else if(meridium == 'PM'){
				// 					meridium = 'AM';
				// 					nextday = true;
				// 				}
				// 			}
				// 			// Draw Two Timeslots Of Half An Hour Each For Each Hour
				// 			for (let j=0; j <= 1; j++){
				// 				if(j == 0){
				// 					// Add nxt-day Class If Time Is More than 00:00 AM
				// 					if(nextday == true){
				// 						$(".grids-head").append(`<div class="timeslot nxt-day" id="divtime${i}"> ${start_time}:00 ${meridium} <i>${tomorrow}</i> </div>
				// 						<div name="ctltime" id="ctltime${i}" style="display:none;position:absolute;z-index:10"></div>
				// 						`);
				// 						$(".grids-row").each(function(){
				// 							$(this).append(`<div class="timeslot"> + </div>`);
				// 						});
				// 					}else{
				// 						$(".grids-head").append(`<div class="timeslot" id="divtime${i}"> ${start_time}:00 ${meridium} <i>${today}</i> </div>
				// 						<div name="ctltime" id="ctltime${i}" style="display:none;position:absolute;z-index:10"></div>
				// 						`);
				// 						$(".grids-row").each(function(){
				// 							$(this).append(`<div class="timeslot"> + </div>`);
				// 						});
				// 					}
				// 				}
				// 				else if(j == 1){
				// 					if(nextday == true){
				// 						$(".grids-head").append(`<div class="timeslot nxt-day" id="divtime${i}"> ${start_time}:30 ${meridium} <i>${tomorrow}</i> </div>
				// 						<div name="ctltime" id="ctltime${i}" style="display:none;position:absolute;z-index:10"></div>
				// 						`);
				// 						$(".grids-row").each(function(){
				// 							$(this).append(`<div class="timeslot"> + </div>`);
				// 						});
				// 					}else{
				// 						$(".grids-head").append(`<div class="timeslot" id="divtime${i}"> ${start_time}:30 ${meridium} <i>${today}</i> </div>
				// 						<div name="ctltime" id="ctltime${i}" style="display:none;position:absolute;z-index:10"></div>
				// 						`);
				// 						$(".grids-row").each(function(){
				// 							$(this).append(`<div class="timeslot"> + </div>`);
				// 						});
				// 					}
				// 				}
				// 			}
				//
				// 			start_time++;
				// 		}
				// 	}
				// 	else{
				// 		alert('Select An Hour Below 12 To Draw Grids Successfully');
				// 	}
				//
				// 	//=======================================
				// 	$('body').on("click","#divtime0",function () {
				// 		$("#ctltime0").show();
				// 	});
				// 	$('#ctltime0').timepicker({
				// 		timeFormat: 'hh:mm tt',
				// 		hour:06,
				// 		hourMin: 00,
				// 		hourMax: 23,
				// 		stepMinute: 30,
				// 		showButtonPanel: false,
				// 		onSelect: function (selectedDateTime) {
				// 		}
				// 	});
				//
				//
				// 	$(document).mouseup(function (e) {
				// 		var container = $("#ctltime0");
				//
				// 		// if the target of the click isn't the container nor a descendant of the container
				// 		if (!container.is(e.target) && container.has(e.target).length === 0) {
				// 			container.hide();
				// 		}
				// 	});
				//
				//
				// }
				// // Draw Time Slot From 6PM
				// drawTime(6,'PM');



				$(".nextDate").on("click",function(){
					var date = $(".new-datepicker").datepicker('getDate');
					date.setDate(date.getDate() + 1)
					$(".new-datepicker").datepicker("setDate", date);
					getTimeslots(date);
					return false;
				});

				$(".prevDate").on("click",function(){
					var date = $(".new-datepicker").datepicker('getDate');
					date.setDate(date.getDate() - 1)
					$(".new-datepicker").datepicker("setDate", date);
					getTimeslots(date);
					return false;
				});




		// LOAD RIDES FROM JSON
		$.ajax({
			method: "GET",
			url: "Scripts/JS/JSON/schedular.json",
			dataType: "JSON"
		}).success(function(result) {
			console.log(result);

			let timeslots = [];
			$.each($(".grids-head .timeslot"), function(){
				timeslots.push($(this).clone().children().remove().end().text())
			});

			let rides = result.JMetaData;
			$.each(rides, function(i,e){
				//variables Defination
				let id = e.id;
				let assigned = e.Assigned;
				let duration_hr = e.Duration_hr;
				let duration_mins = e.Duration_mins;
				let car = e.Car_id;
				let date = e.Date;
				let time = e.Time;
				let p_name = e.Passenger.Name;
				let p_phone = e.Passenger.Phone;
				let p_pickup = e.Passenger.Pickup;
				let d_name = e.Driver.Name;
				let d_img = e.Driver.Image;

				// Ride Position From Top
				let carRow = $(".vehicles-info .car[data-id= '" + car + "']").index() - 1;
				let topOffset  = $(".grids-body .grids-row").eq(carRow).offset().top - $(".grids-body").offset().top + 1;

				// Ride Position From Left
				let leftOffset =  timeslots.indexOf(time);
				leftOffset = $(".grids-row .timeslot").eq(leftOffset).offset().left - $(".grids-body").offset().left ;

				let width = '';
				if(duration_hr >= 1){
					width = 102 * duration_hr * 2  - 2;
					if(duration_mins == "30"){
						width = width + 102 - 2;
					}
				}
				if(assigned == true){
					$(".grids-body").prepend(`<div class="ride resize assigned" id="${id}" style="width:${width}px; left:${leftOffset}px; top:${topOffset}px ">
						<div class="passenger-info complete-add scrolly">
							<ul>
								<li><i class="ion-ios-location-outline"></i> ${p_pickup}</li>
							</ul>
						</div>
						<div class="passenger-info scrolly">
							<ul>
								<li><i class="ion-android-person"></i> <strong class="pass-name">${p_name}</strong></li>
								<li><i class="ion-ios-telephone-outline"></i> <span class="pass-contact">${p_phone}</span></li>
								<li><a class="show-add" href="#" title=""> <i class="ion-ios-location-outline"></i> <span class="pass-loc">${p_pickup}</span></a></li>
							</ul>
	  					</div>
						<div class="driver-info">
							<ul>
								<li><img src="${d_img}"> <i class="ion-android-person"></i> <strong class="driver-name">${d_name}</strong></li>
								<li><i class="ion-ios-clock-outline"></i> <span><i class="hr">${duration_hr}</i>:<i class="mins">${duration_mins}</i> Hours</span></li>
							</ul>
						</div>
						<div class="short-ride-info">
							<ul>
								<li><i class="ion-android-person"></i> <strong class="pass-name">${p_name}</strong></li>
								<li><i class="ion-ios-telephone-outline"></i> <span class="pass-contact">${p_phone}</span></li>
								<li><a class="show-add" href="#" title=""> <i class="ion-ios-location-outline"></i> <span class="pass-loc">${p_pickup}</span></a></li>
							</ul>
						</div>
					</div>`);
				}else{
					$(".grids-body").prepend(`<div class="ride resize" id="${id}" style="width:${width}px; left:${leftOffset}px; top:${topOffset}px ">
						<div class="passenger-info complete-add scrolly">
							<ul>
								<li><i class="ion-ios-location-outline"></i> ${p_pickup}</li>
							</ul>
						</div>
						<div class="passenger-info scrolly">
							<ul>
								<li><i class="ion-android-person"></i> <strong class="pass-name">${p_name}</strong></li>
								<li><i class="ion-ios-telephone-outline"></i> <span class="pass-contact">${p_phone}</span></li>
								<li><a class="show-add" href="#" title=""> <i class="ion-ios-location-outline"></i> <span class="pass-loc">${p_pickup}</span></a></li>
							</ul>
	  					</div>
						<div class="assign-driver">
							<span>Driver Not Assigned</span>
							<span><i class="hr">${duration_hr}</i>:<i class="mins">${duration_mins}</i> Hours</span>
							<a class="custom-btn" data-toggle="modal" data-target="#assign-driver" href="#" title=""><i class="ion-android-person-add"></i> Assign Driver</a>
						</div>
						<div class="short-ride-info">
							<ul>
								<li><i class="ion-android-person"></i> <strong class="pass-name">${p_name}</strong></li>
								<li><i class="ion-ios-telephone-outline"></i> <span class="pass-contact">${p_phone}</span></li>
								<li><a class="show-add" href="#" title=""> <i class="ion-ios-location-outline"></i> <span class="pass-loc">${p_pickup}</span></a></li>
							</ul>
						</div>
					</div>`);
				}
			});

			ride();
			customScroll();
		}).error(function(){
			alert("ERROR");
		});


			});
