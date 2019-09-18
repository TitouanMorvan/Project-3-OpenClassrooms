var Stations = {
    contractName : "Nantes",
    apiKeyJCDECAUX : "2e857fa202b1aa5ccc51813a96bf06fd4a7a08bb",
    tInterval : null,

    url : function() {
        return 'https://api.jcdecaux.com/vls/v1/stations?contract=' + 
        Stations.contractName + '&apiKey=' + Stations.apiKeyJCDECAUX;
    },

    getAllStations : function() {
        "use strict";
        ajaxGet(Stations.url(), function(reponse) {
            var totalStations = JSON.parse(reponse);
            totalStations.forEach(function(station) {
                var latitude = station.position.lat,
                    longitude = station.position.lng,
                    marker = L.marker([latitude, longitude]).addTo(mymap).bindPopup(station.name);
                
                marker.addTo(mymap);
                marker.afficheVille = Stations.contractName;
                marker.afficheNom = station.name;
                marker.afficheNumero = station.number;
                marker.afficheAdresse = station.address;
                marker.afficheStatus = station.status;
                marker.afficheNombrePlace = station.bike_stands;
                marker.afficheVeloDisponible = station.available_bikes;
                marker.affichePlaceVide = station.available_bike_stands;
                marker.afficheMajStation = Stations.msToHours(station.last_update);

                marker.on("click", function() {
                    Stations.afficheInfos(marker.afficheVille,
                                          marker.afficheNom,
                                          marker.afficheNumero,
                                          marker.afficheAdresse,
                                          marker.afficheStatus,
                                          marker.afficheNombrePlace,
                                          marker.afficheVeloDisponible,
                                          marker.affichePlaceVide,
                                          marker.afficheMajStation);
                });
            });
        });
    },

    msToHours : function(duree) {
        "use strict";
        var secondes = parseInt((duree / 1000) % 60),
            minutes = parseInt((duree / (1000 * 60)) % 60),
            heures = parseInt((duree / (1000 * 60 * 60)) % 24);

        heures = (heures < 10) ? "0" + heures : heures;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        secondes = (secondes < 10) ? "0" + secondes : secondes;
        return heures + " h " + minutes + " min " + secondes + " s";
    },

    afficheInfos : function(ville,
                            nom,
                            numero,
                            adresse,
                            status,
                            nombrePlace,
                            veloDisponible,
                            placeVide,
                            majStation) {
        "use strict";

        //ON EFFACE LE CANVAS A CHAQUE NOUVEAU MARKER
        Signature.effacerCanvas();
        sessionStorage.clear();

        //AFFICHAGE DU FORMULAIRE, ON CACHE LE CANVAS
        $('#signature').hide();
        $('#blocExpiration').hide();
        $('#blocAnnulation').hide();

        $('#formulaire').show();

        $(".minutes").text("20 min");
        $(".secondes").text("00 s");

        //ON AFFICHE LA VILLE
        $('#ville').text('Stations de ' + ville);

        //VALEUR DE LOCALSTORAGE
        if (localStorage.userNom !== undefined && localStorage.userPrenom !== undefined) {
            $('#name').val(localStorage.userNom);
            $('#prenom').val(localStorage.userPrenom);
        }

        //STATION, SON NUMERO, SON ADRESSE, SON STATUS
        $('#station').text(nom);
        $('#numero').text('Station n°' + numero);
        $('#adresse').text(adresse);
        if (status==="OPEN") {
            $('#status').text('Station ouverte').css('background-color', '#FF8C00');
            $('#infoStation').css({
                'border-color': '#228B22',
                'border-style': 'solid'
            });
        } 
        else {
            $('#status').text('Station fermée').css('background-color', '#FF6347');
            $('#infoStation').css({
                'border-color': '#FF6347',
                'border-style': 'solid'
            });
        }

        //NOMBRE DE VELO MAXIMUM, VELO DISPONIBLE , PALCE VIDES
        $('#nbPlace').text('Nombre de place : ' + nombrePlace);
        $('#veloDispo').text('Vélo disponible : ' + veloDisponible);
        if (veloDisponible >= nombrePlace/2) {
            $('#infoVelo').css({
                'border-color': '#FFA500',
                'border-style': 'solid'
            });
            $('.utilisateur').show();
        }
        if (veloDisponible < nombrePlace/2 && veloDisponible!==0) {
            $('#infoVelo').css({
                'border-color': '#FFA500',
                'border-style': 'solid'
            });
            $('.utilisateur').show();
        }
        else if (veloDisponible===0 || status==="CLOSED") {
            $('#infoVelo').css({
                'border-color': '#FF6347',
                'border-style': 'solid'
            });
            $('.utilisateur').hide();
        }
        $('#placeVide').text('Place vide : ' + placeVide);

        //AFFICHAGE DE LA DERNIERE MISE A JOUR
        $('#maj').text('Mis à jour il y a ' + majStation);

        //INITIALISATION DE LOCALSTORAGE
        Stations.infoLocalStorage(nom);
    },

    //AFFICHAGE CANVAS
    infoCanvas : function(nomStation) {
        "use strict";
        $('#blocReservation').hide();
        $('#validation').hide();

        if ($('#canvas').is(':hidden')) {
            $('#reset').hide();
        }
        $('#popup').css(
            {"display":"block"
        }
     );

        $('#signature').show();
        $('#reset').show();
        $('#infoSignature').text("Vélo réservé à la station " + nomStation);
    },

    //ON MET UNE MAJUSCULE AU PRENOM
    premiereLettreMajuscule : function(mot) {
        "use strict";
        return mot.charAt(0).toUpperCase() + mot.slice(1);
    },

    //METHODE SUR LOCALSTORAGE
    //LOCALSTORAGE NE FONCTION PAS EN LOCAL SUR IE 11
    infoLocalStorage : function(nomStation) {
        "use strict";
        $('.reservation').click(function() {
            var inputName = $('#name').val(),
                inputPrenom = $('#prenom').val();

            //ON DEFINIT LES REGLES SUR NOM ET PRENOM
            var regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s-]{2,25}$/;
            
            if (regex.test(inputName) && 
                regex.test(inputPrenom) && 
                inputName!=="NOM INVALIDE" && 
                inputPrenom!=="NOM INVALIDE") {

                localStorage.setItem('userNom', inputName);
                localStorage.setItem('userPrenom', inputPrenom);

                var finalNom = localStorage.userNom.toUpperCase(),
                finalPrenom = Stations.premiereLettreMajuscule(localStorage.userPrenom);

                Stations.infoCanvas(nomStation);
                Stations.infoSessionStorage(nomStation, finalNom, finalPrenom);
                $('#infoId').text("par " + finalNom + " " + finalPrenom + ".");
            }
            else {
                $('#name').val("NOM INVALIDE");
                $('#prenom').val("PRÉNOM INVALIDE");
            }
        });
    },

    //METHODE SUR SESSIONSTORAGE
    
    infoSessionStorage : function(nomStation, idNom, idPrenom) {
        "use strict";
        sessionStorage.clear();

        sessionStorage.setItem('saveStation', nomStation);
        sessionStorage.setItem('saveName', idNom);
        sessionStorage.setItem('savePrenom', idPrenom);
        var date = new Date();
        console.log(date);
        sessionStorage.setItem('saveDate', date);
        
        $('#validation').click(function() {
            $('#signature').hide();

            $('#blocReservation').show();
            $('.stationReservee').text("Réservation en cours à " + sessionStorage.saveStation);
            $('.identite').text("par "+ sessionStorage.saveName + " " + sessionStorage.savePrenom + ".");
            
            Stations.infoReservation();
            
            $('#popup').css(
                {"display":"none"
            }
        );
    });

        $('.reservation').click(function() {
            Signature.effacerCanvas();
                   
        });
        
        $('#popup').click(function() {
            Signature.effacerCanvas();
            
            $('#signature').css(
                {"display":"none"
             }
        );
    
    });
              
},

    infoReservation : function () {
        "use strict";
        var heureReservation = Date.parse(new Date(sessionStorage.saveDate)),
        finReservation = Date.parse(new Date(heureReservation + 20*60*1000));
        sessionStorage.setItem('fin', finReservation);
        clearInterval(Stations.tInterval);
        Stations.tInterval = setInterval(Stations.compteur, 1000);
    },

    annulerReservation : function () {
        "use strict";
        $('#blocReservation').hide();

        //réinitialisation premier affichage compteur
        $(".minutes").text("20 min");
        $(".secondes").text("00 s");

        Stations.clearSessionAndInterval();

        $('#blocAnnulation').show();
        $('#textAnnulation').text("Vous avez annulé votre réservation !");

        $('.reservation').click(function () {
            $('#blocAnnulation').hide();
        });
    },

    compteur : function() {
        "use strict";
        var temps = sessionStorage.fin - Date.parse(new Date());

        if (temps <= 0 || isNaN(temps)) {
            Stations.clearSessionAndInterval();

            $('#blocReservation').hide();
            $('#blocAnnulation').hide();

            $('#blocExpiration').show();
            $('#textExpiration').text("Votre réservation est terminée !");

            $('.reservation').click(function () {
                $('#blocExpiration').hide();
            });
        }
        else {
            var secondes = Math.floor((temps / 1000) % 60),
            minutes = Math.floor((temps / 1000 / 60) % 60);

            $(".minutes").text(minutes + " min");
            $(".secondes").text(("0" + secondes + " s").slice(-4));
            $('#blocExpiration').hide();
        }

        $('.annulation').click(function () {
            Stations.annulerReservation();
        });
    },

    //VIDE SESSIONSTORAGE ET METS A ZERO T INTERVAL
    clearSessionAndInterval : function () {
        "use strict";
        clearInterval(Stations.tInterval);
        sessionStorage.clear();
    }
};

Stations.getAllStations();
