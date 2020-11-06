require('!style-loader!css-loader!sass-loader!../static/style.scss');

import {listProduct, addCart, loadCart, removeCart} from './helper.js';

import $ from 'jquery';


window.products = [];
window.carts = [];


fetch('./assets/database.json').then(function(response) {
	return response.json();
}).then(function(response) {
	window.products = response.items;
	response.items.map(function(item, index) {		
		$("#items").append( listProduct(item, index) );
	})
});


$( document ).ready(function() {
	
	$(document).on("click",".add-to-cart", function() {
		addCart( $(this).attr('id') );
		$("#cart").html( loadCart() );
	});

	$(document).on("click",".removeCart", function() {
		removeCart( $(this).attr('id') );
		$("#cart").html( loadCart() );
	});


});