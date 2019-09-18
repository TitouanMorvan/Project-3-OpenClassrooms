// SCROLL AUTOMATIQUE VERS LA RESERVATION
$(document).ready(function() {
		$('#validation').on('click', function() { // Au clic sur un élément
            setTimeout(function(){
                window.scroll({
                      top: 2500, 
                      left: 0, 
                      behavior: 'smooth'
                    });
            }, 300);
		});
	});