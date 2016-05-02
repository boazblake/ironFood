import DOM from 'react-dom'
import React, {Component} from 'react'
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'

//MODULES

var Header = React.createClass({
	render:function(){
		return (
			<h1>Search for Food!</h1>
		)
	}
})

var Footer = React.createClass({
	render:function(){
		return(
			<div className='logo'>
				<a href=''>
					<img src=''/>
				</a>
			</div>
			)
	}
})


// VIEWS

var SplashView = React.createClass({

	qryStr:'',

	_updateFoodName:function(evt){
		this.qryStr = evt.target.value
		var searchTerm = this.qryStr
		console.log('this.qryStr', this.qryStr)
		var spaceInWord = ' '
		var re = new RegExp(spaceInWord, 'g')
		var hashTerm = searchTerm.replace(re, '%20')
		if (evt.keyCode === 13){
			location.hash='search/'+hashTerm
		}
	},

	_handleSearch:function(evt){
		$(".searchBox").submit(function(e){
		    return false;
		});
	},

	render: function(){

		return (
			<div id='render'>
				<Header/>
				<form onSubmit={this._handleSearch} className='searchBox'>
					<input data-qry_id='search' onKeyDown={this._updateFoodName} type='search' placeholder='search food item' type='text'></input>
					<button onClick={this._handleSearch} className={"btn btn-primary"}> search food item</button>
				</form>
				<Footer/>
			</div>
		)
	}
})

var SearchView = React.createClass({

	qryStr:'',

	_updateFoodName:function(evt){
		this.qryStr = evt.target.value
		var searchTerm = this.qryStr
		console.log('this.qryStr', this.qryStr)
		var spaceInWord = ' '
		var re = new RegExp(spaceInWord, 'g')
		var hashTerm = searchTerm.replace(re, '%20')
		if (evt.keyCode === 13){
			location.hash='search/'+hashTerm
		}
	},

	_handleSearch:function(evt){
		$(".searchBox").submit(function(e){
		    return false;
		});

		evt.preventDefault()
	},

	_handleSearch:function(evt){
		console.log(evt.target.value)
		var searchTerm = evt.target.value
		console.log('searchTerm', searchTerm)
		var spaceInWord = ' '
		var re = new RegExp(spaceInWord, 'g')
		var hashTerm = searchTerm.replace(re, '%20')
		if (evt.keyCode === 13){			
			location.hash='search/'+hashTerm
		}
	},

	render: function(){

		return (
			<div id='render'>
				<a href='#home'>HOME</a>
				<form onSubmit={this._handleSearch} className='searchBox'>
					<input data-qry='search' onKeyDown={this._handleSearch} type='search' placeholder='search food item' type='text'></input>
					<button onClick={this._handleSearch} className={"btn btn-primary"}> search food item</button>
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
		if (item.get('fields').nf_ingredient_statement) {
			var itemIng = item.get('fields').nf_ingredient_statement
			console.log('itemIng', itemIng)
			var itemIngredMain = itemIng.substring(0, 140) + '...'
		} 

		if (item.get('fields').item_description) {
			var itemDesc = item.get('fields').item_description
			console.log('itemDesc', itemDesc)
			var itemDescMain = itemDesc.substring(0, 140) + '...'
		} 
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
				</div>

				<div className='brandDeets backOfCard'>
					<p >ingredient description: {itemDescMain}</p>
					<p >ingredient statement: {itemIngredMain}</p>
				</div>

			</div>
		)
	}
})


export{SplashView, SearchView}