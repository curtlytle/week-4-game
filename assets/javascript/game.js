$(document).ready(function () {
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);
            });
            return this;
        }
    });


    var tanks = [
        {
            tankId: "tank1",
            scorediv: undefined,
            maindiv: undefined,
            tankName: "American M26",
            hp: 55,
            ap: 4,
            oap: 4,
            ca: 7,
            tankImage: "assets/images/americanTank.png",
            friend: -1
        },
        {
            tankId: "tank2",
            scorediv: undefined,
            maindiv: undefined,
            tankName: "German Panther",
            hp: 53,
            ap: 6,
            oap: 6,
            ca: 6,
            tankImage: "assets/images/germanTank1.png",
            friend: -1
        },
        {
            tankId: "tank3",
            scorediv: undefined,
            maindiv: undefined,
            tankName: "British Spitfire",
            hp: 49,
            ap: 3,
            oap: 3,
            ca: 8,
            tankImage: "assets/images/britishTank.png",
            friend: -1
        },
        {
            tankId: "tank4",
            scorediv: undefined,
            maindiv: undefined,
            tankName: "German Panzer",
            hp: 54,
            ap: 5,
            oap: 5,
            ca: 6,
            tankImage: "assets/images/germanTank2.png",
            friend: -1
        },
        {
            tankId: "tank5",
            scorediv: undefined,
            maindiv: undefined,
            tankName: "Russian Tiger",
            hp: 58,
            ap: 3,
            oap: 3,
            ca: 5,
            tankImage: "assets/images/russianTank.png",
            friend: -1
        }
    ];


    var friendCnt = 0;
    var enemyCnt = 0;
    var battleOn = false;
    var instruction1 = $(".instructions1");
    var instruction2 = $(".instructions2");
    $("#battleButton").hide();
    var myTank;
    var enemyTank;

    for (var i = 0; i < tanks.length; i++) {
        var tank = tanks[i];
        $("#tanklist").append(getTankDiv(tank));
    }

    // $(".tank").on("click", function () {
    $(document).on("click", ".tank", function () {
        if (battleOn) {
            return;
        }

        $(this).empty();
        var id = $(this).attr('id');
        var tank = getTankElement(id);
        var $tdiv = getTankDiv(tank);

        if (friendCnt === 0) {
            friendCnt++;
            $("#friendlist").prepend($tdiv);
            tank.friend = 1;

            instruction2.html("Choose your Enemy");
            $tdiv.animateCss("shake");

            tank.scorediv.css("background-color", "blue");
            myTank = tank;
        } else if (enemyCnt === 0) {
            enemyCnt++;
            battleOn = true;
            $("#enemylist").prepend($tdiv);
            tank.scorediv.css("background-color", "purple");
            tank.friend = 0;

            instruction2.html("");
            instruction1.html("Click button to Battle");
            $("#battleButton").show(500);
            enemyTank = tank;
        }
    });

    function displayTankScore(tank) {
        var display = "<p>hp: " + tank.hp + ", ap: " + tank.ap + ", ca: " + tank.ca + "</p>";
        tank.scorediv.html(display);
    }

    var attack = true;
    $("#battleButton").on("click", function () {
        if (attack) {
            $(this).html("COUNTER");
            attack = false;
            attackEnemy();
        } else {
            $(this).html("ATTACK");
            attack = true;
            enemyCounterAttack();
        }
    });

    function attackEnemy() {
        enemyTank.hp -= myTank.ap;
        myTank.ap += myTank.oap;
        displayTankScore(myTank);
        if (enemyTank.hp < 0) {
            enemyTank.maindiv.empty();
            battleOn = false;
            attack = true;
            enemyCnt = 0;
            $("#battleButton").html("ATTACK");
            $("#battleButton").hide();
        } else {
            displayTankScore(enemyTank);
        }
    }

    function enemyCounterAttack() {
        myTank.hp -= enemyTank.ca;
        displayTankScore(myTank);
        displayTankScore(enemyTank);
    }

    function getTankElement(tankId) {
        for (var i = 0; i < tanks.length; i++) {
            var tank = tanks[i];
            if (tankId === tank.tankId) {
                return tank;
            }
        }
    }

    function getTankDiv(tank) {
        var $div = $("<div>", {id: tank.tankId, class: "tank"});
        var $shell = $("<div>", {id: tank.tankId, class: "tankshell"});
        var $namediv = $("<div>", {class: "tankname"});
        var $scorediv = $("<div>", {class: "tankscore"});
        tank.scorediv = $scorediv;

        $shell.prepend($('<img>', {id: tank.tankId + 'Imgid', src: tank.tankImage, class: "pieces"}));
        $shell.append($namediv);
        $shell.append($scorediv);
        $div.append($shell);

        $namediv.html("<p>" + tank.tankName + "</p>");
        // $scorediv.html("<p>" + tank.hp + "</p>");
        displayTankScore(tank);

        $div.animateCss("shake");
        tank.maindiv = $div;

        return $div;
    }

});

