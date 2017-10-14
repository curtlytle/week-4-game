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

    var originTanks = [
        {
            tankId: "tank1",
            tankName: "American M26",
            hp: 95,
            ap: 4,
            ca: 7,
            tankImage: "assets/images/americanTank.png"
        },
        {
            tankId: "tank2",
            tankName: "German Panther",
            hp: 90,
            ap: 6,
            ca: 8,
            tankImage: "assets/images/germanTank1.png"
        },
        {
            tankId: "tank3",
            tankName: "British Spitfire",
            hp: 85,
            ap: 3,
            ca: 9,
            tankImage: "assets/images/britishTank.png"
        },
        {
            tankId: "tank4",
            tankName: "German Panzer",
            hp: 87,
            ap: 5,
            ca: 8,
            tankImage: "assets/images/germanTank2.png"
        },
        {
            tankId: "tank5",
            tankName: "Russian Tiger",
            hp: 80,
            ap: 3,
            ca: 6,
            tankImage: "assets/images/russianTank.png"
        }
    ];


    var tanks = [
        {
            tankId: undefined,
            scorediv: undefined,
            maindiv: undefined,
            tankName: undefined,
            oTank: undefined,
            hp: 0,
            ap: 0,
            ca: 0,
            tankImage: undefined
        },
        {
            tankId: undefined,
            scorediv: undefined,
            maindiv: undefined,
            tankName: undefined,
            oTank: undefined,
            hp: 0,
            ap: 0,
            ca: 0,
            tankImage: undefined
        },
        {
            tankId: undefined,
            scorediv: undefined,
            maindiv: undefined,
            tankName: undefined,
            oTank: undefined,
            hp: 0,
            ap: 0,
            ca: 0,
            tankImage: undefined
        },
        {
            tankId: undefined,
            scorediv: undefined,
            maindiv: undefined,
            tankName: undefined,
            oTank: undefined,
            hp: 0,
            ap: 0,
            ca: 0,
            tankImage: undefined
        },
        {
            tankId: undefined,
            scorediv: undefined,
            maindiv: undefined,
            tankName: undefined,
            oTank: undefined,
            hp: 0,
            ap: 0,
            ca: 0,
            tankImage: undefined
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

    function loadTanks() {
        for (var i = 0; i < amountOfTanks; i++) {
            var tank = tanks[i];
            loadThisTank(tank, i);
            $("#tanklist").append(getTankDiv(tank));
        }
    }
    loadTanks();

    function loadThisTank(tank, node) {
        var otank = originTanks[node];
        tank.tankId = otank.tankId;
        tank.tankName = otank.tankName;
        tank.hp = otank.hp;
        tank.ap = otank.ap;
        tank.ca = otank.ca;
        tank.tankImage = otank.tankImage;
        tank.oTank = otank;
    }


    // $(".tank").on("click", function () {
    $(document).on("click", ".tank", function () {
        if (battleOn) {
            return;
        }

        var id = $(this).attr('id');
        var tank = getTankElement(id);
        var $tdiv = getTankDiv(tank);

        document.getElementById(id).remove();

        if (friendCnt === 0) {
            friendCnt++;
            $("#friendlist").prepend($tdiv);

            displayMsg2("Choose your Enemy");
            $tdiv.animateCss("shake");

            tank.scorediv.css("background-color", "blue");
            myTank = tank;
        } else if (enemyCnt === 0) {
            enemyCnt++;
            battleOn = true;
            $("#enemylist").prepend($tdiv);
            tank.scorediv.css("background-color", "purple");

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
            restartGame();
        }
    });

    function restartGame() {
        var tank1 = document.getElementById(myTank.tankId);
        if (tank1 != null) {
            tank1.remove();
        }

        var tank2 = document.getElementById(enemyTank.tankId);
        if (tank2 != null) {
            tank2.remove();
        }

        displayMsg2("Choose your tank");
        displayMsg1("");
        loadTanks();
        initialize();
    }

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
        myTank.ap += myTank.original_ap;
        displayTankScore(myTank);
        if (enemyTank.hp < 0) {
            wins++;
            document.getElementById(enemyTank.tankId).remove();
            // enemyTank.maindiv.empty();
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
        var $shell = $("<div>", {class: "tankshell"});
        var $namediv = $("<div>", {class: "tankname"});
        var $scorediv = $("<div>", {class: "tankscore"});
        tank.scorediv = $scorediv;

        $shell.prepend($('<img>', {id: tank.tankId + 'Imgid', src: tank.tankImage, class: "pieces"}));
        $shell.append($namediv);
        $shell.append($scorediv);
        $div.append($shell);

        $namediv.html("<p>" + tank.tankName + "</p>");
        displayTankScore(tank);

        $div.animateCss("shake");
        tank.maindiv = $div;

        return $div;
    }

});

