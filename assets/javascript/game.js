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
    var gameOver = false;

    $("#battleButton").hide();
    var myTank = null;
    var enemyTank = null;
    var amountOfTanks = tanks.length;
    var wins = 0;

    function initialize() {
        friendCnt = 0;
        enemyCnt = 0;
        battleOn = false;
        gameOver = false;

        $("#battleButton").hide();
        myTank = null;
        enemyTank = null;
        amountOfTanks = tanks.length;
        wins = 0;
    }

    for (var i = 0; i < amountOfTanks; i++) {
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

            displayMsg2("Choose your Enemy");
            $tdiv.animateCss("shake");

            tank.scorediv.css("background-color", "blue");
            myTank = tank;
        } else if (enemyCnt === 0) {
            enemyCnt++;
            battleOn = true;
            $("#enemylist").prepend($tdiv);
            tank.scorediv.css("background-color", "purple");
            tank.friend = 0;

            displayMsg2("");
            displayMsg1("Click button to Battle");
            $("#battleButton").show(500);
            setButtonToAttack();
            enemyTank = tank;
        }
    });

    function displayTankScore(tank) {
        var display = "<p>Health: " + tank.hp + ", AP: " + tank.ap + ", CA: " + tank.ca + "</p>";
        tank.scorediv.html(display);
    }


    $("#battleButton").on("click", function () {

        if (isButtonOnAttack()) {
            setButtonToCounter();
            attackEnemy();
        } else if (isButtonOnCounter()) {
            setButtonToAttack();
            enemyCounterAttack();
        } else if (isButtonOnRestart()) {
            // todo do something here
        }
    });

    function isButtonOnAttack() {
        if ($("#battleButton").text() === "ATTACK") {
            return true;
        } else {
            return false;
        }
    }

    function isButtonOnCounter() {
        if ($("#battleButton").text() === "COUNTER") {
            return true;
        } else {
            return false;
        }
    }

    function isButtonOnRestart() {
        if ($("#battleButton").text() === "RESTART") {
            return true;
        } else {
            return false;
        }
    }


    function setButtonToAttack() {
        $("#battleButton").html("ATTACK");
    }

    function setButtonToCounter() {
        $("#battleButton").html("COUNTER");
    }

    function setButtonToRestart() {
        $("#battleButton").html("RESTART");
    }

    function attackEnemy() {
        enemyTank.hp -= myTank.ap;
        myTank.ap += myTank.oap;
        displayTankScore(myTank);
        if (enemyTank.hp < 0) {
            wins++;
            enemyTank.maindiv.empty();
            battleOn = false;
            enemyCnt = 0;

            if (wins >= (amountOfTanks - 1)) {
                displayMsg1("You beat: " + enemyTank.tankName + ".  And you are VICTORIOUS!");
                displayMsg2("");
                setButtonToRestart();
                gameOver = true;
            } else {
                displayMsg2("Choose your next tank");
                displayMsg1("You beat: " + enemyTank.tankName);
                setButtonToAttack();
                $("#battleButton").hide();
            }

        } else {
            displayTankScore(enemyTank);
        }
    }

    function enemyCounterAttack() {
        myTank.hp -= enemyTank.ca;
        displayTankScore(myTank);
        displayTankScore(enemyTank);

        if (myTank.hp < 0) {
            battleOn = false;
            displayMsg1("You Have Been Conquered!");
            displayMsg2("");
            setButtonToRestart();
        }

    }

    function displayMsg1(msg) {
        $(".instructions1").html(msg);
    }
    function displayMsg2(msg) {
        $(".instructions2").html(msg);
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

