// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./serviceworker.js').then(() => {
//         // Registration was successful
//         console.info('registration success')
//     }).catch(() => {
//         console.error('registration failed')
//             // Registration failed
//     })
// } else {
//     // No ServiceWorker Support
// }

// ///////////////////////////////////////////////////////////
// IMPORT FILES
// ///////////////////////////////////////////////////////////
import DOM from 'react-dom'
import React, {Component} from 'react'
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
// import Firebase from 'firebase'
// import BackboneFire from 'bbfire'
// console.log("$>>>>>", $)
// console.log("_>>>>>", _)
// console.log("Firebase>>>>>", Firebase)
// console.log("backbone>>>>>", Backbone)
// ///////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////

// example URL for nutritionix
// "https://api.nutritionix.com/v1_1/search/taco?results=0%3A20&cal_min=0&cal_max=3&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=98cd0ce4&appKey=30068e1d9c1d32ebf4ab17a523899cf2"





// 
// https://api.nutritionix.com/v1_1/search/cheddar%20cheese?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=[YOURID]&appKey=[YOURKEY]
// https://api.nutritionix.com/v1_1/search/cheddar%20cheese?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=98cd0ce4&appKey=30068e1d9c1d32ebf4ab17a523899cf2

// API URL

var NutrientModel = Backbone.Model.extend({})

var NutrientColl = Backbone.Collection.extend({
	url:'http://api.nal.usda.gov/ndb/search/?format=json&q=oranges',
	// results=0%3A20&cal_min=0&cal_max=30000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&`,
	appKey:'CsuJbUiqOm63UDC7TTYssYjGz2IgKhCxTYKWMO6r',
	appId:'98cd0ce4',

	// model:NutrientModel,

	parse:function(rawData){
		console.log('rawData: >>>>>>', rawData)
		return rawData.hits
	}
})

var IronEventsRouter = Backbone.Router.extend({
	
	routes:{
		'*test':'handleTestPage'
	},

	handleTestPage: function(){
		var component = this
		component.nc = new NutrientColl()
		console.log('component.nc', component.nc)
		component.nc.fetch({
			data:{
				'appId':component.nc.appId,
				'api_key':component.nc.appKey,
				'query':'tomato'
			}
		}).then( function(){
			DOM.render(<ExampleView example={component.nc}/>, document.querySelector('.container'))
		})
	},

	initialize: function(){
		// console.log('app is routing!')
		Backbone.history.start()
	}
})

// VIEWS

var Footer = React.createClass({
	render:function(){
		return(
			<div className='logo'>
				<a href='http://www.nutritionix.com/api'>
					<img src='https://d3jpl91pxevbkh.cloudfront.net/nutritionix/image/upload/v1363458498/attribution_jqfdgy.png'/>
				</a>
			</div>
			)
	}
})

var ExampleView = React.createClass({

	_handleSearch:function(evt){
		console.log(evt.value)
	},

	_generateJSXresults:function(modelsArray){
		var JSXArray = ''
		// console.log('this.props.example.modelsArray>>>>>', modelsArray)
		JSXArray = modelsArray.map(function(item, ind){
			// console.log('brand_id>>>',item.get('fields').item_name)
			return (
					<div key={ind}className='brandDeets'>
						<p detail_id={ind}>brand_id: {item.get('fields').brand_id}</p>
						<p detail_id={ind}>brand_name: {item.get('fields').brand_name}</p>
						<p detail_id={ind}>item_id: {item.get('fields').item_id}</p>
						<p detail_id={ind}>item_id: {item.get('fields').brand_id}</p>
						<p detail_id={ind}>item_name: {item.get('fields').item_name}</p>
						<p detail_id={ind}>nf_serving_size_qty: {item.get('fields').nf_serving_size_qty}</p>
						<p detail_id={ind}>nf_serving_size_unit: {item.get('fields').nf_serving_size_unit}</p>
				</div>
			)
		}) 
		return JSXArray
	},


	render: function(){
		return (
			<div id='render'>
				<div className='searchBox'>
					<input onKeyDown={this._handleSearch} type='search' placeholder='search food item' type='text'></input>
					<button >search food item</button>
				</div>
				<div className='results'>
					{this._generateJSXresults(this.props.example.models)}
				</div>
				<Footer/>
			</div>
		)
	}
})


var IER = new IronEventsRouter()