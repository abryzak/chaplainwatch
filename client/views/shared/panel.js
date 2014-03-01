Template.panel.events({
	'click .internal-link' : function( event, template ) {
    event.preventDefault();
    event.srcElement.scrollIntoView(false);
   	},
});