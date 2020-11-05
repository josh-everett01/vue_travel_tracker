webpackJsonp([1],{"9M+g":function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("7+uW"),i=s("Tqaz"),a=(s("Jmt5"),s("9M+g"),s("Dd8w")),n=s.n(a),o=s("NYxO"),l={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h1",[this._v("Welcome, Agent!")])])}]},u=s("VU/8")({name:"AgentDashboard",data:function(){return{}}},l,!1,null,null,null).exports,d=s("OjAt"),c=s.n(d),p=s("SyB7"),v={data:function(){return{state:this.$store.state,destination:"",index:"",allDestinations:this.$store.state.allDestinations,tripRequestForm:{destination:"",numberOfTravs:"",startDate:"",endDate:""},errors:[]}},methods:{validateFormAndCalculateTripRequest:function(){this.$store.dispatch("validateTripRequestForm",this.tripRequestForm),!0===this.isTripRequestFormValid&&this.$store.dispatch("calculateTripRequest",this.tripRequestForm)},submitTripRequest:function(){this.$store.dispatch("submitTripRequest")},startDate:function(){return Object(p.a)(this.$store.state.tripRequestInfo.startDate).toDateString()},endDate:function(){return Object(p.a)(this.$store.state.tripRequestInfo.endDate).toDateString()}},computed:n()({},Object(o.b)(["isTripRequestFormValid"]),Object(o.b)(["tripRequestInfoCreated"]),Object(o.b)(["hasTripRequestBeenSubmitted"]))},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"trip-request"},[!1===this.isTripRequestFormValid?s("section",{staticClass:"container",attrs:{id:"request-form"}},[s("h3",[t._v("Request Trips:")]),t._v(" "),s("label",{attrs:{for:"destination-choice"}},[t._v("Search for a Destination:")]),t._v(" "),s("b-form-input",{attrs:{list:"destinations"},model:{value:t.tripRequestForm.destination,callback:function(e){t.$set(t.tripRequestForm,"destination",e)},expression:"tripRequestForm.destination"}}),t._v(" "),s("datalist",{attrs:{id:"destinations"}},t._l(t.allDestinations,function(e){return s("option",{key:e.id},[t._v("\n        "+t._s(e.destination)+"\n      ")])}),0),t._v(" "),s("label",{attrs:{for:"number-of-travelers"}},[t._v("Number of Travelers:")]),t._v(" "),s("b-form-input",{attrs:{list:"number-of-travelers"},model:{value:t.tripRequestForm.numberOfTravs,callback:function(e){t.$set(t.tripRequestForm,"numberOfTravs",e)},expression:"tripRequestForm.numberOfTravs"}}),t._v(" "),s("datalist",{attrs:{id:"number-of-travelers"}},t._l(20,function(e){return s("option",{key:e},[t._v("\n        "+t._s(e)+"\n      ")])}),0),t._v(" "),s("label",{attrs:{for:"trip-start"}},[t._v("Please select a start date:")]),t._v(" "),s("b-form-datepicker",{staticClass:"mb-2",attrs:{id:"trip-start"},model:{value:t.tripRequestForm.startDate,callback:function(e){t.$set(t.tripRequestForm,"startDate",e)},expression:"tripRequestForm.startDate"}}),t._v(" "),s("label",{attrs:{for:"trip-end"}},[t._v("Please select an end date:")]),t._v(" "),s("b-form-datepicker",{staticClass:"mb-2",attrs:{id:"trip-end"},model:{value:t.tripRequestForm.endDate,callback:function(e){t.$set(t.tripRequestForm,"endDate",e)},expression:"tripRequestForm.endDate"}}),t._v(" "),s("button",{attrs:{id:"trip-request-button"},on:{click:t.validateFormAndCalculateTripRequest}},[t._v("\n      CALCULATE\n    ")])],1):t._e(),t._v(" "),!1===this.hasTripRequestBeenSubmitted?[this.tripRequestInfoCreated?s("section",{staticClass:"container confirm-trip"},[s("h1",{staticClass:"confirm-h1"},[t._v("Please confirm your trip details:")]),t._v(" "),s("div",{staticClass:"destinationimage"},[s("img",{attrs:{src:t.state.tripRequestInfo.destinationImageUrl}})]),t._v(" "),s("div",{staticClass:"trip-info"},[s("div",{staticClass:"trip-destination"},[s("strong",[t._v(" Traveling To: ")]),t._v("\n          "+t._s(t.state.tripRequestInfo.destination)+"\n        ")]),t._v(" "),s("div",{staticClass:"number-of-travelers"},[s("strong",[t._v(" Total Number of Travelers:")]),t._v("\n          "+t._s(t.state.tripRequestInfo.numberOfTravelers)+"\n        ")]),t._v(" "),s("div",{staticClass:"trip-start-date"},[s("strong",[t._v("Trip Begins: ")]),t._v("\n          "+t._s(t.startDate())+"\n        ")]),t._v(" "),s("div",{staticClass:"trip-length"},[s("strong",[t._v("Trip Length: ")]),t._v("\n          "+t._s(t.state.tripRequestInfo.tripLength)+"\n        ")]),t._v(" "),s("div",{staticClass:"trip-end-date"},[s("strong",[t._v("Trip Ends: ")]),t._v("\n          "+t._s(t.endDate())+"\n        ")]),t._v(" "),s("div",{staticClass:"lodging-costs"},[s("strong",[t._v("Estimated lodging costs @\n            "+t._s(t._f("currency")(t.state.tripRequestInfo.destinationsLodgingCost))+" per\n            day:\n          ")]),t._v("\n          "+t._s(t._f("currency")(t.state.tripRequestInfo.lodgingCost))+"\n        ")]),t._v(" "),s("div",{staticClass:"flight-costs"},[s("strong",[t._v("Estimated flight costs @\n            "+t._s(t._f("currency")(t.state.tripRequestInfo.destinationsFlightCost))+" per\n            person:\n          ")]),t._v("\n          "+t._s(t._f("currency")(t.state.tripRequestInfo.flightCost))+"\n        ")]),t._v(" "),s("div",{staticClass:"fees"},[s("strong",[t._v("Estimated fees: ")]),t._v("\n          "+t._s(t._f("currency")(t.state.tripRequestInfo.agentFee))+"\n        ")]),t._v(" "),s("div",{staticClass:"total-cost"},[s("strong",[t._v("Estimated total cost: ")]),t._v("\n          "+t._s(t._f("currency")(t.state.tripRequestInfo.totalTripCost))+"\n        ")])]),t._v(" "),s("div",{staticClass:"submit-request"},[t._v("\n        If you would like to submit this request, please click 'Submit Trip'\n        below:\n        "),s("button",{on:{click:t.submitTripRequest}},[t._v("Submit Trip")])])]):t._e()]:t._e()],2)},staticRenderFns:[]};var f=s("VU/8")(v,m,!1,function(t){s("bd8c")},"data-v-26a9fb4a",null).exports;r.default.use(c.a);var g={mounted:function(){this.$store.dispatch("getTravelersTrips"),this.$store.dispatch("getTravsTripsAndDestinations"),this.$store.dispatch("getUpcomingAndPastTrips"),this.$store.dispatch("calcAmntTravSpent")},data:function(){return{componentKey:0,state:this.$store.state,travId:this.$store.state.travId,travelers:this.$store.state.travelers.travelers,trips:this.$store.state.allTrips,upcomingTrips:[],pastTrips:[],trip:{},destination:{},destinationImage:"",picUrl:""}},computed:n()({addTotalTripCosts:function(){return this.$store.state.eachTripsCost.reduce(function(t,e){return t+e},0)}},Object(o.b)(["hasTripRequestBeenSubmitted"]),{hopefullyRefresh:function(){return this.hasTripRequestBeenSubmitted&&this.forceRerender(),!1}}),methods:{forceRerender:function(){this.componentKey+=1}},components:{TripRequestForm:f}},h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.state.travelerLoggedIn?s("div",[s("h1",[t._v("Hello, "+t._s(t.state.traveler.name))]),t._v(" "),s("h3",[t._v("You are a "+t._s(t.state.traveler.travelerType))]),t._v(" "),s("h3",[t._v("\n    You have spent "+t._s(t._f("currency")(t.addTotalTripCosts))+" on traveling this year!\n  ")]),t._v(" "),s("trip-request-form"),t._v(" "),this.$store.state.travelersUpcomingTrips.length?s("div",[s("h1",[t._v("Your Upcoming Trips:")]),t._v(" "),t._l(t.state.travelersUpcomingTrips,function(e,r){return s("div",{key:r,staticClass:"trips"},[s("div",{staticClass:"destinationimage"},[s("img",{attrs:{src:t.state.allDestinations[e.destinationID].image}})]),t._v(" "),s("div",{staticClass:"trip-status"},[t._v("\n        "+t._s(e.status)+"\n      ")]),t._v(" "),s("div",{staticClass:"trip-date"},[t._v("\n        "+t._s(e.date)+"\n      ")]),t._v(" "),s("div",{staticClass:"trip-destination"},[t._v("\n        "+t._s(t.state.allDestinations[e.destinationID].destination)+"\n      ")])])})],2):t._e(),t._v(" "),s("h1",[t._v("Your Previous Trips:")]),t._v(" "),t._l(t.state.travelersPreviousTrips,function(e,r){return s("div",{key:r,staticClass:"trips"},[s("div",{staticClass:"destinationimage"},[s("img",{attrs:{src:t.state.allDestinations[e.destinationID].image}})]),t._v(" "),s("div",{staticClass:"trip-date"},[t._v("\n      "+t._s(e.date)+"\n    ")]),t._v(" "),s("div",{staticClass:"trip-destination"},[t._v("\n      "+t._s(t.state.allDestinations[e.destinationID].destination)+"\n    ")])])}),t._v(" "),s("router-view")],2):t._e()},staticRenderFns:[]};var _=s("VU/8")(g,h,!1,function(t){s("SCJf")},"data-v-72c7adb4",null).exports,T={mounted:function(){this.$store.dispatch("getAllDestinations"),this.$store.dispatch("getAllTrips"),this.$store.dispatch("getAllTravelers")},data:function(){return{loginForm:{username:"",password:""},errors:[]}},components:{agentDashboard:u,travelerDashboard:_},methods:{validateFormAndUser:function(){this.$store.dispatch("checkForErrors",this.loginForm),this.$store.dispatch("validatePassword",this.loginForm),this.$store.dispatch("validateUsername",this.loginForm),this.$store.dispatch("determineUser",this.loginForm),"agency"===this.whichUser?this.$store.dispatch("agentLogin"):this.$store.dispatch("travelerLogin",this.loginForm)},pushHome:function(){this.loginForm.username="",this.loginForm.password="",this.$router.push("/"),this.$store.dispatch("logOut")}},computed:n()({},Object(o.b)(["whichUser"]))},b={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login-wrapper-div"},[s("h1",[t._v("Travel Tracker")]),t._v(" "),!1===this.$store.state.anyoneLoggedIn?s("div",[s("div",{staticClass:"input-div"},[s("div",{staticClass:"username-div"},[s("label",{attrs:{for:"username"}},[t._v("Username:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.loginForm.username,expression:"loginForm.username"}],attrs:{type:"text"},domProps:{value:t.loginForm.username},on:{input:function(e){e.target.composing||t.$set(t.loginForm,"username",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"password-div"},[s("label",{attrs:{for:"password"}},[t._v("Password:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.loginForm.password,expression:"loginForm.password"}],attrs:{type:"text"},domProps:{value:t.loginForm.password},on:{input:function(e){e.target.composing||t.$set(t.loginForm,"password",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"login-button-div"},[s("button",{on:{click:t.validateFormAndUser}},[t._v("login")])])]):t._e(),t._v(" "),this.$store.state.errors.length?[s("div",{staticClass:"errors-div"},[s("ul",t._l(this.$store.state.errors,function(e){return s("li",{key:e},[t._v("\n          - "+t._s(e)+"\n        ")])}),0)])]:t._e()],2)},staticRenderFns:[]};var q=s("VU/8")(T,b,!1,function(t){s("PZtG")},"data-v-0e5d19b8",null).exports,R={name:"App",components:{Login:q}},D={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("login"),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var I=s("VU/8")(R,D,!1,function(t){s("jhBU")},null,null).exports,C=s("/ocq");r.default.use(C.a);var F=new C.a({routes:[{path:"/#",name:"Home",component:I},{path:"/agent-dashboard",name:"AgentDashboard",component:u},{path:"/traveler-dashboard/",name:"TravelerDashboard",component:_}]}),w=s("mvHQ"),$=s.n(w),U=s("mtWM"),A=s.n(U),L=s("Yo08"),P=s("xJw6");r.default.use(o.a);var y=new o.a.Store({state:{agentLogin:"agency",agentLoggedIn:!1,allDestinations:[],allTrips:[],anyoneLoggedIn:!1,correctPw:"travel2020",destinations:[],eachTripsCost:[],errors:[],formData:{},formIsValid:!1,passwordIsValid:!1,picUrl:"",traveler:{},travelerId:Number,travelerLoggedIn:!1,travelers:[],travelersDestinations:[],travelersPreviousTrips:[],travelersTrips:[],travelersUpcomingTrips:[],tripRequestFormValid:!1,tripRequestInfo:{agentFee:"",destination:"",destinationsFlightCost:"",destinationId:Number,destinationImageUrl:"",destinationsLodgingCost:"",endDate:"",flightCost:"",lodgingCost:"",numberOfTravelers:"",startDate:"",totalTripCost:"",tripLength:""},tripRequestInfoCreated:!1,tripRequestSubmitted:!1,trips:[],user:"",usernameIsValid:!1},getters:{whichUser:function(t){return t.user},isTripRequestFormValid:function(t){return t.tripRequestFormValid},tripRequestInfoCreated:function(t){return t.tripRequestInfoCreated},hasTripRequestBeenSubmitted:function(t){return t.tripRequestSubmitted}},mutations:{checkForErrors:function(t,e){t.errors=[],e.username||t.errors.push("Username is required."),e.password||t.errors.push("Password is required."),e.username&&e.password&&(t.formIsValid=!0)},validatePassword:function(t,e){t.formIsValid&&e.password===t.correctPw?t.passwordIsValid=!0:t.errors.push("Please enter a valid password")},validateUsername:function(t,e){e.username===t.agentLogin||e.username.includes("traveler")?t.usernameIsValid=!0:t.errors.push("Please enter a valid Username")},determineUser:function(t,e){t.formIsValid&&t.passwordIsValid&&t.usernameIsValid&&(e.username===t.agentLogin&&(t.user=e.username),e.username.toLowerCase().includes("traveler")&&e.username.slice(8)<t.travelers.length&&(t.user=e.username))},agentLogin:function(t){F.push("/Agent-Dashboard"),t.agentLoggedIn=!0,t.anyoneLoggedIn=!0},travelerLogin:function(t,e){t.travelerId=e.username.slice(8),t.traveler=this.state.travelers[t.travelerId-1],t.anyoneLoggedIn=!0,t.travelerLoggedIn=!0,F.push("/Traveler-Dashboard")},getAllTravelers:function(t,e){t.travelers=e.travelers},getAllTrips:function(t,e){t.allTrips=e.trips},getTravelersTrips:function(t){t.allTrips.forEach(function(e,s){var r=t.allTrips[s].userID;parseInt(t.travelerId)===r&&t.travelersTrips.push(e)})},logOut:function(t){t.travelerLoggedIn=!1,t.agentLoggedIn=!1,t.anyoneLoggedIn=!1},getAllDestinations:function(t,e){t.allDestinations=e.destinations},getTravelersDestinations:function(t){t.travelersTrips.forEach(function(e){var s=void 0;for(s=0;s<t.allDestinations.length;s++)e.destinationID===t.allDestinations[s].id&&t.travelersDestinations.push(t.allDestinations[s])})},sendPicUrlToState:function(t,e){t.picUrl=e},getTravsTripsAndDestinations:function(t){t.travelersTrips.forEach(function(e){for(var s=0;s<t.allDestinations.length;s++)e.destinationID===t.allDestinations[s].id&&(t.trips.push(e),t.destinations.push(t.allDestinations[s]))})},getUpcomingAndPastTrips:function(t){t.trips.forEach(function(e){var s=Object(L.a)(new Date(e.date),new Date);s?t.travelersPreviousTrips.push(e):!1===s&&t.travelersUpcomingTrips.push(e)})},calcAmntTravSpent:function(t){t.travelersTrips.forEach(function(e){for(var s=0;s<t.allDestinations.length;s++)if(e.destinationID===t.allDestinations[s].id&&"approved"===e.status){var r=t.allDestinations[s].estimatedFlightCostPerPerson*e.travelers,i=t.allDestinations[s].estimatedLodgingCostPerDay*e.duration,a=r+i+.1*(i+r);t.eachTripsCost.push(a)}})},validateTripRequestForm:function(t,e){t.errors=[],!1===t.tripRequestFormValid&&(e.destination||t.errors.push("Please select a destination"),e.numberOfTravs||t.errors.push("Please enter the number of travelers"),e.startDate&&e.endDate||t.errors.push("Start AND End date required"),e.destination&&e.numberOfTravs&&e.startDate&&e.endDate&&(t.tripRequestFormValid=!0))},calculateTripRequest:function(t,e){t.allDestinations.forEach(function(s){if(e.destination===s.destination){t.tripRequestInfo.destination=e.destination,t.tripRequestInfo.numberOfTravelers=e.numberOfTravs,t.tripRequestInfo.startDate=e.startDate,t.tripRequestInfo.endDate=e.endDate,t.tripRequestInfo.flightCost=s.estimatedFlightCostPerPerson*e.numberOfTravs,t.tripRequestInfo.tripLength=Object(P.a)(new Date(e.endDate),new Date(e.startDate)),t.tripRequestInfo.lodgingCost=s.estimatedLodgingCostPerDay*Number(t.tripRequestInfo.tripLength.slice(0,1));var r=t.tripRequestInfo.lodgingCost+t.tripRequestInfo.flightCost;t.tripRequestInfo.agentFee=.1*r,t.tripRequestInfo.totalTripCost=r+t.tripRequestInfo.agentFee,t.tripRequestInfo.destinationImageUrl=s.image,t.tripRequestInfoCreated=!0,t.tripRequestInfo.destinationsLodgingCost=s.estimatedLodgingCostPerDay,t.tripRequestInfo.destinationsFlightCost=s.estimatedFlightCostPerPerson,t.destinationID=s.id}})},submitTrip:function(t){var e=$()({id:parseFloat(t.allTrips.length+1),userID:t.traveler.id,destinationID:t.destinationID,travelers:parseFloat(t.tripRequestInfo.numberOfTravelers),date:t.tripRequestInfo.startDate.replace(/-/g,"/"),duration:Number(t.tripRequestInfo.tripLength.slice(0,1)),status:"pending",suggestedActivities:[""]}),s=JSON.parse(e);A.a.post("https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips",s).then(function(t){console.log(t)}).catch(function(t){console.log(t)}),t.tripRequestSubmitted=!0},refreshTravelerDashboard:function(t){t.tripRequestFormValid=!1},getRefreshedTrips:function(t,e){t.allTrips=e.trips}},actions:{checkForErrors:function(t,e){t.commit("checkForErrors",e)},validatePassword:function(t,e){t.commit("validatePassword",e)},validateUsername:function(t,e){t.commit("validateUsername",e)},determineUser:function(t,e){t.commit("determineUser",e)},agentLogin:function(t){t.commit("agentLogin")},travelerLogin:function(t,e){t.commit("travelerLogin",e)},getAllTravelers:function(t){var e=t.commit;A.a.get("https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers").then(function(t){e("getAllTravelers",t.data)})},getAllTrips:function(t){var e=t.commit;A.a.get("https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips").then(function(t){e("getAllTrips",t.data)})},getTravelersTrips:function(t){t.commit("getTravelersTrips")},logOut:function(t){t.commit("logOut")},separateTravelersTrips:function(t){t.commit("separateTravelersTrips")},getAllDestinations:function(t){var e=t.commit;A.a.get("https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations").then(function(t){e("getAllDestinations",t.data)})},sendPicUrlToState:function(t,e){t.commit("sendPicUrlToState",e)},getTravsTripsAndDestinations:function(t){t.commit("getTravsTripsAndDestinations")},getUpcomingAndPastTrips:function(t){t.commit("getUpcomingAndPastTrips")},calcAmntTravSpent:function(t){t.commit("calcAmntTravSpent")},validateTripRequestForm:function(t,e){t.commit("validateTripRequestForm",e)},calculateTripRequest:function(t,e){t.commit("calculateTripRequest",e)},submitTripRequest:function(t){t.commit("submitTrip")},refreshTravelerDashboard:function(t){t.commit("refreshTravelerDashboard")},getRefreshedTrips:function(t){var e=t.commit;A.a.get("https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips").then(function(t){e("getRefreshedTrips",t.data)})}}});r.default.use(i.a),r.default.use(i.b),r.default.config.productionTip=!1,new r.default({el:"#app",router:F,store:y,components:{App:I,Login:q},template:"<App/>"})},PZtG:function(t,e){},SCJf:function(t,e){},bd8c:function(t,e){},jhBU:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f17f06e1ff225574bd64.js.map