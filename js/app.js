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
import {SplashView, SearchView} from './views'
// ///////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////

// API URL

// Field options
// https://docs.google.com/spreadsheets/d/1jZSa039OfpQOiRzaS980nPKCvVe2TRKRPZk7ZbaH7kE/edit#gid=0

var NutrientModel = Backbone.Model.extend({})

var NutrientColl = Backbone.Collection.extend({
	_setURL: function(){
		this.url = `https://api.edamam.com/api/nutrition-data?`
	},

	app_key:'a6b9a5263508160cfed5871c51e9b76c',
	app_id:'80058571',

	model:NutrientModel,
	
	parse:function(rawData){
		console.log('rawData.hits: >>>>>>', rawData.hits)
		return rawData.hits
	}
})

var IronEventsRouter = Backbone.Router.extend({
	
	routes:{
		'search/:qry':'handleSearchPage',
		'*home':'handleSplashPage'
	},

	handleSearchPage: function(){
		var component = this
		var hashRoute = location.hash
		console.log('hashRoute', hashRoute)
		var qry = hashRoute.substring(8).split('%20').join('/')
		console.log('qry', qry)
		component.nc = new NutrientColl()
		component.nc._setURL(qry)
		console.log('component.nc', component.nc)
		component.nc.fetch({
			data:{
				'app_id':component.nc.app_id,
				'app_key':component.nc.app_key,
				'ingr':qry
			}
		}).then( function(){
			DOM.render(<SearchView qryColl={component.nc}/>, document.querySelector('.container'))
		})
	},


	handleSplashPage: function(){
		var component = this
		var hashRoute = location.hash
		// var qry = hashRoute.substring(1)
		// console.log('qry', qry)
		// component.nc = new NutrientColl()
		// component.nc._setURL(qry)
		// console.log('component.nc', component.nc)
		/
			DOM.render(<SplashView qryColl={component.nc}/>, document.querySelector('.container'))
		// })
	},

	initialize: function(){
		// console.log('app is routing!')
		Backbone.history.start()
	}
})

var IER = new IronEventsRouter()