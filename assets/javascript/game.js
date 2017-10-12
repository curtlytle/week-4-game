$(document).ready(function () {
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
            return this;
        }
    });

    var tanks = [
        {tankId: "tank1", tankName: "American M26", hp: 75, tankImage: "assets/images/americanTank.png", friend: -1},
        {tankId: "tank2", tankName: "German Panther", hp: 80, tankImage: "assets/images/germanTank1.png", friend: -1},
        {tankId: "tank3", tankName: "British Spitfire", hp: 65, tankImage: "assets/images/britishTank.png", friend: -1},
        {tankId: "tank4", tankName: "German Panzer", hp: 72, tankImage: "assets/images/germanTank2.png", friend: -1},
        {tankId: "tank5", tankName: "Russian Tiger", hp: 60, tankImage: "assets/images/russianTank.png", friend: -1}
    ];

    var friendCnt = 0;
    var instrution1 = $(".instructions1");
    var instruction2 = $(".instructions2");

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
            $("#friendlist").prepend($tdiv);
            tank.friend = 1;
            friendCnt++;
            instruction2.html("Choose your Enemy");
            $tdiv.animateCss("shake");
        } else {
            $("#enemylist").prepend($tdiv);
            tank.friend = 0;
        }
    });

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

        $shell.prepend($('<img>', {id: tank.tankId + 'Imgid', src: tank.tankImage, class: "pieces"}));
        $shell.append($namediv);
        $shell.append($scorediv);
        $div.append($shell);

        var namehtml = "<p>" + tank.tankName + "</p>";
        $namediv.html(namehtml);
        var healthhtml = "<p>" + tank.hp + "</p>";
        $scorediv.html(healthhtml);

        $div.animateCss("shake");


        return $div;
    }

});

