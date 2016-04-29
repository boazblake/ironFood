import DOM from 'react-dom'
import React, {Component} from 'react'
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'

//MODULES
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


// VIEWS
var AppView = React.createClass({

	_handleSearch:function(evt){
		console.log(evt.target.value)
		var searchTerm = evt.target.value
		console.log('searchTerm', searchTerm)
		var spaceInWord = ' '
		var re = new RegExp(spaceInWord, 'g')
		var hashTerm = searchTerm.replace(re, '%20')
		if (evt.keyCode === 13){			
			location.hash=hashTerm
		}
	},

	render: function(){

		return (
			<div id='render'>
				<form onSubmit={this._handleSearch} className='searchBox'>
					<input data-qry='search' onKeyDown={this._handleSearch} type='search' placeholder='search food item' type='text'></input>
					<button className={"btn btn-primary"}> search food item</button>
				</form>
				<SearchResultsView qryColl={this.props.qryColl.models}/>
				<Footer/>
			</div>
		)
	}
})


var SearchResultsView = React.createClass({


	_generateJSXresults:function(modelsArray){
		var JSXArray = ''
		// console.log('this.props.qryColl.modelsArray>>>>>', modelsArray)
		JSXArray = modelsArray.map(function(item, i){
			var component = this
			// console.log('brand_id>>>',item.get('fields').item_name)
			return (
				<div className='item'>
					<SearchResultsItems item={item} key={i}/>
				</div>
			)
		}) 
		return JSXArray
	},



	render:function(){
		var component = this
		var item = component.props.item
		return (
			<div className='SearchResultsWrapper'>
			{this._generateJSXresults(component.props.qryColl)}
			</div>
		)
	}
})


var SearchResultsItems =  React.createClass({
	_handleId:function(item){
		console.log('item.id', item.get('_id'))
	},

	render:function(){
		var item = this.props.item
		return (
			<div key={this.props.key} className='cardWrapper' onClick={this._handleId.bind(this, item)}>
				<div className='brandDeets frontOfCard' >
					<h3 > {item.get('fields').item_name}</h3>
					<h5 >brand: {item.get('fields').brand_name}</h5>
					<p >size: {item.get('fields').nf_serving_size_qty} {item.get('fields').nf_serving_size_unit}</p>
					<p >calories: {item.get('fields').nf_calories}</p>
					<p >total carbohydrate: {item.get('fields').nf_total_carbohydrate}</p>
					<p >sugars: {item.get('fields').nf_sugars}</p>
					<p >total fat: {item.get('fields').nf_total_fat}</p>
					<p >calories from fat: {item.get('fields').nf_calories_from_fat}</p>
					<p >water grams: {item.get('fields').nf_water_grams}</p>
					<p >item description: {item.get('fields').item_description}</p>
					<p >ingredient statement: {item.get('fields').nf_ingredient_statement}</p>
				</div>
				<div className='brandDeets backOfCard'>
			
				</div>
			</div>
		)
	}
})


export{AppView}