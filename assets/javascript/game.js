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
            hp: 75,
            tankImage: "assets/images/americanTank.png",
            friend: -1
        },
        {
            tankId: "tank2",
            scorediv: undefined,
            maindiv: undefined,
            tankName: "German Panther",
            hp: 80,
            tankImage: "assets/images/germanTank1.png",
            friend: -1
        },
        {
            tankId: "tank3",
            scorediv: undefined,
            maindiv: undefined,
            tankName: "British Spitfire",
            hp: 65,
            tankImage: "assets/images/britishTank.png",
            friend: -1
        },
        {
            tankId: "tank4",
            scorediv: undefined,
            maindiv: undefined,
            tankName: "German Panzer",
            hp: 72,
            tankImage: "assets/images/germanTank2.png",
            friend: -1
        },
        {
            tankId: "tank5",
            scorediv: undefined,
            maindiv: undefined,
            tankName: "Russian Tiger",
            hp: 60,
            tankImage: "assets/images/russianTank.png",
            friend: -1
        }
    ];


    var friendCnt = 0;
    var enemyCnt = 0;
    var instruction1 = $(".instructions1");
    var instruction2 = $(".instructions2");
    $("#battleButton").hide();

    for (var i = 0; i < tanks.length; i++) {
        var tank = tanks[i];
        $("#tanklist").append(getTankDiv(tank));
    }

    // $(".tank").on("click", function () {
    $(document).on("click", ".tank", function () {
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
            // changeScore(tank.scorediv, 23);
        } else if (enemyCnt === 0) {
            enemyCnt++;
            $("#enemylist").prepend($tdiv);
            tank.scorediv.css("background-color", "purple");
            tank.friend = 0;

            instruction2.html("");
            instruction1.html("Click button to Battle");
            $("#battleButton").show(1000);
        }
    });

    function changeScore(scored, num) {
        scored.html("<p>" + num + "</p>");
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
        $scorediv.html("<p>" + tank.hp + "</p>");

        $div.animateCss("shake");
        tank.maindiv = $div;

        return $div;
    }

});

