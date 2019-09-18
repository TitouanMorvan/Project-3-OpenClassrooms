
var canvas = $('#canvas')[0];
var context = canvas.getContext('2d');

var Signature = {
	dessin : false,
    
	//INITIALISATION DU CANVAS
	
    initCanvas : function() {
		//DEFINITION DU TRAIT, SA COULEUR ET SA TAILLE
		context.strokeStyle = "black";
		context.lineWidth = 3;

		Signature.mouseEvent();
		Signature.touchEvent();
		Signature.effacerCanvas();
		Signature.dessiner();
	},

	//mOUVEMENT DE LA SOURIS
	mouseEvent : function() {
		//CLICK ENFONCER
		$('#canvas').on('mousedown', function(e) {
			Signature.dessin = true;
			//INITIALISATION DU CHEMIN
			context.beginPath();
			//DEPLACEMENT D'UN POITN VERS LES COORDONNEES OFFESETx ET OFFESETy
			context.moveTo(e.offsetX, e.offsetY);
		});

		//DEPLACEMENT DE LA SOURIS
		$('#canvas').on('mousemove', function(e) {
			if(Signature.dessin===true) {
				Signature.dessiner(e.offsetX, e.offsetY);
				$('#validation').show();
			}
		});

		//CLICK RELACHER
		$('#canvas').on('mouseup', function() {
			Signature.dessin = false;
		});
	},

	//MOUVEMENT SUR MOBILE
	touchEvent: function () {
    //COMMENECEMENT DU TOUCHER
    	$("#canvas").on("touchstart", function (e) {
      		var touchX = e.touches[0].pageX - e.touches[0].target.offsetLeft,
      			touchY = e.touches[0].pageY - e.touches[0].target.offsetTop;

      		Signature.dessin = true;
      		context.beginPath();
      		context.moveTo(touchX, touchY);
   			// EMPECHE LE SCROLLING SUR L'ECRAN
   			e.preventDefault();
    	});

    	//DEPLACEMENT DU TOUCHER
    	$("#canvas").on("touchmove", function (e) {
    		//touches[0].pageX réagit au toucher du doigt
    		//touches[0].target.offsetLeft ignore tout transformation comme les rotations
      		var touchX = e.touches[0].pageX - e.touches[0].target.offsetLeft,
      			touchY = e.touches[0].pageY - e.touches[0].target.offsetTop;

      		if (Signature.dessin === true) {
        		Signature.dessiner(touchX, touchY);
        		$('#validation').show();
      		}
      	
      		// EMPECHE LE SCROLLING DE L'ECRAN
      		e.preventDefault();
    	});

    	//FIN DU TOUCHER
    	$("#canvas").on("touchend", function () {
      		Signature.dessin = false;
    	});
  	},

	//EFFACEMENT DU CANVAS
	effacerCanvas : function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
		$('#reset').click(function() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			$('#validation').hide();
		});
        $('#popup').css(
    {"display":"none"
    }
);
	},

	//DEFINITON DU FAIT DE DESSINER

	dessiner : function (x,y) {
		//lineTo crée la ligne, stroke la rend visible
		context.lineTo(x,y);
		context.stroke();
	}
};

Signature.initCanvas();