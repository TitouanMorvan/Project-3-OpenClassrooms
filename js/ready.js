// GARDE LA RESERVATION AU RECHARGEMENT DE LA PAGE 
$( document ).ready(function() {
    console.log( "ready!" );

    var date = new Date(sessionStorage.saveDate);
    var dateActuel = new Date();
     
    var minutes = dateActuel.getMinutes() - date.getMinutes();
     
    var secondes = dateActuel.getSeconds() - date.getSeconds();
     console.log(secondes);
    var heures = dateActuel.getHours() - date.getHours();
     console.log(heures);
    var jours = dateActuel.getDay() - date.getDay();
     console.log(jours);
    var mois = dateActuel.getMonth() - date.getMonth();
     console.log(mois);
     
    if (mois == 0 && jours == 0 && heures == 0 && minutes < 20){
        
        $('#signature').hide();

            $('#blocReservation').show();
            $('.stationReservee').text("Réservation en cours à " + sessionStorage.saveStation);
            $('.identite').text("par "+ sessionStorage.saveName + " " + sessionStorage.savePrenom + ".");
     

            Stations.infoReservation();
            
                $('#popup').css(
                    {"display":"none"
                }
            );                  
        }  
    }); 